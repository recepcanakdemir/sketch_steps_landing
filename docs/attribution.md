# Link attribution

Which link (social account, post, campaign) sends visitors, store clicks and
installs. No cookies and nothing stored on the device, so no consent banner
is needed.

## Links

Use a short opaque code: `https://sketchsteps.app/?s=<code>`.

**Never put account names or a code-to-account table in this repository.**
It is public, and so is the site's JavaScript. The owner keeps the table
privately. Codes: 2–6 characters, lowercase letters and digits, never reused.

Standard tags also work where the source may be public:
`?utm_source=newsletter&utm_campaign=may` → source `newsletter/may`.
The old `/tiktok` and `/instagram` pages count as `tiktok` / `instagram`.

## How it works

1. `lib/attribution.ts` reads the code once per page load, in memory. It
   survives the language redirect (`/?s=k7` → `/es?s=k7`). It stays in the
   address bar: removing it with history.replaceState made Vercel count a
   second page view.
2. `components/source-tracking.tsx` sends two Vercel Web Analytics events:
   - `Visit` with `source` (the code), once per page load, tagged visits only;
   - `Store click` with `store` (`app_store` / `google_play`) and `source`
     (`(none)` when untagged).
3. Store links carry the code on to the stores:
   - **Google Play:** `&referrer=utm_source%3Dsketchsteps.app%26...%26utm_campaign%3D<code>`
     → Play Console acquisition reports.
   - **App Store:** `?pt=<provider token>&ct=<code>&mt=8` → App Store Connect →
     Analytics → Sources → Campaigns. Needs `APP_STORE_PROVIDER_TOKEN` in
     `lib/site.ts`; while it is empty, App Store links stay plain.

## Where to read the numbers

- **Visits and store clicks per code:** Vercel → sketch-steps-landing →
  Analytics → Events → `Visit` / `Store click`, by `source`.
- **Installs per code:** Play Console (Android); App Store Connect (iOS, once
  the provider token is set). Small numbers may be hidden by the stores'
  privacy thresholds.
- **Self-reported source** in the app's onboarding (`discovery_source`,
  PostHog) covers people who went straight to the store.
