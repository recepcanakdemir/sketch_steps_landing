# Homepage GEO changes: change report

Commit **`f64f68f`** on the local branch **`feature/geo-homepage-facts`**, based
on `origin/main` e0d48f5.

- **Not pushed, merged or deployed. DNS has not been changed.**
- `feature/es-content-seo` is untouched (still at 9441afa, clean).
- The English article corrections and the Spanish draft are not part of this branch.
- The branch is checked out in a separate worktree, `<local worktree sketch_steps_landing-geo>`, so the Spanish-draft preview build in the main checkout was not overwritten. Its `node_modules` is a symlink to the main checkout's and is git-ignored.

## Sources

Every fact in the new copy comes from one of these sources, all checked 24 Nov 2026:

| Source | What it confirms |
|---|---|
| **App Store** (Apple lookup API and listing text) | Free; requires iOS 18; iPhone and iPad (universal); 11 languages; free tutorials need no coins; AI generation needs a subscription or coins; no account needed to start; animal photos; Draw with Camera and Draw on Screen; AI guides can be imperfect. |
| **Google Play** listing | Free with in-app purchases; "portrait photos"; Draw with Camera and Draw on Screen; templates (animals, anime, cars, fruits and vegetables, portraits); 14 languages; no account needed to start; Google sign-in only for purchases; a different list of AI styles. |
| **iOS and Android privacy policies** on the site | Uploaded photos deleted within 1 hour, and at most 7 days; Loomis AI results kept 90 days; Android sign-in only when buying, restoring purchases, or by choice in Settings. The Android policy also names "Trace AI". |
| **App screenshots** (`screens_sketchsteps`, iOS) | The six Trace AI effect names shown on the site. |

## 1. English homepage copy: before → after

