/**
 * Tiny remark plugin (no dependencies): counts the words in an MDX file at build time and
 * injects `export const readingTime = <minutes>` into the compiled module, so pages can show
 * a reading-time estimate without shipping or re-reading the raw source.
 */
const WORDS_PER_MINUTE = 220;

function collectText(node, out) {
  if (node.type === "text" || node.type === "code" || node.type === "inlineCode") {
    out.push(node.value);
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) collectText(child, out);
  }
}

export default function remarkReadingTime() {
  return (tree) => {
    const chunks = [];
    collectText(tree, chunks);
    const words = chunks.join(" ").split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));

    // An mdxjsEsm node with a hand-built ESTree is how remark plugins add exports to MDX.
    tree.children.unshift({
      type: "mdxjsEsm",
      value: `export const readingTime = ${minutes}`,
      data: {
        estree: {
          type: "Program",
          sourceType: "module",
          body: [
            {
              type: "ExportNamedDeclaration",
              specifiers: [],
              source: null,
              declaration: {
                type: "VariableDeclaration",
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    id: { type: "Identifier", name: "readingTime" },
                    init: { type: "Literal", value: minutes, raw: String(minutes) },
                  },
                ],
              },
            },
          ],
        },
      },
    });
  };
}
