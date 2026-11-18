import { APP_STORE_PROVIDER_TOKEN, APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/site";

/**
 * Which link sent a visitor, so store clicks and installs can be counted per
 * link. See docs/attribution.md.
 *
 * - Links carry a short opaque code: `?s=<code>`. The site never knows what
 *   a code stands for (this repository is public); the code-to-account table
 *   is kept privately by the owner. Standard `utm_source` / `utm_campaign`
 *   tags work too, for links where the source can be public.
 * - Read from the address bar once and kept in memory for this page load.
 *   Nothing is stored on the device, so no consent is needed. The code is
 *   left in the address bar: rewriting the URL makes Vercel count a second
 *   page view.
 * - The legacy /tiktok and /instagram pages count as "tiktok" / "instagram".
 * - Store links carry the source on to the stores: Google Play referrer, and
 *   App Store campaign token once APP_STORE_PROVIDER_TOKEN is set, so Play
 *   Console and App Store Connect report installs per link.
 */

export const SOURCE_PARAM = "s";

const LEGACY_PATHS: Record<string, string> = {
  "/tiktok": "tiktok",
  "/instagram": "instagram",
};

/** Lowercase, safe characters only, short (App Store ct allows 30 chars). */
function clean(value: string | null, max = 30) {
  return (value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "_")
    .slice(0, max);
}

let cached: string | null | undefined;

/**
 * This page load's source ("k7", "tiktok", "newsletter/may"...), or null
 * for untagged visits. Client only.
 */
export function getSource(): string | null {
  if (cached !== undefined) return cached;
  const params = new URLSearchParams(window.location.search);
  const code = clean(params.get(SOURCE_PARAM), 20);
  const utmSource = clean(params.get("utm_source"));
  const utmCampaign = clean(params.get("utm_campaign"));
  const utm = utmSource && utmCampaign ? `${utmSource}/${utmCampaign}` : utmSource;
  cached = (code || utm || LEGACY_PATHS[window.location.pathname] || "").slice(0, 30) || null;

  return cached;
}

export type StoreUrls = { appStore: string; googlePlay: string };

export const PLAIN_STORE_URLS: StoreUrls = {
  appStore: APP_STORE_URL,
  googlePlay: GOOGLE_PLAY_URL,
};

/** Store URLs carrying the visitor's source, or the plain URLs if untagged. */
export function attributedStoreUrls(source: string | null): StoreUrls {
  if (!source) return PLAIN_STORE_URLS;
  const token = source.replace(/\//g, "_");

  const appStore = APP_STORE_PROVIDER_TOKEN
    ? `${APP_STORE_URL}?${new URLSearchParams({
        pt: APP_STORE_PROVIDER_TOKEN,
        ct: token,
        mt: "8",
      })}`
    : APP_STORE_URL;

  const referrer = new URLSearchParams({
    utm_source: "sketchsteps.app",
    utm_medium: "referral",
    utm_campaign: token,
  }).toString();
  const googlePlay = `${GOOGLE_PLAY_URL}&${new URLSearchParams({ referrer })}`;

  return { appStore, googlePlay };
}

let cachedUrls: StoreUrls | undefined;

/** Stable snapshot of this page load's store URLs (for useSyncExternalStore). */
export function getStoreUrls(): StoreUrls {
  cachedUrls ??= attributedStoreUrls(getSource());
  return cachedUrls;
}
