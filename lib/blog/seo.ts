import type { Metadata } from "next";

import { localizePath, type Locale } from "@/i18n/config";
import {
  BLOG_PATH,
  articleLocales,
  articleLocalizedPaths,
  getBlogEntries,
  indexableBlogLocales,
  isIndexable,
  type BlogEntry,
} from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";
import { SITE_NAME, absoluteUrl } from "@/lib/site";
import { ORGANIZATION_ID, WEBSITE_ID, homeStructuredData } from "@/lib/structured-data";

/**
 * Blog metadata and JSON-LD.
 *
 * - Canonical: always the page itself.
 * - hreflang: an article lists only its own published translations (one
 *   entry in content/blog = one set of genuine translations), so unrelated
 *   articles are never linked. Blog indexes list the languages whose index
 *   is indexable.
 * - Robots: fixtures are noindex,nofollow; a blog index with no real
 *   articles yet is noindex (and not in the sitemap).
 */

const organization = homeStructuredData["@graph"][0];

/** Translated strings the metadata needs (from messages, Blog namespace). */
type IndexCopy = { title: string; description: string; socialImageAlt?: string };

export function blogIndexMetadata(locale: Locale, copy: IndexCopy): Metadata {
  const indexable = indexableBlogLocales().includes(locale);
  return pageMetadata({
    title: copy.title,
    description: copy.description,
    path: BLOG_PATH,
    locale,
    // A noindex page advertises no alternates.
    availableLocales: indexable ? indexableBlogLocales() : [locale],
    socialImageAlt: copy.socialImageAlt,
    index: indexable,
  });
}

export function articleMetadata(entry: BlogEntry): Metadata {
  const { translation, locale, article } = entry;
  const indexable = isIndexable(entry);
  const title = `${translation.seoTitle ?? translation.title} | ${SITE_NAME}`;
  const base = pageMetadata({
    title,
    description: translation.description,
    path: entry.path,
    locale,
    // A noindex page (draft or fixture) advertises no alternates.
    localizedPaths: indexable ? articleLocalizedPaths(article) : {},
    availableLocales: indexable ? articleLocales(article) : [locale],
    socialTitle: translation.seoTitle ?? translation.title,
    index: indexable,
  });
  const shared = translation.socialImage ?? translation.heroImage;
  const image = {
    url: shared.src,
    width: shared.width,
    height: shared.height,
    alt: shared.alt,
  };

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      images: [image],
      ...(translation.publishedAt ? { publishedTime: translation.publishedAt } : {}),
      ...(translation.updatedAt ? { modifiedTime: translation.updatedAt } : {}),
      authors: [entry.author.name],
    },
    twitter: { ...base.twitter, card: "summary_large_image", images: [image] },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
  };
}

function breadcrumbs(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

type Crumbs = { home: string; blog: string };

const blogUrl = (locale: Locale) => absoluteUrl(localizePath(locale, BLOG_PATH));
const homeUrl = (locale: Locale) => absoluteUrl(localizePath(locale, "/"));

export function blogIndexStructuredData(
  locale: Locale,
  copy: { title: string; description: string } & Crumbs,
) {
  const url = blogUrl(locale);
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "Blog",
        "@id": `${url}#blog`,
        url,
        name: copy.title,
        description: copy.description,
        inLanguage: locale,
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORGANIZATION_ID },
        blogPost: getBlogEntries(locale)
          .filter(isIndexable)
          .map((entry) => ({
            "@type": "BlogPosting",
            headline: entry.translation.title,
            url: absoluteUrl(entry.href),
            ...(entry.translation.publishedAt
              ? { datePublished: entry.translation.publishedAt }
              : {}),
          })),
      },
      breadcrumbs([
        { name: copy.home, url: homeUrl(locale) },
        { name: copy.blog, url },
      ]),
    ],
  };
}

export function articleStructuredData(
  entry: BlogEntry,
  copy: Crumbs & { section: string },
) {
  const { translation, locale, author } = entry;
  const url = absoluteUrl(entry.href);
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        url,
        mainEntityOfPage: url,
        headline: translation.title,
        description: translation.description,
        image: [translation.heroImage, translation.socialImage]
          .filter((img) => img !== undefined)
          .map((img) => absoluteUrl(img.src)),
        ...(translation.publishedAt ? { datePublished: translation.publishedAt } : {}),
        ...(translation.publishedAt
          ? { dateModified: translation.updatedAt ?? translation.publishedAt }
          : {}),
        inLanguage: locale,
        articleSection: copy.section,
        author:
          author.kind === "organization"
            ? { "@id": ORGANIZATION_ID }
            : {
                "@type": "Person",
                name: author.name,
                ...(author.url ? { url: author.url } : {}),
                ...(author.jobTitle ? { jobTitle: author.jobTitle } : {}),
              },
        publisher: { "@id": ORGANIZATION_ID },
        isPartOf: { "@type": "Blog", "@id": `${blogUrl(locale)}#blog` },
      },
      breadcrumbs([
        { name: copy.home, url: homeUrl(locale) },
        { name: copy.blog, url: blogUrl(locale) },
        { name: translation.title, url },
      ]),
    ],
  };
}
