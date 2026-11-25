# CLAUDE.md: Sketch Steps landing site

Entry point for Claude Code sessions and new team members. Read this file
first, then the document linked for the area you're working in. Several
developers work on this repository, each with their own Claude Code account,
so **the repository is the shared memory**. Anything another session needs to
know goes into these docs, not only into a chat.

## 1. Project

- **What it is:** the marketing website and blog for **Sketch Steps**, a
  drawing app for iPhone, iPad and Android ("Sketch Steps: AI Loomis Draw" on
  the App Store and Google Play).
- **Production domain:** https://sketchsteps.app (apex). `www.sketchsteps.app`
  does **not** work yet (TLS error; see `docs/SEO-GEO-STATUS.md`).
- **Repository:** `recepcanakdemir/sketch_steps_landing` on GitHub. Default
  branch `main`.
- **Hosting:** Vercel, project `sketch-steps-landing`, connected to GitHub.

### Product positioning (keep all copy consistent with this)

- **Homepage H1:** "Learn to Draw Portraits, Step by Step."
- **Core capability:** turn your photos into step-by-step drawing guides,
  based on the Loomis method.
- **Also in the app:**
  - a tracing studio (Draw with Camera, Draw on Screen);
  - Trace AI styles;
  - ready-made templates;
  - free tutorials (iPhone/iPad).
- **Audience:** beginners and hobby artists learning proportion, face
  structure and shading.

### Fact rules

1. **Only state facts you can source.** Every product claim must come from the
   current App Store or Google Play listing, the privacy policies, or the app
   itself.
2. **Never invent** ratings, reviews, prices, download counts, testimonials,
   social profiles, supported languages or features.
3. **iOS and Android differ today.** Describe the current state per platform
   ("on iPhone and iPad…").
   - A new Android version is coming. Don't describe its features before
     release, and don't call features permanently iOS-only.
4. **No speculative GEO markup.** No `llms.txt`, no FAQPage schema, no
   AI-only pages or hidden text.

Where each fact comes from, and the open questions:
`docs/reports/2026-11/geo-homepage-change-report.md`.

## 2. Stack and architecture

- **Framework:** Next.js 15 App Router, fully static (SSG), no middleware.
- **Libraries:** React 19, TypeScript, Tailwind CSS 3, next-intl 4,
  framer-motion.
- **Package manager:** pnpm (`pnpm-lock.yaml`). `npx` works if pnpm is not
  installed.

| Path | What it is |
|---|---|
| `app/(en)/` | English pages (no URL prefix): home, support, privacy policies, account deletion, `/blog`, `/instagram`, `/tiktok` (noindex campaign copies of home). |
| `app/[locale]/` | `/es`, `/fr`, `/ja`, `/de` homepages and their blogs. |
| `app/sitemap.ts`, `app/robots.ts` | Sitemap and robots.txt. |
| `app/opengraph-image.tsx`, `twitter-image.tsx` | Social images. |
| `components/home/` | Landing page sections. |
| `components/blog/` | Blog UI. |
| `content/blog/` | Articles as TypeScript (`index.ts` = published registry, `drafts.ts` = local drafts). |
| `lib/site.ts` | Single source of truth for site facts: URLs, store IDs, English home title and description. |
| `lib/metadata.ts`, `lib/structured-data.ts` | Metadata, canonical, hreflang, JSON-LD. |
| `lib/blog/` | Blog loader, build-time validation, blog SEO. |
| `messages/*.json` | All UI text in en, es, fr, de, ja. |
| `i18n/` | Locale config (ko is planned, not routed). |
| `lib/analytics.ts`, `components/analytics.tsx` | GA4 (consent-gated, currently off). |
| `lib/attribution.ts`, `components/source-tracking.tsx` | `?s=` link codes and store-click attribution (Supabase). |
| `scripts/` | Social image generators, font subsetting, `check-seo.py`. |
| `docs/` | Documentation (index below). |

## 3. Languages

- **Live homepages:** en (`/`), es, fr, ja, de.
- **Pages that exist only in English:** support, legal pages, account
  deletion. `/es/support` returns 404.
- **Korean** is configured as planned and is not routed.
- **Blog:**
  - English articles at `/blog/...`; Spanish at `/es/blog/...`.
  - `/es/blog` becomes indexable once Spanish has a published article (it has
    one in the current release PR).
  - The fr, de and ja blog indexes are noindex.

Details: `docs/i18n.md`. Translated homepage copy has not had a native-speaker
review (see the status doc).

## 4. Development workflow

```bash
pnpm install              # or: npm/npx with the existing lockfile
pnpm dev                  # http://localhost:3000
npx tsc --noEmit -p .     # types
npx eslint . --max-warnings=0
npx next build            # production build (also validates all blog content)
python3 scripts/check-seo.py   # SEO checks on the build output
```

**Local previews:**
- Drafts: `BLOG_DRAFT_PREVIEW=1 npx next build && BLOG_DRAFT_PREVIEW=1 npx next start`.
- Test fixtures: `BLOG_FIXTURES=1`.
- Both flags are ignored on Vercel and in CI.

**The build fails on purpose** if blog content is invalid:
- a future `publishedAt` (checked in **UTC**);
- missing images, alt text or sizes;
- a bad link or related id;
- a draft with dates.

## 5. Git safety rules

1. **Never push to `main` directly.** Work on a branch and open a PR against
   `main`.
2. **Merging a PR into `main` deploys to production** (Vercel). Merge or deploy
   only with the owner's explicit approval, per PR.
3. **Never force-push**, rewrite published history, or delete other people's
   branches.
4. **Before starting, fetch and check what is already on `main`**
   (`git fetch && git log origin/main`). Don't redo, revert or duplicate
   merged work.
