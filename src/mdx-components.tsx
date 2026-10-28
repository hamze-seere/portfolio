import type { MDXComponents } from "mdx/types";
import { Callout, Figure, H2, H3, MdxImage, MdxLink } from "@/components/mdx";

// Required by @next/mdx in the App Router: maps markdown elements to our components and makes
// <Callout> and <Figure> available in every MDX file without an import.
const components: MDXComponents = {
  h2: H2,
  h3: H3,
  a: MdxLink,
  img: MdxImage,
  Callout,
  Figure,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
