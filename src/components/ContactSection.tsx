import { siteConfig } from "@/config/site";
import { ContactForm } from "@/components/ContactForm";
import { ExternalLink } from "@/components/ExternalLink";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { SectionHeading } from "@/components/ui";

/** The form only renders when the email provider is configured; otherwise mailto is the path. */
function contactFormEnabled() {
  return Boolean(
    process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL && process.env.CONTACT_TO_EMAIL,
  );
}

export function ContactSection() {
  const formEnabled = contactFormEnabled();

  return (
    <section aria-labelledby="contact-heading" id="contact" className="wrap scroll-mt-20 py-20">
      <SectionHeading id="contact-heading" eyebrow="contact" title="Let's talk">
        <p>
          {siteConfig.lookingFor} Based in {siteConfig.location} · {siteConfig.timezone}.
        </p>
      </SectionHeading>

      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <ul className="space-y-3">
          <li>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-3 hover:text-accent"
            >
              <MailIcon className="text-muted" />
              {siteConfig.email}
            </a>
          </li>
          <li>
            <ExternalLink
              href={siteConfig.links.linkedin}
              className="inline-flex items-center gap-3 hover:text-accent"
            >
              <LinkedInIcon className="text-muted" />
              LinkedIn
            </ExternalLink>
          </li>
          <li>
            <ExternalLink
              href={siteConfig.links.github}
              className="inline-flex items-center gap-3 hover:text-accent"
            >
              <GitHubIcon className="text-muted" />
              GitHub
            </ExternalLink>
          </li>
        </ul>

        {formEnabled ? (
          <ContactForm />
        ) : (
          <div className="rounded-xl border border-border bg-surface p-6">
            <p>The quickest way to reach me is email. I usually reply within two working days.</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-medium text-accent-fg transition-colors hover:bg-accent-strong"
            >
              <MailIcon className="size-4" /> Email me
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
