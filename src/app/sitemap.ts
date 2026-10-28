import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getPosts, getProjects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/blog", "/about", "/security"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const projects = getProjects().map((p) => ({
    url: `${siteConfig.url}/projects/${p.slug}`,
    lastModified: p.meta.date,
    priority: 0.8,
  }));

  const posts = getPosts().map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: p.meta.updated ?? p.meta.date,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projects, ...posts];
}
