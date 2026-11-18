# Sketch Steps 2.0: release review (feature/seo-geo-blog)

Handoff notes for the teammate who reviews, merges and deploys this branch.
Nothing on this branch has been merged or deployed by the author.

## What the branch contains

| Area | Commit(s) | Docs |
|---|---|---|
| Technical SEO foundation (metadata, canonical, sitemap, robots, JSON-LD) | faa01b3 | — |
| Multilingual routing; es, fr, ja, de landing pages with SEO | 9c98068, 27f35d4, 645ec64, 8edb5cb, ded04ba | `docs/i18n.md` |
| Homepage redesign for Sketch Steps 2.0 | bba71d4, 1032c38 | — |
| Language switcher, browser language detection | 251756c, 6045708 | `docs/i18n.md` |
| GA4 with consent banner and conversion events | ecac220 | `docs/analytics.md` |
| Multilingual blog infrastructure (no published articles) | b5bf35c | `docs/blog.md` |
| First article as an unpublished draft, local draft preview, image framing, social image | latest commit | `docs/blog.md`, `docs/editorial/` |

## RELEASE PREREQUISITE: Privacy Policy

**Do not deploy the analytics changes to production until the Privacy Policy
covers website analytics and cookies.** The live Privacy Policy has not been
changed on this branch, on purpose.

The website now uses Google Analytics 4 (only after the visitor accepts
analytics cookies) alongside Vercel Analytics. Proposed disclosure text and
the facts it must reflect are in `docs/privacy-disclosures.md`; technical
details (cookies set, consent mode, what is sent) are in `docs/analytics.md`.
The policy owner updates the policy; this branch does not.

## First blog article: draft only

- `content/blog/how-to-draw-a-face/index.ts`: `status: "draft"`, no
  `publishedAt`, **not** in `content/blog/index.ts` (the public registry), so
  it is not built, not in the sitemap and not linked anywhere in production.
- It is listed in `content/blog/drafts.ts`, which only loads with
  `BLOG_DRAFT_PREVIEW=1` on a local machine; Vercel/CI builds ignore the flag.
- Open drawing-accuracy questions: `docs/editorial/how-to-draw-a-face/review.md`
  (unticked; for the drawing reviewer, not approved by the author).
- Publishing later (separate change, after review and owner approval): set
  `status: "published"` and the real `publishedAt`, move the import from
  `content/blog/drafts.ts` to `content/blog/index.ts`, build.

## Vercel note

The Vercel GitHub integration creates a **Preview deployment for every pushed
branch**. Preview URLs are not production. GA4 does not load there (it only
loads on the hosts in `NEXT_PUBLIC_GA_HOSTS`, default `sketchsteps.app` and
`www.sketchsteps.app`), and local fixtures and drafts are never built on
Vercel.

## Steps before deploying to production

1. Review the diff of `main...feature/seo-geo-blog` and the docs listed above.
2. Update the Privacy Policy (analytics and cookies) per
   `docs/privacy-disclosures.md`. **Blocking.**
3. Check the Vercel environment variables for Production:
   `NEXT_PUBLIC_GA_MEASUREMENT_ID` (also committed in `.env.production`;
   public ID) and, only if hosts differ, `NEXT_PUBLIC_GA_HOSTS`. Make sure
   `BLOG_FIXTURES` and `BLOG_DRAFT_PREVIEW` are **not** set (they are ignored
   on Vercel anyway).
4. Locally: `pnpm install`, `pnpm lint`, `npx tsc --noEmit`, `pnpm build`.
   The build must list no `/blog/fixture-*` and no `/blog/how-to-draw-a-face`
   route.
5. Check the Vercel Preview deployment of this branch: `/`, `/es`, `/fr`,
   `/ja`, `/de`, `/blog` (noindex "coming soon" until an article is
   published), `/sitemap.xml`, `/robots.txt`, the consent banner, the language
   switcher and browser-language redirect from `/`.
6. In GA4 DebugView (or Realtime) after deploy: no hits before consent; hits
   after "Accept"; `store_click` with `cta_location`.
7. After merge and production deploy: submit the sitemap in Google Search
   Console and check hreflang/canonical on the five landing pages.
8. The draft article stays unpublished until the drawing review is complete
   and the owner approves publication.

## Verified by the author before handoff (local)

- TypeScript, ESLint, production build: pass.
- Language detection E2E 35/35 and extra 10/10; GA4 consent E2E 58/58
  (Google requests blocked, nothing sent to the real property); blog GA 20/20;
  blog SEO 128/128 (with local fixtures).
- Production build on localhost: no GA script, no external requests.
- Build with `VERCEL=1 BLOG_FIXTURES=1 BLOG_DRAFT_PREVIEW=1`: both flags
  ignored, no fixture or draft routes.
- No secrets in the diff.

## Launch decision (owner)

Launched with GA4 **off**: `.env.production` was removed, so there is no
measurement ID, no consent banner and no cookies. GA4 is turned on later,
after the Privacy Policy update (`docs/analytics.md`, "Launch status").
