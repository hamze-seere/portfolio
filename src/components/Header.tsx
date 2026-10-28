import Link from "next/link";
import { siteConfig } from "@/config/site";
import { NavLinks } from "@/components/NavLinks";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur">
      {/* Mobile: logo + toggle on one row, nav on the next. No JS menu needed. */}
      <div className="wrap flex flex-wrap items-center justify-between gap-x-4 py-2 sm:flex-nowrap">
        <Link
          href="/"
          className="font-mono text-sm font-medium"
          aria-label={`${siteConfig.name} — home`}
        >
          <span className="text-accent" aria-hidden="true">
            ~/
          </span>
          {siteConfig.name.toLowerCase().replace(/\s+/g, "-")}
        </Link>
        <div className="order-last -mx-3 w-full overflow-x-auto sm:order-none sm:mx-0 sm:w-auto">
          <nav aria-label="Main">
            <NavLinks />
          </nav>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
