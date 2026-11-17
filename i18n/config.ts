/**
 * Central locale configuration. This file has no framework imports so it can
 * be used anywhere: route layouts, metadata, the sitemap, structured data.
 *
 * Routing rules:
 * - English (the default locale) lives on the root: `/`, `/support`, ...
 *   There is never an `/en/...` URL.
 * - Every other locale lives under its own prefix: `/es/`, `/fr/`, `/ja/`.
 * - A locale is only routed, indexed and listed in the sitemap/hreflang once
 *   its status is "live". "planned" locales return 404, so no untranslated
 *   placeholder page can ever be crawled or indexed.
 *
 * To launch a locale: add `messages/<locale>.json`, translate the pages, then
 * flip its status to "live". See docs/i18n.md.
 */

export type LocaleStatus = "live" | "planned";

export type LocaleDefinition = {
  /** BCP 47 code used in URLs, <html lang> and hreflang. */
  code: string;
  /** Native name, for a future language switcher. */
  nativeName: string;
  /** Open Graph locale (language_TERRITORY). */
  ogLocale: string;
  status: LocaleStatus;
};

export const LOCALES = [
  { code: "en", nativeName: "English", ogLocale: "en_US", status: "live" },
  { code: "es", nativeName: "Español", ogLocale: "es_ES", status: "live" },
  { code: "fr", nativeName: "Français", ogLocale: "fr_FR", status: "planned" },
  { code: "ja", nativeName: "日本語", ogLocale: "ja_JP", status: "planned" },
  { code: "ko", nativeName: "한국어", ogLocale: "ko_KR", status: "planned" },
] as const satisfies readonly LocaleDefinition[];

export type Locale = (typeof LOCALES)[number]["code"];

export const DEFAULT_LOCALE = "en" satisfies Locale;

/** Every locale the codebase knows about, live or not. */
export const ALL_LOCALES: readonly Locale[] = LOCALES.map((l) => l.code);

/** Locales that are routed, indexed and advertised via hreflang. */
export const LIVE_LOCALES: readonly Locale[] = LOCALES.filter(
  (l) => l.status === "live",
).map((l) => l.code);

/** Live locales that use a URL prefix (everything except the default). */
export const PREFIXED_LIVE_LOCALES: readonly Locale[] = LIVE_LOCALES.filter(
  (code) => code !== DEFAULT_LOCALE,
);

export function isLocale(value: string): value is Locale {
  return (ALL_LOCALES as readonly string[]).includes(value);
}

export function isLiveLocale(value: string): value is Locale {
  return (LIVE_LOCALES as readonly string[]).includes(value);
}

export function getLocaleDefinition(locale: Locale): LocaleDefinition {
  return LOCALES.find((l) => l.code === locale)!;
}

/**
 * Maps a locale-neutral path ("/support") to its public path for a locale.
 * English stays unprefixed: ("en", "/support") -> "/support",
 * ("es", "/support") -> "/es/support", ("es", "/") -> "/es".
 */
export function localizePath(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}
