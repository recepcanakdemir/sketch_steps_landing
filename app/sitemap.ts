import type { MetadataRoute } from "next";

import {
  DEFAULT_LOCALE,
  LIVE_LOCALES,
  localizePath,
  type Locale,
} from "@/i18n/config";
import {
  BLOG_PATH,
  articleLocalizedPaths,
  getBlogEntries,
  indexableBlogLocales,
  isIndexable,
  sitemapArticles,
} from "@/lib/blog";
import { languageAlternates } from "@/lib/metadata";
import { INDEXABLE_PAGES, absoluteUrl, type SitePage } from "@/lib/site";

/**
 * One <url> per page per live locale it is translated into, each carrying
 * hreflang alternates once a second locale is live. Planned locales never
 * appear.
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

/**
 * Blog: each language's index once it has a real (non-fixture) published
 * article, and every published article with hreflang limited to its own
 * translations. Local fixtures never appear. lastModified is the article's
 * real updatedAt/publishedAt (for an index, its newest article).
 */
function blogEntries(): MetadataRoute.Sitemap {
  const indexLocales = indexableBlogLocales();
  const indexLanguages = languageAlternates(BLOG_PATH, {}, indexLocales);
  const indexes = indexLocales.map((locale) => {
    const newest = getBlogEntries(locale)
      .filter(isIndexable)
      .map((entry) => entry.translation.updatedAt ?? entry.translation.publishedAt ?? "")
      .sort()
      .at(-1);
    return {
      url: absoluteUrl(localizePath(locale, BLOG_PATH)),
      ...(newest ? { lastModified: newest } : {}),
      changeFrequency: "weekly" as const,
      priority: 0.6,
      ...(indexLanguages ? { alternates: { languages: indexLanguages } } : {}),
    };
  });

  const articles = sitemapArticles().flatMap(({ article, entries }) => {
    const languages = languageAlternates(
      entries[0].path,
      articleLocalizedPaths(article),
      entries.map((entry) => entry.locale),
    );
    return entries.map((entry) => ({
      url: absoluteUrl(entry.href),
      lastModified: entry.translation.updatedAt ?? entry.translation.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      ...(languages ? { alternates: { languages } } : {}),
    }));
  });

  return [...indexes, ...articles];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [...INDEXABLE_PAGES.flatMap(toEntries), ...blogEntries()];
}
