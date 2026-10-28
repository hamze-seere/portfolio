import type { ReactNode } from "react";

/** Section heading with a monospace "comment" eyebrow — the site's main terminal accent. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="font-mono text-sm text-accent" aria-hidden="true">
        {"// "}
        {eyebrow}
      </p>
      <h2 id={id} className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {children ? <div className="mt-3 text-muted">{children}</div> : null}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-surface-2 px-2 py-0.5 font-mono text-xs text-muted">
      {children}
    </span>
  );
}

export function StatusBadge({
  status,
}: {
  status: "live" | "in-progress" | "archived" | "earned";
}) {
  const label = {
    live: "Live",
    "in-progress": "In progress",
    archived: "Archived",
    earned: "Earned",
  }[status];
  const tone =
    status === "in-progress"
      ? "text-warn border-warn/40"
      : status === "archived"
        ? "text-muted border-border"
        : "text-accent border-accent/40";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs ${tone}`}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {label}
    </span>
  );
}

export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="pt-16 pb-10 sm:pt-20">
      <p className="font-mono text-sm text-accent">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h1>
      {children ? <div className="mt-4 max-w-2xl text-lg text-muted">{children}</div> : null}
    </header>
  );
}
