// Typing for MDX files in /content. Wildcard module declarations don't merge, so this restates
// the default export from @types/mdx and adds our named exports. `meta` is deliberately
// `unknown`: it is validated with zod in src/lib/content.ts rather than trusted.
declare module "*.mdx" {
  import type { MDXContent } from "mdx/types";

  export const meta: unknown;
  /** Injected at build time by src/lib/mdx/remark-reading-time.mjs. */
  export const readingTime: number;
  const MDXComponent: MDXContent;
  export default MDXComponent;
}
