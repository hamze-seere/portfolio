import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ExternalLink } from "@/components/ExternalLink";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border text-sm text-muted">
      <div className="wrap flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p>
            © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.location}
          </p>
          <p className="font-mono text-xs">
            No trackers. No ads. One cookie, only if you change the theme.{" "}
            <Link href="/security" className="text-accent underline-offset-4 hover:underline">
              How this site is secured
            </Link>
          </p>
        </div>
        <ul className="flex items-center gap-1">
          <li>
            <ExternalLink
              href={siteConfig.links.github}
              className="inline-flex size-10 items-center justify-center rounded-md hover:text-fg"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </ExternalLink>
          </li>
          <li>
            <ExternalLink
              href={siteConfig.links.linkedin}
              className="inline-flex size-10 items-center justify-center rounded-md hover:text-fg"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </ExternalLink>
          </li>
          <li>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex size-10 items-center justify-center rounded-md hover:text-fg"
              aria-label="Email"
            >
              <MailIcon />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
