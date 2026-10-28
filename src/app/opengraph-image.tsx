import { siteConfig } from "@/config/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

// Default social card for every page without a more specific opengraph-image.
export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${siteConfig.name} — ${siteConfig.headline}`;

export default function Image() {
  return renderOgImage({
    eyebrow: "whoami",
    title: siteConfig.name,
    subtitle: `${siteConfig.headline}. ${siteConfig.tagline}`,
  });
}
