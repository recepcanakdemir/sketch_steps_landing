import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { BlogArticlePage } from "@/components/blog/blog-pages";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { getBlogEntries, getBlogEntry } from "@/lib/blog";
import { articleMetadata } from "@/lib/blog/seo";

/** English blog articles (/blog/<slug>), statically generated. */

export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogEntries(DEFAULT_LOCALE).map((entry) => ({ slug: entry.translation.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getBlogEntry(DEFAULT_LOCALE, (await params).slug);
  return entry ? articleMetadata(entry) : {};
}

export default async function EnglishBlogArticle({ params }: Props) {
  setRequestLocale(DEFAULT_LOCALE);
  const entry = getBlogEntry(DEFAULT_LOCALE, (await params).slug);
  if (!entry) notFound();
  return <BlogArticlePage entry={entry} />;
}
