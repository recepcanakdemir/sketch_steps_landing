import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { HomePage } from "@/components/home/home-page";
import { localizePath, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";
import { jsonLd, localizedHomeStructuredData } from "@/lib/structured-data";

/**
 * Translated homepage (/es, and later /fr, /ja). Only generated for live
 * locales (see the [locale] layout), statically rendered, with the same
 * components as the English homepage and copy from messages/<locale>.json.
 *
 * SEO: localized title/description, self-referencing canonical, hreflang for
 * every language listed for "/" in INDEXABLE_PAGES, og:locale from i18n config.
 */

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return pageMetadata({
    title: t("home.title"),
    description: t("home.description"),
    socialTitle: t("home.socialTitle"),
    socialImageAlt: t("socialImage.alt"),
    path: "/",
    locale,
  });
}

export default async function LocalizedHome({ params }: Props) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Metadata.home" });

  const structuredData = localizedHomeStructuredData({
    locale,
    url: absoluteUrl(localizePath(locale, "/")),
    title: t("title"),
    description: t("description"),
    appDescription: t("appDescription"),
    offerDescription: t("offerDescription"),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
      <HomePage />
    </>
  );
}
