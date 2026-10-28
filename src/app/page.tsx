import Link from "next/link";
import { siteConfig } from "@/config/site";
import { skillGroups } from "@/config/skills";
import { getFeaturedProjects } from "@/lib/content";
import { personJsonLd } from "@/lib/seo";
import { ProjectCard } from "@/components/Cards";
import { ContactSection } from "@/components/ContactSection";
import { JsonLd } from "@/components/JsonLd";
import { ArrowRightIcon } from "@/components/icons";
import { SectionHeading, Tag } from "@/components/ui";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      <JsonLd data={personJsonLd} />

      {/* Hero */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div className="animate-rise wrap pt-20 pb-24 sm:pt-28 sm:pb-32">
          <p className="font-mono text-sm text-muted">
            <span className="text-accent">$</span> whoami
          </p>
          <h1
            id="hero-heading"
            className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-6xl"
          >
            {siteConfig.name}
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-balance sm:text-2xl">
            {siteConfig.headline}. <span className="text-muted">{siteConfig.tagline}</span>
          </p>
          <p className="mt-6 max-w-xl text-muted">
            {siteConfig.location} · {siteConfig.timezone}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-medium text-accent-fg transition-colors hover:bg-accent-strong"
            >
              View projects <ArrowRightIcon className="size-4" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center rounded-md border border-border px-5 py-2.5 font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section aria-labelledby="featured-heading" className="wrap py-20">
        <SectionHeading id="featured-heading" eyebrow="featured work" title="Selected projects">
          <p>Tools I&apos;ve built and labs I run — each with a write-up of how and why.</p>
        </SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} priority={i < 2} />
          ))}
        </div>
        <Link
          href="/projects"
          className="mt-8 inline-flex items-center gap-1 font-mono text-sm text-accent hover:underline"
        >
          All projects <ArrowRightIcon className="size-4" />
        </Link>
      </section>

      {/* Skills */}
      <section aria-labelledby="skills-heading" className="wrap py-20">
        <SectionHeading id="skills-heading" eyebrow="skills" title="What I work with" />
        <div className="grid gap-8 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold">{group.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section aria-labelledby="about-heading" className="wrap py-20">
        <SectionHeading
          id="about-heading"
          eyebrow="about"
          title="Builder with an attacker's mindset"
        />
        <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
          <p>
            I&apos;m a web developer and security engineer in Nairobi. I like building products
            end-to-end, and I like even more figuring out how they break: misconfigured headers,
            missing authorisation checks, the email domain anyone can spoof.
          </p>
          <p>
            Right now I&apos;m sharpening detection engineering in my home SOC lab and building
            tools like SecureScan that make security checks easy for developers.
          </p>
        </div>
        <Link
          href="/about"
          className="mt-6 inline-flex items-center gap-1 font-mono text-sm text-accent hover:underline"
        >
          More about me <ArrowRightIcon className="size-4" />
        </Link>
      </section>

      <ContactSection />
    </>
  );
}
