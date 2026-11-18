import { existsSync } from "node:fs";
import path from "node:path";

import { ARTICLES } from "@/content/blog";
import { DRAFT_ARTICLES } from "@/content/blog/drafts";
import { AUTHORS } from "@/content/blog/authors";
import { FIXTURE_ARTICLES } from "@/content/blog/fixtures";
import {
  LIVE_LOCALES,
  isLiveLocale,
  localizePath,
  type Locale,
} from "@/i18n/config";
import { blockTexts, inlineLinks } from "@/lib/blog/text";
import {
  CATEGORY_IDS,
  type Article,
  type ArticleTranslation,
  type Author,
  type BlogImage,
} from "@/lib/blog/types";

/**
 * Blog content loader (server only: it reads the file system at build time).
 *
 * Every article is validated when this module loads, so a mistake fails the
 * build with a readable message instead of shipping a broken page.
 *
 * Local fixtures (content/blog/fixtures) are test content. Layers that keep
 * them out of production, each enough on its own:
 *
 * 1. They load only with BLOG_FIXTURES=1 AND on a local machine: any hosted
 *    or CI build (VERCEL, VERCEL_ENV or CI set; Vercel sets VERCEL and
 *    VERCEL_ENV in every build) ignores the flag, with a warning.
 * 2. Their ids and slugs must start with "fixture-" (and real articles' must
 *    not), checked below; next.config.ts sends X-Robots-Tag: noindex, nofollow
 *    for every /blog/fixture-* URL on any host.
 * 3. Their pages carry <meta name="robots" content="noindex, nofollow">, they
 *    are never in the sitemap or the blog JSON-LD, and they never make a blog
 *    index indexable.
 */

export const BLOG_PATH = "/blog";

/** Prefix every fixture id and slug must use (and no real article may use). */
export const FIXTURE_PREFIX = "fixture-";

const fixturesRequested = process.env.BLOG_FIXTURES === "1";
const hostedBuild = Boolean(process.env.VERCEL || process.env.VERCEL_ENV || process.env.CI);

export const FIXTURES_ENABLED = fixturesRequested && !hostedBuild;

if (fixturesRequested && hostedBuild) {
  console.warn(
    "[blog] BLOG_FIXTURES=1 is ignored in hosted/CI builds: local fixtures are never built here.",
  );
}

/**
 * Local draft preview (content/blog/drafts.ts): same gate as fixtures. Drafts
 * render with a visible "draft preview" notice, noindex, no dates, and are
 * never in the sitemap or the blog JSON-LD. The public registry is untouched.
 */
const draftPreviewRequested = process.env.BLOG_DRAFT_PREVIEW === "1";

export const DRAFT_PREVIEW_ENABLED = draftPreviewRequested && !hostedBuild;

if (draftPreviewRequested && hostedBuild) {
  console.warn(
    "[blog] BLOG_DRAFT_PREVIEW=1 is ignored in hosted/CI builds: drafts are never built here.",
  );
}

/** One published language version of an article. */
export type BlogEntry = {
  article: Article;
  locale: Locale;
  translation: ArticleTranslation;
  /** Locale-neutral path, e.g. "/blog/how-to-draw-a-face". */
  path: string;
  /** Public path, e.g. "/es/blog/como-dibujar-una-cara". */
  href: string;
  author: Author;
};

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

