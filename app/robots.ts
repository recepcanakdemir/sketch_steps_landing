import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site";

/**
 * All crawlers, including search engines and AI search crawlers, may crawl
 * public content. Next.js build output under /_next/ stays crawlable so
 * rendering engines can load CSS and JS. Noindex pages (/instagram, /tiktok)
 * are deliberately NOT disallowed here: crawlers must be able to fetch them to
 * see their noindex directive.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