5. **Branches are often checked out in separate worktrees**
   (`git worktree list`). Don't switch branches inside another session's
   worktree.
6. **Commit trailers:** end commit messages with the Co-Authored-By trailer
   your Claude Code session provides. End PR bodies with the Claude Code line.
7. **No secrets in the repo or in chat.** The GA4 measurement ID and the App
   Store provider token in `lib/site.ts` are public by design.
8. **External changes need the owner:**
   - **DNS:** no changes without approval.
   - **Privacy Policy:** do not change the live policy (owned outside this
     repo).
   - **GA4:** do not send test traffic to the production property.

## 6. Deployment (summary)

- **Every pushed branch** gets a Vercel Preview deployment. Preview builds
  never load GA4, drafts or fixtures.
- **Production:** a merge into `main` deploys https://sketchsteps.app.
- **Rollback:** use Vercel "Instant Rollback" to the previous production
  deployment, then revert the merge commit in a PR.

The full checklist, with SEO checks, Search Console and Bing steps, is in
`docs/DEPLOYMENT-CHECKLIST.md`.

## 7. SEO/GEO architecture (summary)

- **Canonical:** every indexable page points to itself. `/instagram` and
  `/tiktok` are noindex and point to `/`.
- **hreflang:**
  - homepages: en/es/fr/ja/de plus x-default;
  - articles: only their own published translations;
  - an English-only article has none.
- **Sitemap:** indexable pages only. Blog URLs carry a real `<lastmod>`.
- **robots.txt:** allows everything, including AI crawlers.
- **JSON-LD:**
  - homepages: Organization, WebSite, WebPage, SoftwareApplication (no
    ratings, no prices beyond "free");
  - articles: BlogPosting plus BreadcrumbList.

Status, open issues and verification state: `docs/SEO-GEO-STATUS.md`.
History: `docs/SEO-GEO-CHANGELOG.md`.

## 8. Blog publishing workflow (summary)

1. **Research and outline.** Check `docs/CONTENT-ROADMAP.md`. Use only real
   keyword evidence, and label it as such.
2. **Draft.** Create `content/blog/<id>/`, with images in
   `public/blog/<id>/`. Register the article in `content/blog/drafts.ts` with
   `status: "draft"` and no dates.
3. **Editorial review** against `docs/editorial/standards.md`. Notes go in
   `docs/editorial/<id>/` (`image-review.md`, `review.md`).
   - Never tick a human review that hasn't happened.
   - Image origin must be disclosed: say whether the stages were generated by
     Sketch Steps or drawn by a person.
4. **Publish**, with owner approval:
   - set `status: "published"` and `publishedAt` = the UTC date of the
     production deploy;
   - move the import to `content/blog/index.ts`;
   - for a translation, flip the status inside the same entry.
5. **Run the checks, then open a PR.** After deploy: URL inspection in Search
   Console and submission in Bing.

Full guide: `docs/blog.md`.

## 9. Current production state (verified 2026-11-25 UTC)

- **Live:** `main` at `59b6e15` (PR #16).
- **Published articles:**
  - `/blog/how-to-draw-a-face` (2026-11-18);
  - `/blog/how-to-draw-a-turkey` (2026-11-24).
- **Live homepage H1** is still "Learn to Draw Anything, Step by Step." The
  portrait H1, the homepage facts, the structured data updates and the
  Spanish article are in the **release PR** from branch
  `release/seo-geo-es-loomis` (not merged at the time of writing).

Check `git log origin/main` and the open PRs for anything newer.

## 10. Known open issues (short list)

| Issue | Owner | Where |
|---|---|---|
| `www.sketchsteps.app` TLS error (www not added to the Vercel project) | Owner, Vercel dashboard | `docs/reports/2026-11/geo-implementation-plan.md` §1 |
| GA4 is off until the Privacy Policy covers the website | Owner | `docs/analytics.md`, `docs/privacy-disclosures.md` |
| No drawing-accuracy review of the face article (en/es) yet; no native Spanish review | Reviewers to be named | `docs/editorial/how-to-draw-a-face/review.md` |
| Translated homepage copy (es/fr/de/ja) not native-reviewed | Reviewers to be named | `docs/SEO-GEO-STATUS.md` |
| Android feature differences, to update when the new Android version ships | Owner + developer | `docs/SEO-GEO-STATUS.md` |
| Search Console / Bing configuration not verified from the repo | Owner | `docs/SEO-GEO-STATUS.md` |

## 11. Documentation index

| Document | Contents |
|---|---|
| `docs/SEO-GEO-STATUS.md` | What is deployed, what isn't, verification state, open technical tasks |
| `docs/SEO-GEO-CHANGELOG.md` | Dated history of SEO/GEO and content changes |
| `docs/CONTENT-ROADMAP.md` | Published and planned articles, target keywords, research status |
| `docs/DEPLOYMENT-CHECKLIST.md` | Branch → PR → checks → deploy → verification → rollback |
| `docs/blog.md` | Blog architecture, publishing steps, SEO behaviour |
| `docs/editorial/standards.md` | Editorial standards (English and Spanish), glossary |
| `docs/editorial/<article>/` | Per-article image and review notes |
| `docs/i18n.md` | Locale routing and translation rules |
| `docs/analytics.md` | GA4 + Vercel Analytics, consent, events |
| `docs/attribution.md` | `?s=` link codes and store-click attribution |
| `docs/privacy-disclosures.md` | Privacy facts the website relies on |
| `docs/release-review.md` | Historical: the 2.0 release handoff (PR #11) |
| `docs/reports/2026-11/` | Point-in-time reports: GEO audit and plan, homepage facts, article reports, Spanish keyword research |
