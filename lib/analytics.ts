/**
 * Google Analytics 4 for sketchsteps.app. See docs/analytics.md.
 *
 * - Consent first: gtag.js is not requested, and nothing is stored or sent
 *   to Google, until the visitor accepts in the consent banner. Rejecting (or
 *   withdrawing later) disables GA and deletes its cookies.
 * - Production host only: the tag never loads on localhost, preview
 *   deployments or any host not listed in NEXT_PUBLIC_GA_HOSTS.
 * - Loaded once per page load; page views come from the GA4 config (first
 *   page) and GA4's own history tracking (client-side navigation), so the
 *   code never sends page_view itself and cannot double count.
 * - Events carry no personal data: only store, CTA location, language, path
 *   and demo step.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

/** Hostnames where GA may load. Defaults to the production domain. */
const GA_HOSTS = (process.env.NEXT_PUBLIC_GA_HOSTS ?? "sketchsteps.app,www.sketchsteps.app")
  .split(",")
  .map((host) => host.trim())
  .filter(Boolean);

/** localStorage key for the visitor's choice: "granted" | "denied". */
export const CONSENT_KEY = "sketchsteps.consent";

export type Consent = "granted" | "denied" | "unset";

type GtagArgs = [string, ...unknown[]];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

/** True when GA is configured and this page is on an allowed host. */
export function analyticsAvailable() {
  return Boolean(GA_MEASUREMENT_ID) && GA_HOSTS.includes(window.location.hostname);
}

// ---------------------------------------------------------------------------
// Consent store (read with useSyncExternalStore).

const CONSENT_EVENT = "sketchsteps:consent";
const SETTINGS_EVENT = "sketchsteps:consent-settings";
let settingsOpen = false;

export function readConsent(): Consent {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : "unset";
  } catch {
    return "unset";
  }
}

let memoryConsent: Consent | null = null;

/** Current choice; falls back to this page load's choice if storage is blocked. */
export function getConsent(): Consent {
  const stored = readConsent();
  return stored === "unset" && memoryConsent ? memoryConsent : stored;
}

export function setConsent(value: "granted" | "denied") {
  memoryConsent = value;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage blocked: the choice applies to this page load only.
  }
  settingsOpen = false;
  if (value === "granted") loadAnalytics();
  else disableAnalytics();
  window.dispatchEvent(new Event(CONSENT_EVENT));
  window.dispatchEvent(new Event(SETTINGS_EVENT));
}

export function subscribeConsent(callback: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_KEY) callback();
  };
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", onStorage);
  };
}

/** Reopens the consent banner ("Cookie settings" in the footer). */
export function openConsentSettings() {
  settingsOpen = true;
  window.dispatchEvent(new Event(SETTINGS_EVENT));
}

export function closeConsentSettings() {
  settingsOpen = false;
  window.dispatchEvent(new Event(SETTINGS_EVENT));
}

export function subscribeSettings(callback: () => void) {
  window.addEventListener(SETTINGS_EVENT, callback);
  return () => window.removeEventListener(SETTINGS_EVENT, callback);
}

export const getSettingsOpen = () => settingsOpen;

// ---------------------------------------------------------------------------
// Entry referrer, kept in memory only (no storage before consent).
//
// A visitor who arrives from another site (e.g. google.com) and accepts
// after moving to another page via client-side navigation would otherwise be
// reported with our own page as referrer. The original referrer is kept in a
// JavaScript variable for the lifetime of this page load and used only for
// the page_view sent on Accept. It is lost on a full page load, which is
// acceptable: nothing is written to the visitor's device before consent.
// Campaign parameters are not carried over: GA4 reads them from the address
// bar, and they stay in the URL through the language redirect and switcher.

let entryReferrer: string | undefined;

function isExternal(url: string) {
  try {
    return Boolean(url) && new URL(url).origin !== window.location.origin;
  } catch {
    return false;
  }
}

/** Remembers (in memory) this page load's external referrer, once. */
export function captureEntry() {
  if (entryReferrer !== undefined) return;
  entryReferrer = isExternal(document.referrer) ? document.referrer : "";
}

// ---------------------------------------------------------------------------
// Loading, disabling and events.

let loaded = false;

const disableFlag = () => `ga-disable-${GA_MEASUREMENT_ID}` as const;

function setDisabled(value: boolean) {
  (window as unknown as Record<string, boolean>)[disableFlag()] = value;
}

/** Loads gtag.js once. Only call after consent ("granted"). */
export function loadAnalytics() {
  if (!analyticsAvailable() || getConsent() !== "granted") return;
  setDisabled(false);
  if (loaded) {
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
    return;
  }
  loaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the arguments object itself.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };

  // Consent Mode v2: analytics accepted; no advertising use of any kind.
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());

  // Accepted after client-side navigation: report the original external
  // referrer instead of our own previous page. GA4 reads document.referrer
  // itself (it ignores page_referrer set in config), so it is restored on
  // this page only. No storage and no change to the address bar.
  captureEntry();
  const referrer = entryReferrer;
  if (referrer && !isExternal(document.referrer)) {
    try {
      Object.defineProperty(document, "referrer", { configurable: true, get: () => referrer });
    } catch {
      // Not redefinable here: GA reports a self-referral (direct).
    }
  }
  window.gtag("config", GA_MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(script);
}

/** Stops GA for this page and removes its cookies (consent rejected/withdrawn). */
function disableAnalytics() {
  if (!GA_MEASUREMENT_ID) return;
  setDisabled(true);
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

type EventParams = Record<string, string | number>;

/**
 * Sends a GA4 event when analytics is loaded and consented; otherwise does
 * nothing. Safe to call anywhere on the client.
 */
export function trackEvent(name: string, params: EventParams) {
  if (!loaded || !window.gtag || getConsent() !== "granted") return;
  window.gtag("event", name, params);
}

/** Language of the current page (the <html lang> attribute). */
export const pageLanguage = () => document.documentElement.lang || "en";
