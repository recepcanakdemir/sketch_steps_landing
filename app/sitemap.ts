import type { MetadataRoute } from "next";

import {
  DEFAULT_LOCALE,
  LIVE_LOCALES,
  localizePath,
  type Locale,
} from "@/i18n/config";
import { languageAlternates } from "@/lib/metadata";
import { INDEXABLE_PAGES, absoluteUrl, type SitePage } from "@/lib/site";

/**
 * One <url> per page per live locale it is translated into, each carrying
 * hreflang alternates once a second locale is live. Planned locales never
 * appear. Phase 3 blog articles append entries through the same function.
 */
function toEntries(page: SitePage): MetadataRoute.Sitemap {
  const locales = (page.locales ?? [DEFAULT_LOCALE]).filter((l) =>
    LIVE_LOCALES.includes(l),
  );
  const overrides = page.localizedPaths ?? {};
  const languages = languageAlternates(page.path, overrides, locales);

  return locales.map((locale: Locale) => ({
    url: absoluteUrl(localizePath(locale, overrides[locale] ?? page.path)),
    ...(page.lastModified ? { lastModified: page.lastModified } : {}),
    ...(page.changeFrequency ? { changeFrequency: page.changeFrequency } : {}),
    ...(page.priority !== undefined ? { priority: page.priority } : {}),
    ...(languages ? { alternates: { languages } } : {}),
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_PAGES.flatMap(toEntries);
}
