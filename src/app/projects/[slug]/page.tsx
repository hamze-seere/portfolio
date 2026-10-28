import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { formatDate, getProject, getProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { ExternalLink } from "@/components/ExternalLink";
import { ExternalIcon, GitHubIcon } from "@/components/icons";
import { StatusBadge, Tag } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

// Only slugs from the content registry exist; anything else is a 404 without touching the renderer.
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return pageMetadata({
    title: project.meta.title,
    description: project.meta.summary,
    path: `/projects/${project.slug}`,
    type: "article",
    publishedTime: project.meta.date,
  });
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const { meta, Content } = project;

  return (
    <article className="wrap">
      <header className="pt-16 pb-10 sm:pt-20">
        <Link href="/projects" className="font-mono text-sm text-muted hover:text-accent">
          ← ~/projects
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <StatusBadge status={meta.status} />
          {meta.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          {meta.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{meta.summary}</p>

        <dl className="mt-8 grid gap-6 border-y border-border py-6 text-sm sm:grid-cols-3">
          <div>
            <dt className="font-mono text-xs text-muted uppercase">Role</dt>
            <dd className="mt-1">{meta.role}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-muted uppercase">Stack</dt>
            <dd className="mt-1">{meta.stack.join(" · ")}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-muted uppercase">Date</dt>
            <dd className="mt-1">
              <time dateTime={meta.date}>{formatDate(meta.date)}</time>
            </dd>
          </div>
        </dl>
      </header>

      <Image
        src={meta.cover.src}
        alt={meta.cover.alt}
        width={1200}
        height={675}
        priority
        sizes="(min-width: 1024px) 960px, 100vw"
        className="h-auto w-full rounded-xl border border-border"
      />

      <div className="prose mx-auto mt-12">
        <Content />

        <h2 id="links">Links</h2>
        {meta.links.demo || meta.links.github ? (
          <div className="not-prose flex flex-wrap gap-3">
            {meta.links.demo ? (
              <ExternalLink
                href={meta.links.demo}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 font-medium text-accent-fg no-underline hover:bg-accent-strong"
              >
                Live demo <ExternalIcon className="size-4" />
              </ExternalLink>
            ) : null}
            {meta.links.github ? (
              <ExternalLink
                href={meta.links.github}
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 font-medium text-fg no-underline hover:border-accent"
              >
                <GitHubIcon className="size-4" /> Source on GitHub
              </ExternalLink>
            ) : null}
          </div>
        ) : (
          <p className="text-muted">No public links for this project.</p>
        )}
      </div>
    </article>
  );
}
