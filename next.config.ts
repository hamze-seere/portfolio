import type { NextConfig } from "next";
import path from "node:path";
import createMDX from "@next/mdx";
import { staticSecurityHeaders } from "./src/lib/security-headers";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  // Don't advertise the framework in an X-Powered-By header.
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: staticSecurityHeaders }];
  },
};

// Turbopack requires MDX plugins to be referenced by name/path (strings) with serializable options.
const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-gfm", // Local plugins need an absolute path: the loader resolves names relative to itself.
      path.resolve("src/lib/mdx/remark-reading-time.mjs"),
    ],
    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          // Both themes are emitted as CSS variables; globals.css picks one per active theme.
          theme: { dark: "github-dark-dimmed", light: "github-light" },
          keepBackground: false,
          defaultLang: "plaintext",
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
