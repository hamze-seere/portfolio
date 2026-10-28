import { NextResponse, type NextRequest } from "next/server";
import { apiCsp, buildCsp } from "@/lib/security-headers";

/**
 * Runs before every matched request (Next.js 16 renamed "middleware" to "proxy").
 *
 * Generates a fresh, unguessable nonce per request and attaches the matching CSP:
 *  - on the *request*, so Next.js can read the nonce while rendering and stamp it onto
 *    its own <script> and <style> tags;
 *  - on the *response*, so the browser enforces it.
 */
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const response = NextResponse.next();
    response.headers.set("Content-Security-Policy", apiCsp);
    return response;
  }

  // 16 bytes from the Web Crypto CSPRNG = 128 bits of entropy, base64-encoded.
  const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))));
  const csp = buildCsp(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    {
      // Skip immutable build assets and images: they are not HTML documents, and they still
      // receive the static security headers from next.config.ts.
      source: "/((?!_next/static|_next/image|favicon.ico|images/).*)",
      // Router prefetches only fetch RSC payloads, not documents that execute scripts.
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