| Where | Before | After |
|---|---|---|
| **H1** | Learn to Draw Anything, *Step by Step.* | Learn to Draw Portraits, *Step by Step.* (your wording, with the site's existing trailing period) |
| How it works, lead | …at your own pace. | …at your own pace. **The screens below are from the iPhone app.** |
| Features, lead | …all in one app. | …all in one app. **Screens and styles shown are from the iPhone app; some differ on Android.** |
| Pets and animals card | The Animal Drawing style turns photos… | **On iPhone and iPad,** the Animal Drawing style turns photos… |
| Trace AI card | Turn a photo into an image in one of **six** effects, then save it **to Photos** or trace it. | Turn a photo into a tracing reference in a drawing style, such as pencil, charcoal or watercolor, then save it or trace it. |
| Tracing Studio card | Browse ready-made line drawings in categories such as animals, anime and cars, and keep your favorites. | Trace onto real paper with Draw with Camera or Draw on Screen, using ready-made line drawings of animals, anime, cars and more, or your own photos. |
| **Final CTA** (new line under the store buttons, small white text) | — | Free download · In-app purchases · iPhone and iPad (iOS 18 or later) · Android |
| Meta description | Turn any face photo into an AI-generated step-by-step Loomis drawing guide. Learn portrait drawing **faster**… | Turn a portrait photo into a step-by-step Loomis drawing tutorial, then draw or trace it on real paper. Free download for iPhone, iPad and Android. |
| Open Graph description | Upload a face photo and **instantly** receive an AI-powered Loomis construction breakdown… | Upload a portrait photo and get a step-by-step Loomis construction guide, made for beginners and aspiring portrait artists. |
| Twitter description | Learn portrait drawing **faster** with… | Step-by-step Loomis drawing guides generated from your own portrait photos. |
| Social image text | Upload a face and **instantly** receive guided drawing steps. | Upload a face photo and get guided drawing steps. |

The `<title>` is unchanged.

**Trace AI chips:** the six effect names stay as chips because they match the
iPhone screenshot shown next to them. Their accessible label now says "Trace
AI effects in the iPhone app". No text states a number of effects.

### FAQ

There are still 8 questions. The FAQ was restructured, not expanded.

| # | Question | Change |
|---|---|---|
| 1 | What is the Loomis Method? | Unchanged |
| 2 | What can I learn to draw with Sketch Steps? | Animals marked iPhone and iPad. Template categories completed from both listings. |
| 3 | Is Sketch Steps suitable for beginners? | Reworded to the store wording ("beginners and hobby artists… proportion, face structure and shading"). Removed "without having to search through random tutorials". |
| 4 | Is the app free? | Rewritten: free download on both stores. AI tutorials and Trace AI need a subscription or coins (in-app purchases). Free tutorials marked iPhone and iPad. Prices are shown in the app before you buy. |
| 5 | Which devices does Sketch Steps work on? | **Replaces** "Is there an Android version?": iPhone and iPad with iOS 18 or later; Android on Google Play. Both versions have Loomis tutorials, Trace AI and a tracing studio, but some styles and options differ. Screenshots are from the iPhone app. 11 languages on iPhone and iPad, 14 on Android. |
| 6 | Can I use my own photos? | Library or camera, crop before generating. Portraits on both platforms; animals on iPhone and iPad. Adds the stores' limitation: AI tutorials can occasionally be imperfect, and results vary by photo. |
| 7 | How does tracing work? | **Merges** "What is Trace AI?" and "Does the app support tracing?": the two tracing modes, the sources you can trace, Trace AI styles given as examples only, and "AI styles differ between iPhone and Android". |
| 8 | Do I need an account, and what happens to my photos? | **New**, replacing the separate Trace AI question: no account needed to start; Android sign-in only for purchases, restores or by choice; photo deletion (1 hour, at most 7 days); Loomis tutorials kept 90 days; points to the privacy policy links in the footer. |

The new copy makes no claims about drawing accuracy, speed or learning
outcomes.

## 2. Structured data (`lib/structured-data.ts`)

| Node / field | Before | After |
|---|---|---|
| English homepage `WebPage` | missing | Added: `@id …/#webpage`, url, title, description (shared constants with the metadata), `inLanguage: en`, `isPartOf` → WebSite, `about` → app |
| `SoftwareApplication.description` | "AI drawing app that transforms face photos into…" | "Drawing app that turns portrait photos into step-by-step Loomis method drawing tutorials, with Trace AI and a tracing studio for drawing on real paper." |
| `operatingSystem` | "iOS, Android" | "iOS 18+, Android" (all languages) |
| `featureList` | — | Six items, each visible on the page. Platform-specific items are labeled "(iPhone and iPad)". English page only; left out of es/fr/de/ja until translated. |
| `offers.description` (EN) | "Premium options are shown in the app." | "Free to download. AI generation requires a subscription or coins (in-app purchases)." The price stays "0". |

**Not added:**

- `aggregateRating`, `review`, prices or `sameAs` social profiles;
- `FAQPage`, `llms.txt` or AI-specific markup;
- app `inLanguage`, because the two platforms differ (11 vs 14 languages) and the Android list is not published.

The code was restructured into named `organization`, `website` and `app`
nodes, so the English page can carry a WebPage node without breaking the
translated pages.

## 3. Unresolved factual questions

These claims are kept out of the new copy, or marked as iPhone/iPad only.

1. **Trace AI effects:**
   - The iOS screenshots show six effects. The App Store text lists five styles; Google Play lists six different ones.
   - Please confirm the current list for each platform. Until then the site gives examples only.
2. **Animal Drawing on Android:** the Play listing only mentions portrait photos. Is the Animal Drawing style available on Android?
3. **Free tutorials on Android:** the Play listing doesn't mention them. They're now marked iPhone and iPad in the FAQ.
   - Pre-existing copy still states them without a platform: the hero tag "Free tutorials" and the Free tutorials card. It sits under the "Screens shown are from the iPhone app" note, but please confirm.
4. **Android 14 languages:** the listing gives the count but not the list.
5. **Android minimum version:** not shown on the Play listing, so the site says only "Android".
6. **Trace AI result retention on Android:** the policy states 90 days for Loomis results only. That's why FAQ 8 mentions only Loomis tutorials.
7. **Hero tag "Pets & animals":** pre-existing and unqualified. Same question as item 2.

## 4. Multilingual consistency

**Fixed now, with minimal wording changes pending native review:**

| es / fr / de / ja | Issue | Fix |
|---|---|---|
| Trace AI card and FAQ | "six effects" plus the iOS effect names and "save to Photos" | Examples only (pencil, charcoal, watercolor), plus "styles differ between iPhone and Android" |
| "Is the app free?" | Free tutorials stated without a platform | "free download"; free tutorials marked iPhone and iPad |
| "Is there an Android version?" | "Yes" with no mention of differences | Adds "some features and styles differ on Android; screenshots are from the iPhone app" |
| "What can I learn…" and the animals card | Animals stated without a platform | Marked iPhone and iPad |
| Social image text | "al instante / instantanément / sofort / すぐに" | Removed |

### Localization checklist (still to do, with native review)

For each of es, fr, de and ja:

- [ ] Native review of the lines changed above.
- [ ] H1: still "anything" (lo que quieras / tout / alles / 描きたいもの). Align with "Learn to Draw Portraits".
- [ ] Rebuild the FAQ to the new English 8-question structure: devices, tracing, account and photos.
- [ ] Add `Home.finalCta.facts`. The line is hidden until the key exists.
- [ ] Add the iPhone-screens note to the How it works and Features leads.
- [ ] Update the Tracing Studio card (both tracing modes).
- [ ] Meta description: mentions pets/animals without a platform ("mascotas", "animaux", "Tiere", "ペット・動物"). Align with the new English description.
- [ ] `Metadata.home.appDescription` and `offerDescription`: align with the English JSON-LD wording.
- [ ] Translate `featureList`, then include it on the translated pages.
- [ ] "Is Sketch Steps suitable for beginners?": align with the store wording.

## 5. Test results

- `tsc --noEmit`: passes.
- `eslint .`: passes with 0 warnings. One warning from my first version was fixed.
- `next build` (production): passes. 32 static pages; the sitemap still has 11 URLs.
- **Built HTML (en, es, fr, de, ja and /instagram):**
  - JSON-LD parses on every page.
  - English: Organization, WebSite, **WebPage**, SoftwareApplication, with `featureList`.
  - Translated pages: unchanged node set, no `featureList`.
  - 8 FAQ items everywhere.
  - The facts line appears in English only. No missing-message keys are rendered.
  - No "six", "instantly" or equivalents remain. The German "sofort" and Japanese "すぐに" that remain mean "right away" in the free-tutorials card, not a speed claim.
- **Social images:** all five language versions render (200, PNG). I checked the English and Japanese ones visually.
- **Mobile, 375 px:** the H1 wraps to three lines; the facts line wraps to two; no horizontal scroll.
- **Not checked:**
  - Google Rich Results Test, which needs a public URL; run it on the deployed page.
  - A real-device check.

## Still needs your action

- **www fix in Vercel:** steps are in `geo-implementation-plan.md`. No DNS change is expected.
- **Answers** to the questions in section 3.
- **Native reviewers** for section 4.
- **Approval** before any push, merge or deploy. This branch and `feature/es-content-seo` both start from `origin/main`. They touch different parts of `messages/es.json` (Home vs Blog), so a later merge should be straightforward.

---

## Update, 24 Nov 2026: final consistency pass (commit `eab7b71`)

Branch `feature/geo-homepage-facts`: `f64f68f` (kept as is), then `eab7b71`.
Not pushed, merged or deployed.

**Fixes in `eab7b71`** (es/fr/de/ja, text only, same layout):

- **Facts line** under the final CTA, in all four languages:
  - free download;
  - in-app purchases;
  - iPhone and iPad with iOS 18 or later;
  - Android.
  - Why: the shared JSON-LD `operatingSystem` ("iOS 18+, Android") had no visible support on the translated pages.
- **"Screens and styles shown are from the iPhone app; some differ on Android"** note in the How it works and Features leads, and the Trace AI chips labeled as iPhone effects. Same as English.

**Checks on the final build:**

- **Code:** `tsc` passes; `eslint --max-warnings=0` passes; `next build` passes (32 pages).
- **SEO, all 17 built pages:**
  - one H1 each;
  - title and description present;
  - self-referencing canonicals;
  - robots unchanged (blog indexes in es/fr/de/ja stay noindex; /instagram and /tiktok stay noindex);
  - homepage hreflang reciprocal across en/es/fr/de/ja plus x-default;
  - all JSON-LD parses;
  - no images without alt text;
  - no raw message keys;
  - sitemap still has 11 URLs.
- **Structured data vs visible text, per language:**
  - WebPage name and description equal the page `<title>` and meta description;
  - `inLanguage` is correct;
  - "iOS 18", "Android" and "Trace AI" are visible on every homepage;
  - `featureList` is on the English page only, and each item is visible there;
  - no "six" effects and no "instantly" wording remain.

**Known, intentionally left (no platform claim, pending native review):**

- Translated H1s still say "draw anything".
- Translated meta descriptions mention pets.
- English hero tags "Pets & animals" and "Free tutorials" are qualified by the FAQ and the Features notes, not by the tags themselves.
- When the new Android version launches: update FAQs 2, 4, 5, 6 and 7, the Features lead, and the `featureList` "(iPhone and iPad)" labels.
