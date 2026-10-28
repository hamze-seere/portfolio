import { headers } from "next/headers";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { staticSecurityHeaders } from "@/lib/security-headers";
import { ExternalLink } from "@/components/ExternalLink";
import { PageHeader, SectionHeading } from "@/components/ui";

export const metadata = pageMetadata({
  title: "How this site is secured",
  description:
    "The Content Security Policy, HTTP security headers and design decisions that harden this portfolio — with the reasoning behind each one.",
  path: "/security",
});

// Why each header exists. The values themselves are read from the real config below, so this
// page can never drift out of sync with what the server actually sends.
const headerNotes: Record<string, string> = {
  "Strict-Transport-Security":
    "Browsers must use HTTPS for two years, including subdomains. `preload` makes the domain eligible for the HSTS preload list built into browsers, closing the first-visit gap.",
  "X-Content-Type-Options":
    'Stops browsers from guessing ("sniffing") content types, so an uploaded text file can never be executed as a script.',
  "Referrer-Policy":
    "Other sites see only my origin when you follow a link, never the full URL you were on.",
  "X-Frame-Options":
    "Legacy clickjacking protection for older browsers. Modern ones use CSP `frame-ancestors 'none'`.",
  "Cross-Origin-Opener-Policy":
    "Puts this page in its own browsing-context group, so cross-origin windows can't hold a reference to it (mitigates XS-Leaks and tabnabbing).",
  "Cross-Origin-Resource-Policy":
    "Other origins can't embed this site's resources, which blocks a class of side-channel (Spectre-style) leaks.",
  "Permissions-Policy":
    "Camera, microphone, geolocation, payment, USB and other powerful APIs are disabled for this site and anything it could embed.",
  "X-DNS-Prefetch-Control": "Turns off speculative DNS lookups for links on the page.",
};

const cspNotes: [string, string][] = [
  [
    "script-src 'nonce-…' 'strict-dynamic'",
    "A fresh 128-bit nonce is generated for every request in src/proxy.ts. Only <script> tags carrying it (Next.js adds it to its own) run, plus scripts those load. An injected <script> has no valid nonce, so the browser refuses it. No 'unsafe-inline', no 'unsafe-eval'.",
  ],
  ["style-src-elem 'self' 'nonce-…'", "Stylesheets must come from this origin or carry the nonce."],
  [
    "style-src-attr 'unsafe-inline'",
    "The one exception. Build-time syntax highlighting and next/image write style=\"…\" attributes, which nonces can't cover. Style attributes can't run JavaScript. The remaining risk, CSS-only UI tricks, is narrow, and every other directive here limits it further.",
  ],
  ["object-src 'none'", "No Flash, Java or other plugin content, ever."],
  [
    "base-uri 'none'",
    "Stops an injected <base> tag from redirecting every relative URL on the page.",
  ],
  ["frame-ancestors 'none'", "The page can't be framed by anyone: clickjacking protection."],
  [
    "form-action 'self'",
    "Forms can only submit to this site, so an injected form can't send data elsewhere.",
  ],
  [
    "default-src 'self'",
    "Everything not listed above (images, fonts, fetch requests) is same-origin only.",
  ],
  ["upgrade-insecure-requests", "Any stray http:// sub-resource is upgraded to https://."],
];

const decisions: [string, string][] = [
  [
    "Per-request rendering instead of static pages",
    "Nonces must change on every response, so pages can't be pre-built once and cached at the CDN. I accepted a small Time to First Byte cost for a CSP without 'unsafe-inline'. MDX is still compiled at build time, so each request only renders a cheap React tree.",
  ],
  [
    "No inline theme script",
    "Most dark-mode toggles inject a blocking inline script to avoid a flash of the wrong theme. Here, your choice is stored in a cookie and the server renders the correct theme directly, so there's no inline script at all. The cookie value is checked against an allowlist before use.",
  ],
  [
    "Zero third-party requests",
    "Fonts are self-hosted at build time (next/font). There are no analytics, ads, embeds or CDNs, so there are no third parties to trust and nothing to add to the CSP.",
  ],
  [
    "Contact form hardening",
    "The form is a Server Action with built-in Origin checking (CSRF protection), a honeypot field, per-client rate limiting with hashed IPs, strict zod validation on the server, and plain-text email delivery so user input is never rendered as HTML. API keys live only in server environment variables.",
  ],
  [
    "Supply chain",
    "Ten runtime dependencies, each justified in the README. npm audit runs in CI, and Dependabot raises weekly grouped update PRs. Security updates are raised immediately.",
  ],
  [
    "Safe external links",
    'Every off-site link opens with rel="noopener noreferrer", so the destination can\'t control this tab or see which page you came from.',
  ],
];

