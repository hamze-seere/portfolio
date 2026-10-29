/**
 * Single source of truth for personal details. Edit this file first — every page,
 * metadata tag, JSON-LD block and the security.txt route read from here.
 */

const fallbackUrl = "https://your-domain.dev";

export const siteConfig = {
  name: "Hamze",
  headline: "Senior cybersecurity engineer & web designer/developer",
  tagline: "I build secure web apps — and break insecure ones.",
  description:
    "Portfolio of Hamze, a Nairobi-based senior cybersecurity engineer and web designer/developer working with Next.js, Laravel, PHP and Python: secure web apps, security tooling, SOC lab work and write-ups.",
  location: "Nairobi, Kenya",
  timezone: "EAT (UTC+3)",
  lookingFor:
    "Open to senior cybersecurity and web development roles, freelance projects and collaborations — remote or Nairobi-based.",
  email: "hello@example.com", // TODO: replace
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? fallbackUrl).replace(/\/$/, ""),
  locale: "en_KE",
  links: {
    github: "https://github.com/hamze-seere",
    linkedin: "https://www.linkedin.com/in/your-handle", // TODO: replace
  },
  /** RFC 9116 requires an expiry no more than a year out. Bump it when you review security.txt. */
  securityTxtExpires: "2027-10-01T00:00:00.000Z",
} as const;

export const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/security", label: "Security" },
] as const;
