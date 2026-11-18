# Social account attribution

Which social account sends visitors, store clicks and installs. No cookies
and nothing stored on the device, so no consent banner is needed.

## How it works

1. Each account's bio link carries UTM tags (table below).
2. `lib/attribution.ts` reads them from the address bar, in memory for that
   page load. They survive the language redirect (`/` → `/es?utm_...`).
   The old `/tiktok` and `/instagram` pages count as `tiktok` / `instagram`
   when the link has no tags.
3. `components/source-tracking.tsx` sends two Vercel Web Analytics events:
   - `Visit` with `source` (e.g. `instagram/andrew_drawing1`), once per page
     load, only for tagged visits;
   - `Store click` with `store` (`app_store` / `google_play`) and `source`
     (`(none)` when untagged).
4. Store links carry the source on to the stores:
   - **Google Play:** `&referrer=utm_source%3D...` → Play Console, acquisition
     reports (third-party referrers / UTM campaigns).
   - **App Store:** `?pt=<provider token>&ct=<source>_<campaign>&mt=8` →
     App Store Connect → Analytics → Sources → Campaigns. Needs
     `APP_STORE_PROVIDER_TOKEN` in `lib/site.ts`; while it is empty, App Store
     links stay plain (only the Vercel events cover iOS).

## Where to read the numbers

- **Visits and store clicks per account:** Vercel → sketch-steps-landing →
  Analytics → Events → `Visit` / `Store click`, broken down by `source`.
- **Installs per account:** Play Console (Android) and App Store Connect
  (iOS, once the provider token is set). Installs show up there a day or two
  later; small campaigns may be hidden below the stores' privacy thresholds.
- **Self-reported source** in the app's onboarding (`discovery_source`,
  PostHog) covers people who went straight to the store.

## Bio links

`utm_source` = platform, `utm_medium` = `social`, `utm_campaign` = account.
Add a new account the same way; keep names lowercase, letters, digits, `.`,
`_`, `-`.

| Platform | Account | Bio link |
|---|---|---|
| Instagram | seoyeonpark74 | https://sketchsteps.app/?utm_source=instagram&utm_medium=social&utm_campaign=seoyeonpark74 |
| Instagram | andrew_drawing1 | https://sketchsteps.app/?utm_source=instagram&utm_medium=social&utm_campaign=andrew_drawing1 |
| Instagram | alexsketchdaily | https://sketchsteps.app/?utm_source=instagram&utm_medium=social&utm_campaign=alexsketchdaily |
| Instagram | paul_drawing1 | https://sketchsteps.app/?utm_source=instagram&utm_medium=social&utm_campaign=paul_drawing1 |
| TikTok | andrew.drawing5 | https://sketchsteps.app/?utm_source=tiktok&utm_medium=social&utm_campaign=andrew.drawing5 |
| Facebook | Alex's Sketch Diary | https://sketchsteps.app/?utm_source=facebook&utm_medium=social&utm_campaign=alexsketchdiary |
| Pinterest | loomisdraw | https://sketchsteps.app/?utm_source=pinterest&utm_medium=social&utm_campaign=loomisdraw |

For a single post or story (not the bio), keep the account and add
`&utm_content=<post>`; it is not reported per post today, but the tag costs
nothing.
