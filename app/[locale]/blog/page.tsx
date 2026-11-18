import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { BlogIndexPage } from "@/components/blog/blog-pages";
import type { Locale } from "@/i18n/config";
import { blogIndexMetadata } from "@/lib/blog/seo";

/** Translated blog index (/es/blog, /fr/blog, ...). Live locales only (see the layout). */

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "Blog.index" });
  const tMeta = await getTranslations({ locale, namespace: "Metadata" });
  return blogIndexMetadata(locale, {
    title: t("title"),
    description: t("description"),
    socialImageAlt: tMeta("socialImage.alt"),
  });
}

export default async function LocalizedBlogIndex({ params }: Props) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  return <BlogIndexPage locale={locale} />;
}
