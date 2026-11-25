# Deployment checklist

Every change follows the same path: **branch → PR → review → merge → automatic
production deploy → verification.** A merge into `main` deploys
https://sketchsteps.app, so the merge itself is the release decision.

## 1. Branch and PR

- [ ] `git fetch origin` and branch from the latest `origin/main`. Don't
      branch from another feature branch unless you plan to merge it.
- [ ] Check `git log origin/main` and the open PRs, so you don't redo or
      revert work that is already merged.
- [ ] To combine several feature branches, use an integration branch from
      `origin/main` (e.g. `release/<name>`). Merge each branch with
      `--no-ff` and resolve any conflicts there, never on `main`.
- [ ] One PR against `main`. The description says:
  - what changed;
  - what was checked;
  - which reviews are still open.
- [ ] The Vercel Preview deployment for the branch builds successfully.
      Previews never load GA4, drafts or fixtures.

## 2. Review requirements

- [ ] Code review by another developer, or the owner.
- [ ] **Owner approval to merge**, given explicitly for this PR.
- [ ] Content: the editorial checklist in `docs/editorial/standards.md`, with
      notes in `docs/editorial/<article>/review.md`.
  - Human reviews (drawing accuracy, native language) are ticked only when a
    named person has done them.
  - Open reviews are listed in the PR.
- [ ] Product claims: each claim matches the current App Store or Google Play
      listing, or the privacy policies. No invented ratings, prices, reviews,
      profiles or features. Android/iOS differences are stated per platform.

## 3. Local checks (paste the results into the PR)

```bash
npx tsc --noEmit -p .
npx eslint . --max-warnings=0
npx next build
python3 scripts/check-seo.py
```

- [ ] **TypeScript:** passes.
- [ ] **ESLint:** 0 warnings.
- [ ] **Production build:** passes. It also validates blog content: dates
      (UTC, none in the future), images, alt text and links.
- [ ] **`check-seo.py` reports "ISSUES: none".** It checks:
  - one H1, a title and a description per page;
  - canonical on the production domain;
  - JSON-LD parses;
  - alt text on every image;
  - hreflang is reciprocal and only points to built, indexable pages;
  - the sitemap matches exactly the indexable pages, and blog URLs carry a
    `lastmod`;
  - article JSON-LD (BlogPosting, BreadcrumbList, no FAQPage) and OG and
    Twitter images;
  - no draft or fixture banners.
- [ ] **Sitemap:** the URL count is as expected. Drafts, fixtures,
      `/instagram`, `/tiktok` and the noindex blog indexes are absent.
- [ ] **Canonical:** new pages point to themselves.
- [ ] **hreflang:** only real translations are listed. An English-only
      article has none.
- [ ] **Structured data:** JSON-LD values match the visible text (title,
      description, dates, headline = H1).
- [ ] **Mobile:** run `npx next start` and check at 375 px.
  - No horizontal scroll.
  - Hero, H1 and article images look right in every changed language.
  - Desktop at 1280 px is unchanged unless the change was intended.
- [ ] **Publishing an article:**
  - `publishedAt` (or `updatedAt`) is the **UTC date of the production
    deploy**;
  - the import moved from `content/blog/drafts.ts` to `content/blog/index.ts`
    (or the translation's status is flipped);
  - the image origin is disclosed in the article.

## 4. Merge and deploy

- [ ] Merge only after section 2's approval. **No auto-merge.**
- [ ] Vercel builds `main` and promotes it to production automatically. Watch
      the deployment in the Vercel dashboard.

## 5. Production verification (right after deploy)

- [ ] New and changed URLs return 200 at `https://sketchsteps.app/...`.
- [ ] `https://sketchsteps.app/sitemap.xml` contains the new URLs.
- [ ] `https://sketchsteps.app/robots.txt` is unchanged.
- [ ] View source on each new page:
  - title;
  - meta description;
  - canonical;
  - `robots` = `index, follow`;
  - hreflang;
  - `og:image` loads (open it).
- [ ] **Google Rich Results Test** on each new or changed page: BlogPosting
      and BreadcrumbList valid, no errors.
- [ ] Spot-check on a real phone.
- [ ] Update `docs/SEO-GEO-STATUS.md` §1, `docs/SEO-GEO-CHANGELOG.md` and
      `CLAUDE.md` §9 if production changed in a notable way.

## 6. Search engines

- [ ] **Google Search Console** (domain property `sketchsteps.app`):
  - URL Inspection on each new URL → Test live URL → Request indexing;
  - sitemap re-submitted if it isn't already submitted;
  - check Pages → Indexed after a few days.
- [ ] **Bing Webmaster Tools:**
  - submit the new URLs (URL Submission) or let IndexNow handle it if added
    later;
  - confirm the sitemap is listed.
- [ ] Don't send test traffic to the production GA4 property.

## 7. Rollback

1. **Vercel dashboard → Deployments:** choose the last good production
   deployment → **Instant Rollback**. The site is restored in seconds; `main`
   is unchanged.
2. Open a PR that reverts the merge commit (`git revert -m 1 <merge-sha>`,
   or `git revert <sha>` for a squash merge). Merge it after approval, so
   `main` matches production again.
3. If an article was rolled back after it was indexed: remove it from the
   registry (it then returns 404) and request removal in Search Console only
   if needed. Never reuse its slug for different content.
4. Record the rollback in `docs/SEO-GEO-CHANGELOG.md`.
