import Image from "next/image";
import Link from "next/link";

import { focusRing } from "@/components/home/primitives";
import type { Locale } from "@/i18n/config";
import type { BlogEntry } from "@/lib/blog";
import { cn } from "@/lib/utils";

/** "18 November 2026" in the page's language; dates are calendar days (UTC). */
export function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`),
  );
}

/** Blog listing card: the whole card is one link to the article. */
export function ArticleCard({
  entry,
  categoryLabel,
  headingLevel = 3,
}: {
  entry: BlogEntry;
  categoryLabel: string;
  headingLevel?: 2 | 3;
}) {
  const { translation, locale } = entry;
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[28px] border border-line bg-white shadow-card transition hover:-translate-y-0.5">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand/40">
        <Image
          src={translation.heroImage.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-crimson">
          {categoryLabel}
        </p>
        <Heading className="mt-2 text-balance font-display text-xl font-extrabold leading-snug text-ink">
          <Link
            href={entry.href}
            className={cn(
              "rounded-sm after:absolute after:inset-0 after:rounded-[28px] after:content-['']",
              focusRing,
            )}
          >
            {translation.title}
          </Link>
        </Heading>
        <p className="mt-2 line-clamp-3 text-pretty text-base leading-7 text-ink-soft">
          {translation.excerpt ?? translation.description}
        </p>
        {translation.publishedAt ? (
          <p className="mt-auto pt-4 text-sm font-semibold text-ink-soft">
            <time dateTime={translation.publishedAt}>
              {formatDate(translation.publishedAt, locale)}
            </time>
          </p>
        ) : null}
      </div>
    </article>
  );
}
