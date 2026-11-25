# SEO / GEO status

Last updated: **2026-11-25 (UTC)**, after PR #17 was merged and deployed.
Update this file whenever production changes.

**Labels used in this document:**
- **Verified:** checked directly, with the date and the method given.
- **Repo:** true of the code; not checked on the live site.
- **Unverified:** an assumption, or something only a dashboard can show.

## 1. Production (`main` at 0b75f9e, PR #17)

- **Release:** PR #17 (`release/seo-geo-es-loomis`), merge commit `0b75f9e`,
  merged 2026-11-25 17:59 UTC.
- **Production deployment:** Vercel, finished 2026-11-25 18:00 UTC
  (2026-11-26 01:00 Vietnam time, UTC+7).
- **Live domain:** https://sketchsteps.app

Verified 2026-11-25 (UTC) on the live site, by requesting every page and
running `scripts/check-seo.py` on the downloaded HTML and sitemap.

| Area | State |
|---|---|
| Live pages | Homepages `/`, `/es`, `/fr`, `/ja`, `/de`; `/support`; privacy policies; `/account-deletion`; `/blog`; `/es/blog`; three articles. All return 200. |
| Articles (3) | `/blog/how-to-draw-a-face` (en, published 2026-11-18, updated 2026-11-25); `/blog/how-to-draw-a-turkey` (en, published 2026-11-24); `/es/blog/como-dibujar-una-cara` (es, published 2026-11-25). All `index, follow`, self-canonical. |
| hreflang | Face article en ↔ es + x-default (reciprocal). Turkey article: none (English only). Homepages: en/es/fr/ja/de + x-default. |
| Homepages (GEO) | **Live in all five languages:** H1 "Learn to Draw Portraits, Step by Step." (translated), hero label "Turn your photos into step-by-step drawing guides" (translated), verified product facts, restructured FAQ, WebPage + SoftwareApplication JSON-LD. Design unchanged. |
| Sitemap | **14 URLs:** 5 homepages, support, 2 privacy policies, account deletion, `/blog`, `/es/blog`, 3 articles. Every entry is live, indexable and self-canonical. |
| robots.txt | `User-Agent: *` / `Allow: /`, plus the sitemap URL. |
| Google Rich Results Test | **Passed with only optional warnings** (live URLs, 2026-11-25). Spanish article, English face article, turkey article: 3 valid items each (Article, Breadcrumbs, Organization); optional warnings that `datePublished`/`dateModified` are dates without a time zone. Homepage: Organization + Software App valid; optional warning "missing aggregateRating" (deliberate: no invented ratings). |
| AI and search crawlers | GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended and Bingbot user agents all get 200 (no bot blocking). Pages are server-rendered HTML, so crawlers that don't run JavaScript see the full text. |
| `www.sketchsteps.app` | **Outstanding:** no working HTTPS. The certificate covers `sketchsteps.app` only ("subjectAltName does not match"). DNS is correct (CNAME to Vercel). Fix: add www to the Vercel project as a 308 redirect to the apex (`docs/reports/2026-11/geo-implementation-plan.md` §1). No DNS change is needed. |
| GA4 | **Intentionally disabled by owner decision** (see §3a). No measurement ID or Google script in the live HTML (verified 2026-11-25). Not a bug. |
| Vercel Analytics | **Repo:** `<Analytics />` in `components/root-document.tsx`. Cookieless. Use the Vercel dashboard for data. |

## 2. Implemented, not deployed

Nothing. Everything prepared on `feature/geo-homepage-facts` and
`feature/es-content-seo` shipped with PR #17.

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
- `scripts/check-seo.py` checks that it parses. Google's Rich Results Test on
  the live URLs passed with only optional warnings (§1).

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
| 2 | Search Console: confirm the domain property and sitemap; URL inspection + request indexing for `/es/blog/como-dibujar-una-cara`, `/es/blog`, `/blog/how-to-draw-a-face`, `/` | Owner |
| 3 | Bing Webmaster Tools: verify or import from GSC, submit the sitemap and the same URLs | Owner |
| 4 | Native review of es, fr, de and ja homepage copy; native Spanish article review | Reviewers |
| 5 | Drawing-accuracy review of the face article | Reviewer |
| 6 | AI referral measurement without new tracking: Vercel Analytics referrer view, GSC Generative AI report, Bing AI Performance | Owner |
| 7 | Android release: update the platform-specific copy (section 6, item 1) | Developer |
