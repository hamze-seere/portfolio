import type { MDXContent } from "mdx/types";
import { z } from "zod";
import { projectModules } from "@content/projects";
import { postModules } from "@content/blog";

/*
 * Content layer. MDX files are compiled at build time and registered in content/<type>/index.ts.
 * Each file's `meta` export is validated here, so a typo in a date or tag fails the build
 * instead of shipping a broken page.
 */

const isoDate = z.iso.date(); // "YYYY-MM-DD"
const localPath = z.string().regex(/^\/(?!\/)/, "must be a site-relative path like /images/x.svg");

export const projectTags = ["Security", "Web", "Lab"] as const;
export type ProjectTag = (typeof projectTags)[number];

const projectMetaSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1).max(220),
  date: isoDate,
  tags: z.array(z.enum(projectTags)).min(1),
  status: z.enum(["live", "in-progress", "archived"]),
  featured: z.boolean().default(false),
  role: z.string(),
  stack: z.array(z.string()).min(1),
  cover: z.object({ src: localPath, alt: z.string().min(1) }),
  links: z.object({ demo: z.url().optional(), github: z.url().optional() }).default({}),
});

const postMetaSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1).max(220),
  date: isoDate,
  updated: isoDate.optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

export type ProjectMeta = z.infer<typeof projectMetaSchema>;
export type PostMeta = z.infer<typeof postMetaSchema>;

type MdxModule = { default: MDXContent; meta: unknown; readingTime: number };

export type Entry<M> = { slug: string; meta: M; readingTime: number; Content: MDXContent };

function load<M extends { date: string }>(
  kind: string,
  modules: Record<string, MdxModule>,
  schema: z.ZodType<M>,
): Entry<M>[] {
  return Object.entries(modules)
    .map(([slug, mod]) => {
      const parsed = schema.safeParse(mod.meta);
      if (!parsed.success) {
        throw new Error(
          `Invalid meta in content/${kind}/${slug}.mdx:\n${z.prettifyError(parsed.error)}`,
        );
      }
      return { slug, meta: parsed.data, readingTime: mod.readingTime, Content: mod.default };
    })
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

const projects = load("projects", projectModules, projectMetaSchema);
// Drafts are visible while developing locally but never in production builds.
const posts = load("blog", postModules, postMetaSchema).filter(
  (p) => process.env.NODE_ENV !== "production" || !p.meta.draft,
);

export function getProjects(tag?: ProjectTag) {
  return tag ? projects.filter((p) => p.meta.tags.includes(tag)) : projects;
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.meta.featured).slice(0, 4);
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getPosts() {
  return posts;
}

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  // Fixed locale + UTC so server output is deterministic (no hydration mismatch).
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
