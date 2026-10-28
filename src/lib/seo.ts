import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * Per-page metadata with a canonical URL. Open Graph / Twitter images come from the nearest
 * opengraph-image.tsx file (generated per project and post), so they aren't set here.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  jobTitle: siteConfig.headline,
  description: siteConfig.description,
  email: `mailto:${siteConfig.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
  sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
  knowsAbout: ["Web application security", "Next.js", "TypeScript", "Security operations", "Wazuh"],
};
