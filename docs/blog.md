# Blog

Multilingual blog at `/blog`, `/es/blog`, `/fr/blog`, `/ja/blog`, `/de/blog`.
Statically generated, no CMS, no extra dependencies.

## How content works

Articles are TypeScript files, not MDX or a database:

- type-checked: a missing field, a wrong block type or a typo in a category
  fails `tsc`;
- validated at build time (`lib/blog/index.ts`): slugs, real dates, image
  files in `/public`, alt text, image sizes, links to other articles and
  related ids. Any problem stops the build with a list of what to fix;
- written as structured blocks (paragraph, heading, list, image, steps, tip,
  appCta), so the design stays consistent and nobody needs to touch React to
  add an article.

MDX would allow free-form JSX in articles but needs `@next/mdx`,
`@mdx-js/loader`, `@mdx-js/react` and `@types/mdx`, and its frontmatter is not
type-checked. It can be added later without changing URLs.

| Path | Purpose |
|---|---|
| `content/blog/index.ts` | Registry: the list of published articles (empty today). |
| `content/blog/<id>/index.ts` | One article with all its language versions. |
| `content/blog/authors.ts` | Authors (only the team today). |
| `content/blog/fixtures/` | Local-only test articles (see below). |
| `public/blog/<id>/` | The article's images. |
| `lib/blog/types.ts` | Content model. |
| `lib/blog/index.ts` | Loader, validation, queries. |
| `lib/blog/seo.ts` | Metadata and JSON-LD. |
| `components/blog/` | Index, card, article, body blocks, CTA. |
| `messages/*.json` → `Blog` | UI text in five languages. |

## Adding an article

1. Put the images in `public/blog/<article-id>/`. Use real Sketch Steps
   output or your own drawings; note each file's pixel size.
2. Create `content/blog/<article-id>/index.ts`:

```ts
import type { Article } from "@/lib/blog/types";

const article: Article = {
  id: "how-to-draw-a-face",
  category: "portraits", // portraits | loomis-method | drawing-basics | animals | app-guides
  author: "team",
  related: [], // ids of other articles (optional)
  translations: {
    en: {
      slug: "how-to-draw-a-face",
      title: "How to draw a face with the Loomis method",
      description: "120-160 characters for search results and social cards.",
      status: "published", // "draft" is never built
      publishedAt: "2026-12-01", // the real date it goes live
      heroImage: { src: "/blog/how-to-draw-a-face/hero.jpg", alt: "...", width: 1200, height: 900 },
      body: [
        { type: "paragraph", text: "Text with **bold**, *italic* and [links](/blog/other-slug)." },
        { type: "heading", level: 2, text: "Start with a circle" },
        { type: "steps", steps: [{ title: "Draw the cranium", text: "...", image: { src: "...", alt: "...", width: 900, height: 1200 } }] },
        { type: "tip", text: "..." },
        { type: "appCta" },
      ],
    },
    // es: { slug: "como-dibujar-una-cara", ... } once the translation exists
  },
};

export default article;
```

3. Import it in `content/blog/index.ts` and add it to `ARTICLES`.
4. Run `pnpm build`. The build lists anything to fix.

Optional image fields: `framing` (uniform scale <= 1 and shift, CSS only, to keep
a step sequence in one frame; see the homepage `stepFraming`) and, per
translation, `socialImage` (1200x630 Open Graph / Twitter image; defaults to
the hero).

Rules:

- **Translations belong to one entry.** Only versions of the same article go
  in its `translations`; hreflang is generated from them. Never put an
  unrelated article there, and never add a language until its translation is
  written.
- **Slugs:** lowercase ASCII words joined by `-`, localized for es/fr/de,
  romanized for ja (`kao-no-kakikata`). A slug is a URL: do not change it after
  publishing.
- **Dates:** `publishedAt` is the real publication date and cannot be in the
  future. Set `updatedAt` only for a real content change.
- **Authors:** the team (organization) by default. Add a person only with
  their real name and consent. No invented personas.
- **Facts:** no invented statistics, reviews, testimonials or results.
  Drawings must be real.
