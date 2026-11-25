# SEO / GEO status

Last updated: **2026-11-25 (UTC)**, while preparing the release PR from
branch `release/seo-geo-es-loomis`. Update this file whenever production
changes.

**Labels used in this document:**
- **Verified:** checked directly, with the date and the method given.
- **Repo:** true of the code; not checked on the live site.
- **Unverified:** an assumption, or something only a dashboard can show.

## 1. Deployed (production, `main` at 59b6e15)

Verified 2026-11-25 by requesting the live pages (`curl`).

| Area | State |
|---|---|
| Live pages | Homepages `/`, `/es`, `/fr`, `/ja`, `/de`; `/support`; privacy policies; `/account-deletion`; `/blog`; two articles. All return 200. |
| Articles | `/blog/how-to-draw-a-face` (published 2026-11-18) and `/blog/how-to-draw-a-turkey` (published 2026-11-24), both `index, follow`. |
| Homepage H1 (live) | "Learn to Draw Anything, Step by Step." (the portrait H1 is not deployed yet) |
| Sitemap | 12 URLs: 5 homepages, support, 2 privacy policies, account deletion, `/blog`, 2 articles. |
| robots.txt | `User-Agent: *` / `Allow: /`, plus the sitemap URL. |
| AI and search crawlers | GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended and Bingbot user agents all get 200 on an article (no bot blocking). Pages are server-rendered HTML, so crawlers that don't run JavaScript see the full text. |
| `www.sketchsteps.app` | **Broken:** the certificate covers `sketchsteps.app` only ("subjectAltName does not match"). DNS is correct (CNAME to Vercel). Fix: add www to the Vercel project as a 308 redirect to the apex (`docs/reports/2026-11/geo-implementation-plan.md` §1). No DNS change is needed. |
| GA4 | **Off by owner decision** (see §3a). No measurement ID or Google script in the live HTML (verified 2026-11-25). Not a bug. |
| Vercel Analytics | **Repo:** `<Analytics />` in `components/root-document.tsx`. Cookieless. Use the Vercel dashboard for data. |

## 2. Implemented, not deployed (release PR)

Branch `release/seo-geo-es-loomis` = latest `main` + the
`feature/geo-homepage-facts` (f64f68f, eab7b71) and `feature/es-content-seo`
(8f65a12, 85a2225, 9441afa) merges + final changes. **Merging the PR deploys
it.**

**Homepage (all five languages):**
- H1 "Learn to Draw Portraits, Step by Step." with matching translations.
- Hero label "Turn your photos into step-by-step drawing guides", translated.
- Platform facts line: free download · in-app purchases · iPhone and iPad (iOS
  18 or later) · Android.
- Notes that the screens shown are from the iPhone app.
- Trace AI described with examples instead of a fixed count.
- FAQ restructured (8 questions).
- Metadata and social text without speed claims.

**Structured data:**
- A WebPage node on each homepage.
- SoftwareApplication: `operatingSystem` "iOS 18+, Android", `featureList`
  (English only), and an offer description without prices.

**Blog:**
- Spanish article `/es/blog/como-dibujar-una-cara`, published.
- Reciprocal hreflang en ↔ es (plus x-default = English).
- `/es/blog` becomes indexable.
- Four line-position corrections to the English face article, with
  `updatedAt`.

**Tooling:**
- `scripts/check-seo.py`.
- Project documentation (`CLAUDE.md`, the `docs/` files listed there).

After merging, the sitemap should list **14 URLs**: the 12 above, plus
`/es/blog` and `/es/blog/como-dibujar-una-cara`. This was verified in the
release build.

## 3. Search Console, Bing and analytics configuration

| Item | State |
|---|---|
| Google Search Console | **Partly verified:** DNS has two `google-site-verification` TXT records on `sketchsteps.app` (checked 2026-11-25). That fits a verified domain property, but whether the sitemap was submitted, and who has access, can only be seen in the dashboard. **Unverified.** |
| Bing Webmaster Tools | **Unverified.** No Bing verification record was found in DNS or the HTML. It can be imported from Search Console. |
| Generative AI reports | GSC Generative AI performance report and Bing AI Performance: not checked (dashboard). |
| GA4 | **Not used, by decision** (§3a). A property was created earlier (`docs/analytics.md`), but it is not connected to the site and won't be. |
| Vercel Analytics | Installed (**repo**). Referrer views for AI assistants: not set up (**unverified**). |

Measurement plan for AI referrals: `docs/reports/2026-11/geo-audit.md` §3 and
`geo-implementation-plan.md` §4. **Ignore their GA4 parts** (§3a); use Vercel
Analytics referrers, the GSC Generative AI report and Bing AI Performance.

## 3a. Decision: no GA4, no new tracking (owner, 2026-11-25)

GA4 is intentionally **not** configured or activated, because the owner does
not want the additional cookie-consent and privacy requirements it brings.
This is a deliberate business decision, not a technical issue.

- Don't install, configure or activate GA4, and don't add Google Analytics
  or Google tag scripts.
