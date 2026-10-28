/**
 * Structured data for search engines. `application/ld+json` is a data block, not executable
 * script, so CSP script-src does not apply to it. We still escape "<" so content can never
 * close the tag early and inject markup.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