export default async function SecurityPage() {
  // proxy.ts puts the CSP on the request too (so Next.js can read the nonce). Show the real one.
  const requestHeaders = await headers();
  const liveCsp = requestHeaders.get("content-security-policy") ?? "";
  const nonce = requestHeaders.get("x-nonce");

  return (
    <div className="wrap">
      <PageHeader eyebrow="~/security" title="How this site is secured">
        <p>
          A portfolio for a security engineer should follow its own advice. This page explains every
          header the site sends and the trade-offs behind them. The values below are read from the
          same code that sets them, so they can&apos;t drift.
        </p>
      </PageHeader>

      <div className="flex flex-wrap gap-3 text-sm">
        <ExternalLink
          href={`https://securityheaders.com/?q=${encodeURIComponent(siteConfig.url)}&followRedirects=on`}
          className="rounded-md border border-border px-4 py-2 hover:border-accent"
        >
          Check on securityheaders.com
        </ExternalLink>
        <ExternalLink
          href={`https://www.ssllabs.com/ssltest/analyze.html?d=${encodeURIComponent(siteConfig.url.replace(/^https?:\/\//, ""))}`}
          className="rounded-md border border-border px-4 py-2 hover:border-accent"
        >
          Check on SSL Labs
        </ExternalLink>
        <a
          href="/.well-known/security.txt"
          className="rounded-md border border-border px-4 py-2 hover:border-accent"
        >
          security.txt
        </a>
      </div>

      <section aria-labelledby="csp-heading" className="py-16">
        <SectionHeading
          id="csp-heading"
          eyebrow="content-security-policy"
          title="Content Security Policy"
        >
          <p>
            The most important header: even if an attacker found a way to inject HTML, the browser
            would refuse to run their script.
          </p>
        </SectionHeading>

        {nonce ? (
          <p className="mb-4 text-sm text-muted">
            The nonce for <em>this</em> page load is{" "}
            <code className="font-mono text-accent">{nonce}</code>. Reload the page and it changes.
          </p>
        ) : null}
        <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap">
          {liveCsp.split("; ").join(";\n")}
        </pre>

        <dl className="mt-8 space-y-6">
          {cspNotes.map(([directive, note]) => (
            <div key={directive} className="grid gap-1 sm:grid-cols-[minmax(0,18rem)_1fr] sm:gap-6">
              <dt className="font-mono text-sm break-words text-accent">{directive}</dt>
              <dd className="text-muted">{note}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="headers-heading" className="py-16">
        <SectionHeading
          id="headers-heading"
          eyebrow="response headers"
          title="Other security headers"
        />
        <div className="space-y-4">
          {staticSecurityHeaders.map(({ key, value }) => (
            <div key={key} className="rounded-xl border border-border p-5">
              <h3 className="font-mono text-sm font-semibold">{key}</h3>
              <p className="mt-1 font-mono text-xs break-words text-accent">{value}</p>
              {headerNotes[key] ? (
                <p className="mt-3 text-sm text-muted">{headerNotes[key]}</p>
              ) : null}
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          Also: the <code className="font-mono">X-Powered-By</code> header is disabled, and TLS is
          terminated by Vercel with modern cipher suites (graded separately by SSL Labs).
        </p>
      </section>

      <section aria-labelledby="decisions-heading" className="py-16">
        <SectionHeading
          id="decisions-heading"
          eyebrow="design decisions"
          title="Choices & trade-offs"
        />
        <dl className="grid gap-6 sm:grid-cols-2">
          {decisions.map(([title, body]) => (
            <div key={title} className="rounded-xl border border-border bg-surface p-5">
              <dt className="font-semibold">{title}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">{body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="disclosure-heading" className="py-16">
        <SectionHeading id="disclosure-heading" eyebrow="disclosure" title="Found something?">
          <p>
            Please report it privately to{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-accent hover:underline">
              {siteConfig.email}
            </a>
            . Contact details are also published in{" "}
            <a href="/.well-known/security.txt" className="text-accent hover:underline">
              /.well-known/security.txt
            </a>{" "}
            (RFC 9116). Read more about how I approach this on the{" "}
            <Link
              href="/blog/securing-nextjs-with-a-strict-csp"
              className="text-accent hover:underline"
            >
              CSP write-up
            </Link>
            .
          </p>
        </SectionHeading>
      </section>
    </div>
  );
}
