import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { formatDate, getPost, getPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Tag } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return pageMetadata({
    title: post.meta.title,
    description: post.meta.summary,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.meta.date,
  });
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const { meta, readingTime, Content } = post;

  return (
    <article className="wrap">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: meta.title,
          description: meta.summary,
          datePublished: meta.date,
          dateModified: meta.updated ?? meta.date,
          url: `${siteConfig.url}/blog/${post.slug}`,
          author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
        }}
      />
      <header className="mx-auto max-w-[70ch] pt-16 pb-10 sm:pt-20">
        <Link href="/blog" className="font-mono text-sm text-muted hover:text-accent">
          ← ~/blog
        </Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {meta.title}
        </h1>
        <p className="mt-4 font-mono text-sm text-muted">
          <time dateTime={meta.date}>{formatDate(meta.date)}</time>
          {meta.updated ? (
            <>
              {" "}
              · updated <time dateTime={meta.updated}>{formatDate(meta.updated)}</time>
            </>
          ) : null}{" "}
          · {readingTime} min read
        </p>
        {meta.tags.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {meta.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        ) : null}
      </header>
      <div className="prose mx-auto">
        <Content />
      </div>
    </article>
  );
}
