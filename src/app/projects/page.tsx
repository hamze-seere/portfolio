import Link from "next/link";
import { getProjects, projectTags, type ProjectTag } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { ProjectCard } from "@/components/Cards";
import { PageHeader } from "@/components/ui";

export const metadata = pageMetadata({
  title: "Projects",
  description: "Security tools, web applications and lab work — each with a full case study.",
  path: "/projects",
});

/** Map ?tag=security → "Security". Anything not on the allowlist is ignored. */
function parseTag(value: string | string[] | undefined): ProjectTag | undefined {
  if (typeof value !== "string") return undefined;
  return projectTags.find((t) => t.toLowerCase() === value.toLowerCase());
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string | string[] }>;
}) {
  const activeTag = parseTag((await searchParams).tag);
  const projects = getProjects(activeTag);

  // Filtering is plain links + a server render: works without JavaScript and is shareable.
  const filters: { label: string; href: string; active: boolean }[] = [
    { label: "All", href: "/projects", active: !activeTag },
    ...projectTags.map((t) => ({
      label: t,
      href: `/projects?tag=${t.toLowerCase()}`,
      active: activeTag === t,
    })),
  ];

  return (
    <div className="wrap">
      <PageHeader eyebrow="~/projects" title="Projects">
        <p>Things I&apos;ve built, broken and documented. Filter by area:</p>
      </PageHeader>

      <nav aria-label="Filter projects by tag">
        <ul className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <li key={f.label}>
              <Link
                href={f.href}
                aria-current={f.active ? "page" : undefined}
                scroll={false}
                className={`inline-flex rounded-full border px-4 py-1.5 font-mono text-sm transition-colors ${
                  f.active
                    ? "border-accent bg-accent text-accent-fg"
                    : "border-border text-muted hover:border-accent hover:text-fg"
                }`}
              >
                {f.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <p className="sr-only" role="status">
        Showing {projects.length} project{projects.length === 1 ? "" : "s"}
        {activeTag ? ` tagged ${activeTag}` : ""}.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} priority={i < 2} />
        ))}
      </div>
      {projects.length === 0 ? (
        <p className="mt-10 text-muted">No projects with this tag yet.</p>
      ) : null}
    </div>
  );
}
