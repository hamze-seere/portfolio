import Link from "next/link";
import { siteConfig } from "@/config/site";
import { education, experience, type TimelineEntry } from "@/config/experience";
import { pageMetadata } from "@/lib/seo";
import { ExternalLink } from "@/components/ExternalLink";
import { DownloadIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { PageHeader, SectionHeading, StatusBadge } from "@/components/ui";

export const metadata = pageMetadata({
  title: "About",
  description: `About ${siteConfig.name}: experience, certifications and resume.`,
  path: "/about",
});

// TODO: replace with your real certifications and achievements. Add `url` with a
// verification link (Credly, issuer page) wherever one exists — reviewers do click them.
const achievements: {
  title: string;
  issuer: string;
  date: string;
  status: "earned" | "in-progress";
  url?: string;
}[] = [
  {
    title: "CompTIA Security+ (placeholder)",
    issuer: "CompTIA",
    date: "2026",
    status: "in-progress",
  },
  {
    title: "Blue Team Level 1 (placeholder)",
    issuer: "Security Blue Team",
    date: "2026",
    status: "in-progress",
  },
  {
    title: "Top 10% on TryHackMe (placeholder)",
    issuer: "TryHackMe",
    date: "2026",
    status: "earned",
  },
  { title: "CTF finish (placeholder)", issuer: "Event name", date: "2025", status: "earned" },
];

function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative space-y-10 border-l border-border pl-6">
      {entries.map((e) => (
        <li key={`${e.role}-${e.period}`} className="relative">
          <span
            className="absolute top-1.5 -left-[29px] size-2.5 rounded-full border-2 border-accent bg-bg"
            aria-hidden="true"
          />
          <p className="font-mono text-xs text-muted">{e.period}</p>
          <h3 className="mt-1 font-semibold">
            {e.role} <span className="font-normal text-muted">· {e.org}</span>
          </h3>
          <p className="mt-2 text-muted">{e.summary}</p>
          {e.highlights?.length ? (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted marker:text-accent">
              {e.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export default function AboutPage() {
  return (
    <div className="wrap">
      <PageHeader eyebrow="~/about" title={`Hi, I'm ${siteConfig.name}`}>
        <p>
          {siteConfig.headline}, based in {siteConfig.location}.
        </p>
      </PageHeader>

      <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div className="prose">
          {/* TODO: personalise further. Aim for 3–5 short paragraphs. */}
          <p>
            I&apos;m a senior cybersecurity engineer and web designer/developer. I started out
            designing and building websites, and quickly got curious about how they fail. That
            curiosity turned into a habit: every feature I ship, I also try to break.
          </p>
          <p>
            Day to day I work with Next.js, Laravel, PHP and Python, from the interface people see
            down to the APIs and servers underneath, with security treated as a design requirement
            rather than a final checklist.
          </p>
          <p>
            On the defensive side I run a home SOC lab built on Wazuh, where I write detection
            rules, simulate attacks mapped to MITRE ATT&amp;CK and document what gets caught and
            what slips through. On the offensive side I practise on CTFs and lab platforms and write
            up what I learn on the <Link href="/blog">blog</Link>.
          </p>
          <p>
            I&apos;m always looking to improve, both as an engineer and as a designer, and I value
            teams that review code carefully, write things down and treat security as
            everyone&apos;s job.
          </p>
          <h2>Outside of work</h2>
          <p>
            Placeholder: a sentence or two about what you do when you&apos;re not at a keyboard.
          </p>
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-surface p-6">
            <h2 className="font-semibold">Resume</h2>
            <p className="mt-2 text-sm text-muted">One page, PDF, updated regularly.</p>
            <a
              href="/resume.pdf"
              download
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 font-medium text-accent-fg transition-colors hover:bg-accent-strong"
            >
              <DownloadIcon className="size-4" /> Download resume (PDF)
            </a>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6 text-sm">
            <h2 className="font-semibold">Quick facts</h2>
            <dl className="mt-3 space-y-2">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Location</dt>
                <dd>{siteConfig.location}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Timezone</dt>
                <dd>{siteConfig.timezone}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Stack</dt>
                <dd className="text-right">Next.js · Laravel · PHP · Python</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">GitHub</dt>
                <dd>
                  <ExternalLink
                    href={siteConfig.links.github}
                    className="text-accent hover:underline"
                  >
                    {siteConfig.links.github.replace("https://github.com/", "@")}
                  </ExternalLink>
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">LinkedIn</dt>
                <dd>
                  <ExternalLink
                    href={siteConfig.links.linkedin}
                    className="text-accent hover:underline"
                  >
                    Profile
                  </ExternalLink>
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Email</dt>
                <dd className="min-w-0 truncate">
                  <a href={`mailto:${siteConfig.email}`} className="text-accent hover:underline">
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>

      <section aria-labelledby="experience-heading" className="pt-20">
        <SectionHeading id="experience-heading" eyebrow="experience" title="Experience" />
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <Timeline entries={experience} />
          <div>
            <h3 className="mb-6 font-mono text-sm text-accent">{"// education"}</h3>
            <Timeline entries={education} />
          </div>
        </div>
      </section>

      <section aria-labelledby="certs-heading" className="pt-20">
        <SectionHeading
          id="certs-heading"
          eyebrow="certifications"
          title="Certifications & achievements"
        />
        <ul className="grid gap-4 sm:grid-cols-2">
          {achievements.map((a) => (
            <li key={a.title} className="rounded-xl border border-border p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold">
                  {a.url ? (
                    <ExternalLink href={a.url} className="hover:text-accent">
                      {a.title}
                    </ExternalLink>
                  ) : (
                    a.title
                  )}
                </h3>
                <StatusBadge status={a.status} />
              </div>
              <p className="mt-1 text-sm text-muted">
                {a.issuer} · {a.date}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="cta-heading"
        className="mt-20 rounded-2xl border border-border bg-surface p-8 sm:p-10"
      >
        <h2 id="cta-heading" className="text-2xl font-semibold tracking-tight">
          Let&apos;s work together
        </h2>
        <p className="mt-3 max-w-2xl text-muted">{siteConfig.lookingFor}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-medium text-accent-fg transition-colors hover:bg-accent-strong"
          >
            <MailIcon className="size-4" /> Email me
          </a>
          <ExternalLink
            href={siteConfig.links.linkedin}
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 font-medium transition-colors hover:border-accent"
          >
            <LinkedInIcon className="size-4" /> Connect on LinkedIn
          </ExternalLink>
        </div>
      </section>
    </div>
  );
}
