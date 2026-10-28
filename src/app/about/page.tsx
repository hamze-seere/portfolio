import Link from "next/link";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { ExternalLink } from "@/components/ExternalLink";
import { DownloadIcon } from "@/components/icons";
import { PageHeader, SectionHeading, StatusBadge } from "@/components/ui";

export const metadata = pageMetadata({
  title: "About",
  description: `About ${siteConfig.name}: background, certifications and resume.`,
  path: "/about",
});

// TODO: replace with your real certifications and achievements.
const achievements: {
  title: string;
  issuer: string;
  date: string;
  status: "live" | "in-progress";
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
    status: "live",
  },
  { title: "CTF finish (placeholder)", issuer: "Event name", date: "2025", status: "live" },
];

export default function AboutPage() {
  return (
    <div className="wrap">
      <PageHeader eyebrow="~/about" title="About me">
        <p>
          {siteConfig.headline} based in {siteConfig.location}.
        </p>
      </PageHeader>

      <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div className="prose">
          {/* TODO: replace with your own story. Aim for 3–5 short paragraphs. */}
          <p>
            I started out building websites and quickly got curious about how they fail. That
            curiosity turned into a habit: every feature I ship, I also try to break. Today I work
            across the stack, from Next.js front ends to APIs and the infrastructure underneath,
            with security as a first-class requirement rather than a final checklist.
          </p>
          <p>
            On the defensive side I run a home SOC lab built on Wazuh, where I write detection
            rules, simulate attacks mapped to MITRE ATT&amp;CK and document what gets caught and
            what slips through. On the offensive side I practise on CTFs and lab platforms and write
            up what I learn on the <Link href="/blog">blog</Link>.
          </p>
          <p>
            I&apos;m looking for {siteConfig.lookingFor.charAt(0).toLowerCase()}
            {siteConfig.lookingFor.slice(1)} I value teams that review code carefully, write things
            down and treat security as everyone&apos;s job.
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
            </dl>
          </div>
        </aside>
      </div>

      <section aria-labelledby="certs-heading" className="py-20">
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
                {a.status === "in-progress" ? <StatusBadge status="in-progress" /> : null}
              </div>
              <p className="mt-1 text-sm text-muted">
                {a.issuer} · {a.date}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
