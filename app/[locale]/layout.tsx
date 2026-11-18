import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";

import { RootDocument } from "@/components/root-document";
import {
  DEFAULT_LOCALE,
  PREFIXED_LIVE_LOCALES,
  isLiveLocale,
} from "@/i18n/config";
import { rootViewport, sharedRootMetadata } from "@/lib/metadata";

/**
 * Root layout for prefixed locales (/es, /fr, /ja, later /ko).
 *
 * Only locales marked "live" in i18n/config.ts are generated. Everything else,
 * including planned locales and `/en/...`, is a 404: there are no placeholder
 * or untranslated pages to index. No redirects happen here.
 *
 * Pages are added under this segment as they are translated, e.g.
 * app/[locale]/page.tsx for the localized homepage, and each page sets its
 * own localized metadata via `pageMetadata({ locale, ... })`.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return PREFIXED_LIVE_LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = sharedRootMetadata;

export const viewport: Viewport = rootViewport;

export default async function LocaleRootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLiveLocale(locale) || locale === DEFAULT_LOCALE) notFound();

  setRequestLocale(locale);

  return <RootDocument locale={locale}>{children}</RootDocument>;
}
