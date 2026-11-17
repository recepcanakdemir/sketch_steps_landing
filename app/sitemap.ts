import type { MetadataRoute } from "next";

import { INDEXABLE_PAGES, absoluteUrl, type SitePage } from "@/lib/site";

/**
 * Sitemap entries are built from page descriptors so Phase 2 (localized pages,
 * via `alternates.languages`) and Phase 3 (blog articles) can append their own
 * entries through the same function.
 */
function toEntry(page: SitePage): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(page.path),
    ...(page.lastModified ? { lastModified: page.lastModified } : {}),
    ...(page.changeFrequency ? { changeFrequency: page.changeFrequency } : {}),
    ...(page.priority !== undefined ? { priority: page.priority } : {}),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_PAGES.map(toEntry);
}
