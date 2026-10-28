import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="wrap flex min-h-[60vh] flex-col justify-center py-24">
      <p className="font-mono text-sm text-muted">
        <span className="text-accent">$</span> curl -I {"<this page>"}
      </p>
      <p className="mt-2 font-mono text-sm text-danger">HTTP/2 404 Not Found</p>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
        Nothing to see here.
      </h1>
      <p className="mt-4 max-w-lg text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved. No sensitive files here
        either, I checked.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-md bg-accent px-5 py-2.5 font-medium text-accent-fg transition-colors hover:bg-accent-strong"
        >
          Go home
        </Link>
        <Link
          href="/projects"
          className="rounded-md border border-border px-5 py-2.5 font-medium transition-colors hover:border-accent"
        >
          View projects
        </Link>
      </div>
    </div>
  );
}
