import { APP_STORE_PROVIDER_TOKEN, APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/site";

/**
 * Which social account sent a visitor, so store clicks and installs can be
 * counted per account. See docs/attribution.md.
 *
 * - Read from the address bar only (utm_source / utm_medium / utm_campaign on
 *   the bio links), kept in memory for this page load. Nothing is stored on
 *   the device, so no consent is needed.
 * - The legacy /tiktok and /instagram pages count as tiktok / instagram when
 *   the link has no UTM tags.
 * - Store links carry the source on to the stores: App Store campaign token
 *   (ct, needs APP_STORE_PROVIDER_TOKEN) and Google Play referrer, so App
 *   Store Connect and Play Console report installs per account.
 */

export type Attribution = {
  source: string;
  medium: string;
  campaign: string;
};

const LEGACY_PATHS: Record<string, string> = {
  "/tiktok": "tiktok",
  "/instagram": "instagram",
};

/** Lowercase, safe characters only, short (App Store ct allows 40 chars). */
function clean(value: string | null, max = 40) {
  return (value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "_")
    .slice(0, max);
}

let cached: Attribution | null | undefined;

/** This page load's attribution, or null for untagged visits. Client only. */
export function getAttribution(): Attribution | null {
  if (cached !== undefined) return cached;
  const params = new URLSearchParams(window.location.search);
  const source = clean(params.get("utm_source")) || LEGACY_PATHS[window.location.pathname] || "";
  cached = source
    ? {
        source,
        medium: clean(params.get("utm_medium")) || "social",
        campaign: clean(params.get("utm_campaign")),
      }
    : null;
  return cached;
}

/** "instagram/andrew_drawing1", or "instagram" without a campaign. */
export function attributionLabel(attribution: Attribution | null) {
  if (!attribution) return "(none)";
  return attribution.campaign
    ? `${attribution.source}/${attribution.campaign}`
    : attribution.source;
}

/** App Store campaign token: "ig_andrew_drawing1"-style, max 40 chars. */
function campaignToken({ source, campaign }: Attribution) {
  return (campaign ? `${source}_${campaign}` : source).slice(0, 40);
}

export type StoreUrls = { appStore: string; googlePlay: string };

export const PLAIN_STORE_URLS: StoreUrls = {
  appStore: APP_STORE_URL,
  googlePlay: GOOGLE_PLAY_URL,
};

/** Store URLs carrying the visitor's source, or the plain URLs if untagged. */
export function attributedStoreUrls(attribution: Attribution | null): StoreUrls {
  if (!attribution) return PLAIN_STORE_URLS;

  const appStore = APP_STORE_PROVIDER_TOKEN
    ? `${APP_STORE_URL}?${new URLSearchParams({
        pt: APP_STORE_PROVIDER_TOKEN,
        ct: campaignToken(attribution),
        mt: "8",
      })}`
    : APP_STORE_URL;

  const referrer = new URLSearchParams({
    utm_source: attribution.source,
    utm_medium: attribution.medium,
    ...(attribution.campaign ? { utm_campaign: attribution.campaign } : {}),
  }).toString();
  const googlePlay = `${GOOGLE_PLAY_URL}&${new URLSearchParams({ referrer })}`;

  return { appStore, googlePlay };
}

let cachedUrls: StoreUrls | undefined;

/** Stable snapshot of this page load's store URLs (for useSyncExternalStore). */
export function getStoreUrls(): StoreUrls {
  cachedUrls ??= attributedStoreUrls(getAttribution());
  return cachedUrls;
}
