import type { Locale } from "@/i18n/config";

/**
 * Single source of truth for site-wide facts used by metadata, the sitemap,
 * robots.txt and structured data. Keep these values factual: they are read by
 * search engines and AI assistants.
 */

export const SITE_URL = "https://sketchsteps.app";
export const SITE_NAME = "Sketch Steps";
export const SUPPORT_EMAIL = "support@sketchsteps.app";

/** Store listing name, as published on the App Store and Google Play. */
export const STORE_APP_NAME = "Sketch Steps: AI Loomis Draw";

export const APP_STORE_ID = "6763632360";
export const APP_STORE_URL = `https://apps.apple.com/us/app/sketch-steps-ai-loomis-draw/id${APP_STORE_ID}`;
export const GOOGLE_PLAY_ID = "com.sketchsteps.app";
export const GOOGLE_PLAY_URL = `https://play.google.com/store/apps/details?id=${GOOGLE_PLAY_ID}`;

export const LOGO_PATH = "/images/sketch-steps-app-icon.png";

/** Builds an absolute URL on the production origin. */
export function absoluteUrl(path = "/"): string {
  if (path === "/" || path === "") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Indexable, canonical public pages. The sitemap is generated from this list,
 * so a new public page should be added here. Do not list noindex routes
 * (e.g. /instagram, /tiktok) or private pages.
 *
 * `lastModified` is intentionally omitted unless a real, maintained date is
 * known; a fabricated date is worse than none.
 *
 * `locales` lists the languages a page has actually been translated into.
 * It defaults to English only, so a page never appears in another locale's
 * sitemap or hreflang until its translation exists AND that locale is live
 * (see i18n/config.ts).
 */
export type SitePage = {
  /** Locale-neutral path, e.g. "/support". */
  path: string;
  locales?: readonly Locale[];
  /** Per-locale path overrides for localized slugs. */
  localizedPaths?: Partial<Record<Locale, string>>;
  changeFrequency?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: number;
  lastModified?: string;
};

export const INDEXABLE_PAGES: SitePage[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/support", changeFrequency: "monthly", priority: 0.5 },
  { path: "/ios-privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/android-privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/account-deletion", changeFrequency: "yearly", priority: 0.3 },
];
