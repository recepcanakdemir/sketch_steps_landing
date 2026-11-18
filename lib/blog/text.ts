import type { Locale } from "@/i18n/config";
import type { Block } from "@/lib/blog/types";

/**
 * The small inline syntax allowed in article text: **bold**, *italic* and
 * [link text](href). Anything else is plain text (no HTML is ever rendered).
 */
export type InlineToken =
  | { type: "text"; text: string }
  | { type: "bold"; text: string }
  | { type: "italic"; text: string }
  | { type: "link"; text: string; href: string };

const INLINE = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

export function parseInline(source: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let last = 0;
  for (const match of source.matchAll(INLINE)) {
    const index = match.index ?? 0;
    if (index > last) tokens.push({ type: "text", text: source.slice(last, index) });
    if (match[1] !== undefined) tokens.push({ type: "bold", text: match[1] });
    else if (match[2] !== undefined) tokens.push({ type: "italic", text: match[2] });
    else tokens.push({ type: "link", text: match[3], href: match[4] });
    last = index + match[0].length;
  }
  if (last < source.length) tokens.push({ type: "text", text: source.slice(last) });
  return tokens;
}

/** Text without inline markup. */
export function plainText(source: string): string {
  return parseInline(source)
    .map((token) => token.text)
    .join("");
}

/** Every link target in a piece of text. */
export function inlineLinks(source: string): string[] {
  return parseInline(source).flatMap((token) => (token.type === "link" ? [token.href] : []));
}

/** All text of a block, for reading time and link checks. */
export function blockTexts(block: Block): string[] {
  switch (block.type) {
    case "paragraph":
    case "heading":
      return [block.text];
    case "list":
      return block.items;
    case "image":
      return block.caption ? [block.caption] : [];
    case "steps":
      return block.steps.flatMap((step) => [step.title, step.text ?? ""]);
    case "tip":
      return [block.title ?? "", block.text];
    case "appCta":
      return [];
  }
}

/**
 * Estimated reading time in whole minutes (at least 1): ~200 words a minute,
 * or ~500 characters a minute for Japanese, which has no word spaces.
 */
export function readingMinutes(body: Block[], locale: Locale): number {
  const text = body.flatMap(blockTexts).map(plainText).join(" ");
  const amount =
    locale === "ja"
      ? text.replace(/\s/g, "").length / 500
      : text.split(/\s+/).filter(Boolean).length / 200;
  return Math.max(1, Math.round(amount));
}

/** Anchor id for a heading: ASCII slug, or a numbered fallback (e.g. Japanese). */
export function headingId(text: string, index: number): string {
  const slug = plainText(text)
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || `section-${index + 1}`;
}
