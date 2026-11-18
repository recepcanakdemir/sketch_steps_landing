import Link from "next/link";

import { focusRing } from "@/components/home/primitives";
import { parseInline } from "@/lib/blog/text";
import { cn } from "@/lib/utils";

export const proseLink = cn(
  "rounded-sm font-semibold text-ink underline decoration-crimson/40 decoration-2 underline-offset-4 transition hover:decoration-crimson",
  focusRing,
);

/** Renders article text with **bold**, *italic* and [links](/path). No HTML. */
export function InlineText({ text }: { text: string }) {
  return (
    <>
      {parseInline(text).map((token, index) => {
        switch (token.type) {
          case "bold":
            return (
              <strong key={index} className="font-bold text-ink">
                {token.text}
              </strong>
            );
          case "italic":
            return <em key={index}>{token.text}</em>;
          case "link":
            return token.href.startsWith("/") ? (
              <Link key={index} href={token.href} className={proseLink}>
                {token.text}
              </Link>
            ) : (
              <a key={index} href={token.href} className={proseLink} rel="noopener">
                {token.text}
              </a>
            );
          default:
            return token.text;
        }
      })}
    </>
  );
}
