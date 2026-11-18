import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { BlogIndexPage } from "@/components/blog/blog-pages";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { blogIndexMetadata } from "@/lib/blog/seo";

/** English blog index (/blog). See docs/blog.md. */

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: DEFAULT_LOCALE, namespace: "Blog.index" });
  return blogIndexMetadata(DEFAULT_LOCALE, {
    title: t("title"),
    description: t("description"),
  });
}

export default function EnglishBlogIndex() {
  setRequestLocale(DEFAULT_LOCALE);
  return <BlogIndexPage locale={DEFAULT_LOCALE} />;
}
