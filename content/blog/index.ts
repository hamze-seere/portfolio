// Blog registry. To add a post: create `<slug>.mdx` in this folder, then add it below.
// The object key becomes the URL: /blog/<key>.
import * as mdxShowcase from "./securing-nextjs-with-a-strict-csp.mdx";

export const postModules = {
  "securing-nextjs-with-a-strict-csp": mdxShowcase,
};
