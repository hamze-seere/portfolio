import Image from "next/image";
import Link from "next/link";
import { Children, isValidElement, type ComponentProps, type ReactNode } from "react";
import { ExternalLink } from "@/components/ExternalLink";

/** Plain-text content of a React node tree, used to derive heading anchors. */
function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** h2/h3 get stable ids plus a hover "#" link so sections can be deep-linked. */
function heading(Tag: "h2" | "h3") {
  return function Heading({ children }: { children?: ReactNode }) {
    const id = slugify(textOf(Children.toArray(children)));
    return (
      <Tag id={id} className="group scroll-mt-24">
        {children}
        <a
          href={`#${id}`}
          className="ml-2 text-muted no-underline opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
          aria-label="Link to this section"
        >
          #
        </a>
      </Tag>
    );
  };
}

export const H2 = heading("h2");
export const H3 = heading("h3");

/** Internal links use next/link; anything absolute goes through ExternalLink (noopener noreferrer). */
export function MdxLink({ href = "", children, ...rest }: ComponentProps<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  if (href.startsWith("mailto:")) return <a href={href}>{children}</a>;
  return <ExternalLink href={href}>{children}</ExternalLink>;
}

const calloutStyles = {
  note: { label: "Note", className: "border-accent/50 bg-accent/5" },
  tip: { label: "Tip", className: "border-accent/50 bg-accent/5" },
  warning: { label: "Warning", className: "border-warn/60 bg-warn/5" },
  danger: { label: "Danger", className: "border-danger/60 bg-danger/5" },
} as const;

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: keyof typeof calloutStyles;
  title?: string;
  children: ReactNode;
}) {
  const style = calloutStyles[type];
  return (
    <aside className={`rounded-lg border-l-4 px-4 py-3 ${style.className}`} role="note">
      <p className="font-mono text-xs font-semibold tracking-wider uppercase">
        {title ?? style.label}
      </p>
      <div className="mt-1 [&>p+p]:mt-3">{children}</div>
    </aside>
  );
}

/** Use for every image in MDX so it goes through next/image with explicit dimensions. */
export function Figure({
  src,
  alt,
  caption,
  width = 1200,
  height = 675,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 768px) 700px, 100vw"
        className="h-auto w-full rounded-lg border border-border bg-surface"
      />
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

/** Plain markdown images ![alt](src) are routed through next/image too (16:9 assumed). */
export function MdxImage({ src, alt }: ComponentProps<"img">) {
  if (typeof src !== "string") return null;
  // Markdown wraps images in <p>, so this must stay inline content (no <figure>).
  return (
    <Image
      src={src}
      alt={alt ?? ""}
      width={1200}
      height={675}
      sizes="(min-width: 768px) 700px, 100vw"
      className="my-8 block h-auto w-full rounded-lg border border-border bg-surface"
    />
  );
}