- Don't modify the existing cookie/consent implementation. It stays dormant:
  without a measurement ID nothing from Google loads, no cookie is set and no
  banner appears.
- Don't introduce other analytics or tracking tools.
- Don't list "GA4 inactive" as an issue, gap or task in audits or reports.
- Allowed measurement: Vercel Analytics (cookieless, installed), the
  existing store-click attribution (`docs/attribution.md`), Search Console
  and Bing Webmaster Tools.

## 4. Technical SEO reference

**Canonical:**
- Self-referencing on every indexable page, on `https://sketchsteps.app`.
- `/instagram` and `/tiktok` (noindex) point to `/`.

**hreflang:**
- Homepages: en, es, fr, ja, de plus x-default (= `/`).
- Articles: only their published translations. The face article is en + es
  (after the release); the turkey article is English only, so it has no
  hreflang.
- Blog indexes: only languages whose index is indexable.

**Robots:**
- Articles: `index, follow`.
- Blog indexes: noindex until the language has a published article. fr, de
  and ja are noindex.
- Drafts and fixtures are never built on Vercel.

**Sitemap** (`app/sitemap.ts`):
- Indexable pages only, with hreflang alternates.
- Blog URLs carry a real `<lastmod>`. Homepages and legal pages carry none,
  on purpose: no invented dates.

**JSON-LD:**
- Home: Organization, WebSite, WebPage, SoftwareApplication. No
  `aggregateRating`, `review`, `sameAs` or FAQPage.
- Articles: BlogPosting (author = organization, `inLanguage`, dates, images)
  and BreadcrumbList.
- `scripts/check-seo.py` checks that it parses. Run Google's Rich Results Test
  on the deployed URLs (not done yet for the release).

**Images:**
- `scripts/check-seo.py` checks that every `<img>` has alt text.
- Article step images are original Sketch Steps output; the image origin is
  disclosed in each article.

## 5. GEO status

**Done:**
- Crawler access.
- Server-rendered content.
- Verified product facts on the homepage, matching visible text and JSON-LD.
- WebPage and SoftwareApplication JSON-LD.
- Original tutorial content with disclosed image origin.

**Deliberately not done:**
- `llms.txt`.
- FAQPage schema.
- AI-only pages.
- Ratings or reviews markup.

**Next (from the GEO plan):**
1. Fix www.
2. Verify GSC and Bing, and submit the sitemap.
3. Measure AI referrals.
4. IndexNow (optional).
5. More original articles (`docs/CONTENT-ROADMAP.md`).

## 6. Known limitations and open questions

1. **Android differences:**
   - The Play listing mentions portrait photos only. Is the Animal Drawing
     style on Android?
   - It doesn't mention free tutorials, gives 14 languages without a list, and
     shows no minimum Android version.
   - The site marks these features "iPhone and iPad" today. **When the new
     Android version ships,** update:
     - FAQs 2, 4, 5, 6 and 7;
     - the Features lead;
     - the `featureList` "(iPhone and iPad)" labels;
     - the "screens are from the iPhone app" notes.
2. **Trace AI styles differ by platform:**
   - App Store: pencil sketch, line art, charcoal, anime ink, watercolor.
   - Play: pencil sketch, line art, charcoal, colored pencil, cartoon,
     watercolor.
   - The iPhone screenshot on the site shows six effects; the site gives
     examples only.
3. **Translations:** the es, fr, de and ja homepage copy (including the new
   H1 and hero label) has had **no native-speaker review**. The checklist is
   in `docs/reports/2026-11/geo-homepage-change-report.md` §4.
   - Translated meta descriptions still mention pets and animals without a
     platform.
   - `featureList` is not translated (it is English-only on purpose).
4. **Face article reviews:** the drawing-accuracy review (en + es) and the
   native Spanish review are still open. Nothing is known to be wrong, but the
   reviews haven't happened (`docs/editorial/how-to-draw-a-face/review.md`).
5. **Turkey article date:** `publishedAt` is 2026-11-24, but PR #16 was
   merged on 2026-11-25 (UTC). If the production deploy happened on the 25th,
   the visible date is one day early. The owner decides whether to change it
   (it would also change the sitemap `lastmod`).
6. **Homepage `<lastmod>`:** not set on purpose (there is no reliable
   content date). Possible later: derive it from a maintained constant.

## 7. Outstanding technical tasks

| # | Task | Who |
|---|---|---|
| 1 | Add www as a 308 redirect in Vercel; verify the certificate and the redirects | Owner |
| 2 | GSC: confirm the domain property, submit the sitemap, inspect new URLs | Owner |
| 3 | Bing Webmaster Tools: verify or import, submit the sitemap | Owner |
| 4 | Rich Results Test on `/`, `/es`, both articles and the Spanish article after deploy | Developer |
| 5 | Native review of es, fr, de and ja homepage copy; native Spanish article review | Reviewers |
| 6 | Drawing-accuracy review of the face article | Reviewer |
| 7 | AI referral measurement without new tracking: Vercel Analytics referrer view, GSC Generative AI report, Bing AI Performance | Owner |
| 8 | Android release: update the platform-specific copy (section 6, item 1) | Developer |
