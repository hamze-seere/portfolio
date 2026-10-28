/**
 * Theme persistence without an inline script.
 *
 * The visitor's explicit choice is stored in a tiny first-party cookie. The server reads it and
 * renders <html data-theme="..."> directly, so the correct palette is in the very first paint.
 * With no cookie, no attribute is rendered and CSS falls back to prefers-color-scheme (dark if
 * the OS expresses no preference).
 */
export const THEME_COOKIE = "theme";

export type Theme = "light" | "dark";

/** Allowlist parse: cookie values are attacker-controlled input like anything else. */
export function parseTheme(value: string | undefined): Theme | undefined {
  return value === "light" || value === "dark" ? value : undefined;
}
