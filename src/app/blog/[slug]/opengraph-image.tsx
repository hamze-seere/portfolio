import { getPost, getPosts } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage, truncate } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Blog post";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  return renderOgImage({
    eyebrow: post ? `${post.readingTime} min read` : "blog",
    title: post?.meta.title ?? "Blog",
    subtitle: post ? truncate(post.meta.summary) : undefined,
  });
}
