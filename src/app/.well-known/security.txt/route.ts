import { siteConfig } from "@/config/site";

// RFC 9116 security.txt, generated from the site config so the domain and contact stay correct.
// Expires is a fixed date on purpose: when it passes, it signals the file needs a human review.
// Bump `securityTxtExpires` in src/config/site.ts at least once a year.
export const dynamic = "force-static";

export function GET() {
  const body = [
    `Contact: mailto:${siteConfig.email}`,
    `Expires: ${siteConfig.securityTxtExpires}`,
    "Preferred-Languages: en, sw",
    `Canonical: ${siteConfig.url}/.well-known/security.txt`,
    `Policy: ${siteConfig.url}/security`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
