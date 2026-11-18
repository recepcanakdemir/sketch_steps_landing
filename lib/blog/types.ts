import type { Locale } from "@/i18n/config";

/**
 * Blog content model. Articles are plain TypeScript files in content/blog/
 * (see docs/blog.md): type-checked, statically generated, no CMS and no
 * extra dependencies. Rendering lives in components/blog/.
 */

/** An image in /public. Real Sketch Steps drawings and screenshots only. */
export type BlogImage = {
  /** Path under /public, e.g. "/blog/how-to-draw-a-face/step-1.jpg". */
  src: string;
  /** Describes what the image shows, in the article's language. */
  alt: string;
  /** Intrinsic pixel size of the file. */
  width: number;
  height: number;
};

/**
 * Body blocks. Text fields accept a small inline syntax: **bold**, *italic*
 * and [link text](/path or https://...). No HTML.
 */
export type Block =
  | { type: "paragraph"; text: string }
  /** h2 / h3. `id` becomes the anchor; defaults to a slug of the text. */
  | { type: "heading"; level: 2 | 3; text: string; id?: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "image"; image: BlogImage; caption?: string }
  /** Numbered step-by-step drawing sequence (one real image per step). */
  | {
      type: "steps";
      steps: { title: string; text?: string; image?: BlogImage }[];
    }
  | { type: "tip"; title?: string; text: string }
  /** In-article App Store / Google Play call to action. */
  | { type: "appCta" };

/** Topic of an article. Labels are translated in messages/*.json (Blog.categories). */
export type CategoryId =
  | "portraits"
  | "loomis-method"
  | "drawing-basics"
  | "animals"
  | "app-guides";

export const CATEGORY_IDS: readonly CategoryId[] = [
  "portraits",
  "loomis-method",
  "drawing-basics",
  "animals",
  "app-guides",
];

/** One language version of an article. */
export type ArticleTranslation = {
  /** URL slug: lowercase ASCII words joined by "-" (romanized for ja). */
  slug: string;
  /** <h1>, also the default <title>. */
  title: string;
  /** Meta description (about 120-160 characters). */
  description: string;
  /** Optional shorter title for <title> and social cards. */
  seoTitle?: string;
  /** Card text on the blog index; defaults to `description`. */
  excerpt?: string;
  /**
   * "published" is built, listed, indexed and in the sitemap. "draft" is
   * never built. Use real dates only.
   */
  status: "published" | "draft";
  /** YYYY-MM-DD, the real first publication date. Required when published. */
  publishedAt?: string;
  /** YYYY-MM-DD, only for a real content update. */
  updatedAt?: string;
  heroImage: BlogImage;
  body: Block[];
};

/**
 * An article and all its language versions. Versions listed here are
 * translations of the same article: they are linked with hreflang. Never put
 * unrelated articles in one entry.
 */
export type Article = {
  /** Stable, language-neutral id (also the folder name). */
  id: string;
  category: CategoryId;
  /** Key in content/blog/authors.ts. */
  author: string;
  /** Ids of related articles, shown in the reader's language when available. */
  related?: string[];
  translations: Partial<Record<Locale, ArticleTranslation>>;
  /**
   * Local test content (content/blog/fixtures). Only loaded with
   * BLOG_FIXTURES=1 in local builds (never hosted/CI builds), always noindex,
   * never in the sitemap. Ids and slugs start with "fixture-".
   */
  fixture?: boolean;
};

/**
 * Who wrote an article. Only real people (with their consent) or the team
 * as an organization; never invented personas.
 */
export type Author =
  | { kind: "organization"; name: string }
  | { kind: "person"; name: string; url?: string; jobTitle?: string };
