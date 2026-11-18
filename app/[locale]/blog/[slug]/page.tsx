import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { BlogArticlePage } from "@/components/blog/blog-pages";
import { PREFIXED_LIVE_LOCALES, type Locale } from "@/i18n/config";
import { getBlogEntries, getBlogEntry } from "@/lib/blog";
import { articleMetadata } from "@/lib/blog/seo";

/**
 * Translated blog articles (/es/blog/<slug>, ...), statically generated.
 * Only slugs published in that language exist; everything else is a 404.
 */

export const dynamicParams = false;

/**
 * Every (locale, slug) pair, not just the current locale's: Next.js 15 drops
 * the whole route when the list for any one locale is empty (e.g. a language
 * with no articles yet), so the pairs are generated here in one go. Each
 * call returns the same full list; Next de-duplicates the paths.
 */
export function generateStaticParams() {
  return PREFIXED_LIVE_LOCALES.flatMap((locale) =>
    getBlogEntries(locale).map((entry) => ({ locale, slug: entry.translation.slug })),
  );
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const entry = getBlogEntry(locale as Locale, slug);
  return entry ? articleMetadata(entry) : {};
}

export default async function LocalizedBlogArticle({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const entry = getBlogEntry(locale as Locale, slug);
  if (!entry) notFound();
  return <BlogArticlePage entry={entry} />;
}
