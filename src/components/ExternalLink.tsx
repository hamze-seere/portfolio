import type { AnchorHTMLAttributes } from "react";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> & { href: string };

/**
 * Every off-site link goes through here so it always opens safely:
 * `noopener` stops the new page from controlling this one via window.opener (reverse tabnabbing),
 * `noreferrer` stops leaking the current URL in the Referer header.
 */
export function ExternalLink({ children, ...props }: Props) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
