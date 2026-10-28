/**
 * Central definition of every security header the site sends.
 *
 * Static headers (identical on every response) are applied in next.config.ts so they also cover
 * static assets. The Content-Security-Policy contains a per-request nonce, so it is built in
 * src/proxy.ts on each request using `buildCsp()` below.
 */

const isDev = process.env.NODE_ENV === "development";

export const staticSecurityHeaders: { key: string; value: string }[] = [
  // Two years, all subdomains, eligible for the browser preload list (hstspreload.org).
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Legacy clickjacking protection for old browsers; modern ones use CSP frame-ancestors.
  { key: "X-Frame-Options", value: "DENY" },
  // Isolates our browsing context from cross-origin popups (mitigates XS-Leaks / tabnabbing).
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // Other origins may not embed our resources (images, scripts) via no-cors requests.
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  // Deny powerful features this site never uses. "()" = disallowed for every origin, including ours.
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "autoplay=()",
      "browsing-topics=()",
      "camera=()",
      "display-capture=()",
      "geolocation=()",
      "gyroscope=()",
      "hid=()",
      "magnetometer=()",
      "microphone=()",
      "midi=()",
      "payment=()",
      "publickey-credentials-get=()",
      "serial=()",
      "usb=()",
      "xr-spatial-tracking=()",
    ].join(", "),
  },
  { key: "X-DNS-Prefetch-Control", value: "off" },
];

/**
 * Builds the Content-Security-Policy for an HTML document.
 *
 * - script-src uses a nonce + 'strict-dynamic': only scripts carrying this request's nonce
 *   (Next.js adds it to its own scripts automatically) and scripts *they* load may run.
 *   No 'unsafe-inline', no 'unsafe-eval' in production. 'self' is a fallback for very old
 *   browsers that don't understand 'strict-dynamic' (modern browsers ignore it when present).
 * - style-src-elem: <style>/<link> must be same-origin or carry the nonce.
 * - style-src-attr 'unsafe-inline': the ONE documented exception. Build-time syntax
 *   highlighting (Shiki) and next/image emit `style="..."` attributes, which a nonce cannot
 *   cover. Style attributes cannot execute JavaScript; the residual risk is CSS-based UI
 *   redressing, which every other directive here limits further.
 * - Development adds 'unsafe-eval' (React uses eval for dev-only error overlays) and relaxes
 *   styles for hot reloading. Neither applies to production builds.
 */
export function buildCsp(nonce: string): string {
  const styleElem = isDev ? "'unsafe-inline'" : `'nonce-${nonce}'`;
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      `'nonce-${nonce}'`,
      "'strict-dynamic'",
      ...(isDev ? ["'unsafe-eval'"] : []),
    ],
    "style-src": ["'self'", styleElem],
    "style-src-elem": ["'self'", styleElem],
    "style-src-attr": ["'unsafe-inline'"],
    "img-src": ["'self'", "data:", "blob:"],
    "font-src": ["'self'"],
    "connect-src": ["'self'"],
    "manifest-src": ["'self'"],
    "media-src": ["'self'"],
    "worker-src": ["'self'"],
    "frame-src": ["'none'"],
    "object-src": ["'none'"],
    "base-uri": ["'none'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
  };

  const policy = Object.entries(directives).map(([name, values]) => `${name} ${values.join(" ")}`);
  // Production only: on http://localhost this would break the dev server.
  if (!isDev) policy.push("upgrade-insecure-requests");
  return policy.join("; ");
}

/** API routes return JSON only, so they get a policy that allows nothing at all. */
export const apiCsp =
  "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'";