- **Links** to other articles must point to a published version in that
  language (`/blog/<slug>`, `/es/blog/<slug>`); the build checks this.

## SEO

| Item | Behaviour |
|---|---|
| Canonical | Every page points to itself. |
| hreflang | An article lists its own published translations (+ `x-default` = English when it exists). Blog indexes list the languages whose index is indexable. |
| Robots | Articles: index. A blog index stays **noindex** (and out of the sitemap) until its language has a published article. Fixtures: noindex, nofollow (meta tag and `X-Robots-Tag` header). |
| `<html lang>`, `og:locale` | From the route's language. |
| Open Graph / Twitter | `og:type=article`, hero image, `article:published_time` / `modified_time`, `summary_large_image`. |
| JSON-LD | Article: `BlogPosting` (author, publisher = the Sketch Steps organization, dates, image, language) + `BreadcrumbList`. Index: `Blog` + `BreadcrumbList`. |
| Sitemap | Indexable blog indexes and every published article, with hreflang and real `lastmod`. |
| Internal links | Related articles (same language: `related` first, then same topic, then newest), breadcrumbs, topic links on the index, and a "Blog" link in the header and footer once a language has articles. |

Languages without articles: their blog page exists (no 404 from the language
menu) but is noindex, shows a short "coming soon" text and is not linked from
the header or footer.

## Analytics

Blog pages use the site's single consent-aware GA4 setup (no extra script).
GA4 records `page_view` automatically. Store buttons send `store_click` with
`cta_location` `blog_index`, `blog_article` or `blog_inline` (plus `header`
and `footer`), `page_language` and `page_path`. See `docs/analytics.md`.

## Local fixtures (testing only)

`content/blog/fixtures/` holds two clearly marked test articles (en/es/ja and
en/fr, plus a de draft that must not be built) using real demo images.

Safeguards, each sufficient on its own to keep them out of production:

| Layer | What it does |
|---|---|
| Build gate | Fixtures load only with `BLOG_FIXTURES=1` **and** a local build. Any hosted or CI build (`VERCEL`, `VERCEL_ENV` or `CI` set; Vercel sets the first two in every build) ignores the flag and logs a warning. So a Vercel production deploy cannot contain them, even if `BLOG_FIXTURES=1` is configured there. |
| Reserved prefix | Fixture ids and slugs must start with `fixture-`, and real articles cannot use that prefix (the build fails otherwise). |
| HTTP header | `next.config.ts` sends `X-Robots-Tag: noindex, nofollow` for `/blog/fixture-*` and `/<locale>/blog/fixture-*` on every host. |
| Page | `<meta name="robots" content="noindex, nofollow">`, no dates, a visible "local fixture, not for publication" banner. |
| Sitemap / indexing | Never in the sitemap or the blog JSON-LD; they never make a blog index indexable. |

To preview them locally:

```bash
BLOG_FIXTURES=1 pnpm build && pnpm start
```

A normal build (and every Vercel or CI build) contains no fixture pages, so
`/blog/fixture-*` is a 404 and the blog indexes do not list them.

## Local draft preview

Drafts listed in `content/blog/drafts.ts` (not the public registry) can be
reviewed locally:

```bash
BLOG_DRAFT_PREVIEW=1 pnpm build && BLOG_DRAFT_PREVIEW=1 pnpm start
```

Same gate as fixtures: local builds only (`VERCEL`, `VERCEL_ENV` or `CI` set
means the flag is ignored). Previewed drafts show a "Local draft preview"
banner, are `noindex, nofollow`, have no dates and never appear in the sitemap
or the blog JSON-LD. Every translation in that list must stay
`status: "draft"` without `publishedAt`, or the build fails. To publish, move
the article to `content/blog/index.ts` (see "Adding an article").

## Known framework note

Next.js 15 drops a whole `[locale]/blog/[slug]` route when the slug list of
one language is empty, so `app/[locale]/blog/[slug]/page.tsx` returns every
(locale, slug) pair itself. Keep it that way.
