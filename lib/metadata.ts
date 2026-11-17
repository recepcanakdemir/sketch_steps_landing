import type { Metadata, Viewport } from "next";

import {
  DEFAULT_LOCALE,
  LIVE_LOCALES,
  getLocaleDefinition,
  localizePath,
  type Locale,
} from "@/i18n/config";
import { APP_STORE_ID, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

/**
 * Metadata shared by every root layout, whatever the locale: icons, app
 * banner, site verification. Locale-specific copy lives in each layout.
 */
export const sharedRootMetadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  icons: {
    icon: [
      {
        url: "/images/sketch-steps-app-icon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/sketch-steps-app-icon-180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/images/sketch-steps-app-icon-32.png",
    apple: "/images/sketch-steps-app-icon-180.png",
  },
  appleWebApp: {
    title: SITE_NAME,
    capable: true,
    statusBarStyle: "default",
  },
  other: {
    "apple-itunes-app": `app-id=${APP_STORE_ID}`,
    "p:domain_verify": "b2592709c01c190470ce088444485276",
  },
} satisfies Metadata;

export const rootViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FFFFFF",
};

/**
 * A page's public path in each locale. Defaults to the same locale-neutral
 * path for every locale; blog articles with localized slugs pass overrides,
 * e.g. { en: "/blog/how-to-draw-a-face", es: "/blog/como-dibujar-una-cara" }.
 */
export type LocalizedPaths = Partial<Record<Locale, string>>;

/**
 * hreflang alternates for a page. Only live locales that actually have the
 * page are listed, so a planned locale is never advertised. With a single
 * live locale nothing is emitted (a self-only hreflang set adds nothing).
 */
export function languageAlternates(
  path: string,
  overrides: LocalizedPaths = {},
  available: readonly Locale[] = LIVE_LOCALES,
): Record<string, string> | undefined {
  const locales = available.filter((l) => LIVE_LOCALES.includes(l));
  if (locales.length < 2) return undefined;

  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = absoluteUrl(
      localizePath(locale, overrides[locale] ?? path),
    );
  }
  if (locales.includes(DEFAULT_LOCALE)) {
    languages["x-default"] = languages[DEFAULT_LOCALE];
  }
  return languages;
}

type PageMetadataInput = {
  /** Full <title>, used as-is (no template suffix). */
  title: string;
  description: string;
  /** Locale-neutral canonical path, e.g. "/support". */
  path: string;
  locale?: Locale;
  /** Per-locale path overrides (localized slugs). */
  localizedPaths?: LocalizedPaths;
  /** Locales this page exists in; defaults to every live locale. */
  availableLocales?: readonly Locale[];
  /** Shorter title for social cards; defaults to `title`. */
  socialTitle?: string;
  index?: boolean;
};

/**
 * A page-level `openGraph` object replaces (not merges with) the layout's, so
 * the `opengraph-image` / `twitter-image` routes are referenced explicitly
 * here. English images live in app/(en); a launched locale adds its own
 * translated image routes under app/[locale] (served at /{locale}/...).
 */
const SOCIAL_IMAGE = {
  width: 1200,
  height: 630,
  alt: "Sketch Steps: a face photo turned into a step-by-step Loomis drawing guide",
  type: "image/png",
};

/**
 * Per-page metadata with a self-referencing canonical, hreflang alternates
 * and matching Open Graph and Twitter fields. Without this, child pages
 * inherit the homepage's og:url and og:title from the root layout.
 */
export function pageMetadata({
  title,
  description,
  path,
  locale = DEFAULT_LOCALE,
  localizedPaths = {},
  availableLocales,
  socialTitle,
  index = true,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(localizePath(locale, localizedPaths[locale] ?? path));
  const shareTitle = socialTitle ?? title;
  const languages = languageAlternates(path, localizedPaths, availableLocales);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, ...(languages ? { languages } : {}) },
    openGraph: {
      title: shareTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: getLocaleDefinition(locale).ogLocale,
      images: [
        { url: localizePath(locale, "/opengraph-image"), ...SOCIAL_IMAGE },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [
        { url: localizePath(locale, "/twitter-image"), ...SOCIAL_IMAGE },
      ],
    },
    robots: { index, follow: true },
  };
}
