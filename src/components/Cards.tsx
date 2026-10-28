import Image from "next/image";
import Link from "next/link";
import type { Entry, PostMeta, ProjectMeta } from "@/lib/content";
import { formatDate } from "@/lib/content";
import { StatusBadge, Tag } from "@/components/ui";
import { ArrowRightIcon } from "@/components/icons";

/** The whole card is clickable via a stretched link, while keeping a single, accessible link name. */
export function ProjectCard({
  project,
  priority = false,
}: {
  project: Entry<ProjectMeta>;
  priority?: boolean;
}) {
  const { slug, meta } = project;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-accent/60">
      <Image
        src={meta.cover.src}
        alt={meta.cover.alt}
        width={1200}
        height={675}
        priority={priority}
        sizes="(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw"
        className="aspect-video h-auto w-full border-b border-border object-cover"
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          {meta.status !== "live" ? <StatusBadge status={meta.status} /> : null}
          {meta.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <h3 className="text-lg font-semibold">
          <Link href={`/projects/${slug}`} className="after:absolute after:inset-0">
            {meta.title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-muted">{meta.summary}</p>
        <p className="mt-auto inline-flex items-center gap-1 pt-2 font-mono text-xs text-accent">
          Read case study
          <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </p>
      </div>
    </article>
  );
}

export function PostCard({ post }: { post: Entry<PostMeta> }) {
  const { slug, meta, readingTime } = post;
  return (
    <article className="group relative rounded-xl border border-border p-5 transition-colors hover:border-accent/60">
      <p className="font-mono text-xs text-muted">
        <time dateTime={meta.date}>{formatDate(meta.date)}</time> · {readingTime} min read
      </p>
      <h3 className="mt-2 text-lg font-semibold">
        <Link href={`/blog/${slug}`} className="after:absolute after:inset-0">
          {meta.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{meta.summary}</p>
      {meta.tags.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {meta.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      ) : null}
    </article>
  );
}