function validDate(value: string) {
  if (!DATE.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function validate(articles: Article[]): void {
  const errors: string[] = [];
  const ids = new Set<string>();
  const slugs = new Map<string, string>();
  const publishedSlugs = new Set<string>();

  for (const article of articles) {
    for (const [locale, translation] of Object.entries(article.translations)) {
      if (translation?.status === "published") publishedSlugs.add(`${locale}:${translation.slug}`);
    }
  }

  const checkImage = (where: string, image: BlogImage) => {
    if (!image.src.startsWith("/") || image.src.includes("..")) {
      errors.push(`${where}: image src must be a /public path ("${image.src}")`);
    } else if (!existsSync(path.join(process.cwd(), "public", image.src))) {
      errors.push(`${where}: image not found in /public ("${image.src}")`);
    }
    if (!image.alt.trim()) errors.push(`${where}: image "${image.src}" needs alt text`);
    if (!(image.width > 0 && image.height > 0)) {
      errors.push(`${where}: image "${image.src}" needs its pixel width and height`);
    }
    const f = image.framing;
    if (f && !(f.scale > 0 && f.scale <= 1 && Number.isFinite(f.x) && Number.isFinite(f.y))) {
      errors.push(`${where}: image "${image.src}" framing scale must be > 0 and <= 1 (never enlarge)`);
    }
  };

  const checkLink = (where: string, href: string) => {
    if (/^https?:\/\//.test(href) || href.startsWith("mailto:")) return;
    if (!href.startsWith("/")) {
      errors.push(`${where}: link "${href}" must start with /, https:// or mailto:`);
      return;
    }
    // Links to other articles must point to a published version.
    const match = href.match(/^(?:\/([a-z]{2}))?\/blog\/([^/?#]+)/);
    if (match) {
      const locale = match[1] ?? "en";
      if (!publishedSlugs.has(`${locale}:${match[2]}`)) {
        errors.push(`${where}: link "${href}" does not match a published article`);
      }
    }
  };

  for (const article of articles) {
    const at = `Article "${article.id}"`;
    if (!SLUG.test(article.id)) errors.push(`${at}: id must be lowercase-with-dashes`);
    if (Boolean(article.fixture) !== article.id.startsWith(FIXTURE_PREFIX)) {
      errors.push(
        article.fixture
          ? `${at}: fixture ids must start with "${FIXTURE_PREFIX}"`
          : `${at}: "${FIXTURE_PREFIX}" is reserved for local fixtures`,
      );
    }
    if (ids.has(article.id)) errors.push(`${at}: duplicate id`);
    ids.add(article.id);
    if (!CATEGORY_IDS.includes(article.category)) errors.push(`${at}: unknown category`);
    if (!AUTHORS[article.author]) errors.push(`${at}: unknown author "${article.author}"`);

    const translations = Object.entries(article.translations);
    if (translations.length === 0) errors.push(`${at}: has no translations`);

    for (const [locale, translation] of translations) {
      if (!translation) continue;
      const where = `${at} (${locale})`;
      if (!isLiveLocale(locale)) errors.push(`${where}: "${locale}" is not a live locale`);
      if (Boolean(article.fixture) !== translation.slug.startsWith(FIXTURE_PREFIX)) {
        errors.push(
          article.fixture
            ? `${where}: fixture slugs must start with "${FIXTURE_PREFIX}"`
            : `${where}: slugs starting with "${FIXTURE_PREFIX}" are reserved for local fixtures`,
        );
      }
      if (!SLUG.test(translation.slug)) {
        errors.push(`${where}: slug "${translation.slug}" must be lowercase ASCII words joined by "-"`);
      }
      const slugKey = `${locale}:${translation.slug}`;
      if (slugs.has(slugKey)) {
        errors.push(`${where}: slug "${translation.slug}" is also used by "${slugs.get(slugKey)}"`);
      }
      slugs.set(slugKey, article.id);
      if (!translation.title.trim()) errors.push(`${where}: missing title`);
      if (!translation.description.trim()) errors.push(`${where}: missing description`);

      if (article.draftPreview && (translation.status !== "draft" || translation.publishedAt)) {
        errors.push(`${where}: preview drafts must stay status "draft" with no publishedAt`);
      }
      if (article.fixture) {
        // Fixtures are test content: no dates, so nothing looks published.
        if (translation.publishedAt || translation.updatedAt) {
          errors.push(`${where}: fixtures must not have publication dates`);
        }
      } else if (translation.status === "published") {
        if (!translation.publishedAt || !validDate(translation.publishedAt)) {
          errors.push(`${where}: published articles need a real publishedAt date (YYYY-MM-DD)`);
        } else if (translation.publishedAt > today()) {
          errors.push(`${where}: publishedAt ${translation.publishedAt} is in the future`);
        }
      }
      if (translation.updatedAt) {
        if (!validDate(translation.updatedAt)) {
          errors.push(`${where}: updatedAt must be a date (YYYY-MM-DD)`);
        } else if (translation.publishedAt && translation.updatedAt < translation.publishedAt) {
          errors.push(`${where}: updatedAt is before publishedAt`);
        }
      }

      checkImage(`${where} hero`, translation.heroImage);
      if (translation.socialImage) checkImage(`${where} social image`, translation.socialImage);
      translation.body.forEach((block, index) => {
        const blockAt = `${where} block ${index + 1}`;
        if (block.type === "image") checkImage(blockAt, block.image);
        if (block.type === "steps") {
          block.steps.forEach((step, stepIndex) => {
            if (step.image) checkImage(`${blockAt} step ${stepIndex + 1}`, step.image);
          });
        }
        for (const text of blockTexts(block)) {
          for (const href of inlineLinks(text)) checkLink(blockAt, href);
        }
      });
    }
  }

  for (const article of articles) {
    for (const id of article.related ?? []) {
      if (!ids.has(id)) errors.push(`Article "${article.id}": related article "${id}" does not exist`);
      if (id === article.id) errors.push(`Article "${article.id}": lists itself as related`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Blog content is invalid:\n- ${errors.join("\n- ")}`);
  }
}

const ALL_ARTICLES: Article[] = [
  ...ARTICLES,
  ...(FIXTURES_ENABLED ? FIXTURE_ARTICLES.map((article) => ({ ...article, fixture: true })) : []),
  ...(DRAFT_PREVIEW_ENABLED
    ? DRAFT_ARTICLES.map((article) => ({ ...article, draftPreview: true }))
    : []),
];

validate(ALL_ARTICLES);

function toEntry(article: Article, locale: Locale): BlogEntry | undefined {
  const translation = article.translations[locale];
  if (!translation) return undefined;
  if (translation.status !== "published" && !article.draftPreview) return undefined;
  const entryPath = `${BLOG_PATH}/${translation.slug}`;
  return {
    article,
    locale,
    translation,
    path: entryPath,
    href: localizePath(locale, entryPath),
    author: AUTHORS[article.author],
  };
}

function sortKey(entry: BlogEntry) {
  // Newest first; undated fixtures last.
  return entry.translation.publishedAt ?? "";
}

/** Published articles in a language, newest first. */
export function getBlogEntries(locale: Locale): BlogEntry[] {
  return ALL_ARTICLES.flatMap((article) => toEntry(article, locale) ?? []).sort((a, b) =>
    sortKey(b).localeCompare(sortKey(a)),
  );
}

export function getBlogEntry(locale: Locale, slug: string): BlogEntry | undefined {
  return getBlogEntries(locale).find((entry) => entry.translation.slug === slug);
}

/** Languages an article is published in (its genuine translations). */
export function articleLocales(article: Article): Locale[] {
  return LIVE_LOCALES.filter((locale) => toEntry(article, locale));
}

/** Per-locale paths of an article's published translations, for hreflang. */
export function articleLocalizedPaths(article: Article): Partial<Record<Locale, string>> {
  return Object.fromEntries(
    articleLocales(article).map((locale) => [locale, toEntry(article, locale)!.path]),
  );
}

/** True when the entry may be indexed (fixtures and draft previews never are). */
export function isIndexable(entry: BlogEntry): boolean {
  return !entry.article.fixture && !entry.article.draftPreview;
}

/**
 * Languages whose blog index is indexable: at least one real (non-fixture)
 * published article. Other blog indexes are noindex and not in the sitemap.
 */
export function indexableBlogLocales(): Locale[] {
  return LIVE_LOCALES.filter((locale) => getBlogEntries(locale).some(isIndexable));
}

/** True when the locale's blog has anything to show (links to the blog are shown then). */
export function hasBlogEntries(locale: Locale): boolean {
  return getBlogEntries(locale).length > 0;
}

/**
 * Related articles in the reader's language: the article's own `related`
 * list first, then others from the same category, then the newest.
 */
export function relatedEntries(entry: BlogEntry, limit = 3): BlogEntry[] {
  const pool = getBlogEntries(entry.locale).filter(
    (candidate) => candidate.article.id !== entry.article.id,
  );
  const explicit = (entry.article.related ?? []).flatMap(
    (id) => pool.find((candidate) => candidate.article.id === id) ?? [],
  );
  const sameCategory = pool.filter(
    (candidate) => candidate.article.category === entry.article.category,
  );
  const picked: BlogEntry[] = [];
  for (const candidate of [...explicit, ...sameCategory, ...pool]) {
    if (picked.length >= limit) break;
    if (!picked.includes(candidate)) picked.push(candidate);
  }
  return picked;
}

/**
 * Language switcher targets on a blog page: the translation when there is
 * one, otherwise that language's blog index if it has articles, otherwise
 * its homepage.
 */
export function blogLanguageHrefs(article?: Article): Partial<Record<Locale, string>> {
  return Object.fromEntries(
    LIVE_LOCALES.map((locale) => {
      const translated = article ? toEntry(article, locale) : undefined;
      if (translated) return [locale, translated.href];
      return [locale, localizePath(locale, hasBlogEntries(locale) ? BLOG_PATH : "/")];
    }),
  );
}

/** Real (non-fixture) articles, for the sitemap. */
export function sitemapArticles(): { article: Article; entries: BlogEntry[] }[] {
  return ALL_ARTICLES.filter((article) => !article.fixture && !article.draftPreview)
    .map((article) => ({
      article,
      entries: articleLocales(article).map((locale) => toEntry(article, locale)!),
    }))
    .filter(({ entries }) => entries.length > 0);
}
