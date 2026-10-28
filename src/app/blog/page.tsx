import { getPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { PostCard } from "@/components/Cards";
import { PageHeader } from "@/components/ui";

export const metadata = pageMetadata({
  title: "Blog",
  description: "CTF walkthroughs, lab notes and plain-English explanations of web vulnerabilities.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="wrap">
      <PageHeader eyebrow="~/blog" title="Write-ups">
        <p>CTF walkthroughs, SOC lab notes and vulnerabilities explained without the jargon.</p>
      </PageHeader>
      {posts.length ? (
        <div className="grid gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted">First post coming soon.</p>
      )}
    </div>
  );
}
