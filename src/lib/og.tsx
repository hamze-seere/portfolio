import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

// Shared Open Graph card renderer (1200×630, the size social networks expect).
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "#0b0f14",
        color: "#e6edf3",
        fontFamily: "sans-serif",
        backgroundImage:
          "linear-gradient(to right, #1b2531 1px, transparent 1px), linear-gradient(to bottom, #1b2531 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, color: "#5eead4", fontFamily: "monospace" }}>
        {`// ${eyebrow}`}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>
          {title}
        </div>
        {subtitle ? (
          <div style={{ display: "flex", fontSize: 30, color: "#9aa8b6", lineHeight: 1.4 }}>
            {subtitle}
          </div>
        ) : null}
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#9aa8b6" }}
      >
        <span>{siteConfig.name}</span>
        <span>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
      </div>
    </div>,
    ogSize,
  );
}

export function truncate(text: string, max = 140) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}
