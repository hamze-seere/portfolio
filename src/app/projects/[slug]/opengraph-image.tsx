import { getProject, getProjects } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage, truncate } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Project case study";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  return renderOgImage({
    eyebrow: "case study",
    title: project?.meta.title ?? "Project",
    subtitle: project ? truncate(project.meta.summary) : undefined,
  });
}
