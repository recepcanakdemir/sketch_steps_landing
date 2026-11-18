"use client";

import { useTranslations } from "next-intl";
import { useEffect, useSyncExternalStore } from "react";

import {
  type Consent,
  analyticsAvailable,
  captureEntry,
  closeConsentSettings,
  getConsent,
  getSettingsOpen,
  loadAnalytics,
  openConsentSettings,
  pageLanguage,
  setConsent,
  subscribeConsent,
  subscribeSettings,
  trackEvent,
} from "@/lib/analytics";
import { PRIVACY_POLICY_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2";

const noop = () => () => {};
const serverConsent = (): Consent | "server" => "server";
const serverFalse = () => false;

/**
 * Mounted once in the root document of every locale. It loads GA4 only for
 * visitors who accepted, shows the consent banner when no choice has been
 * made yet (or when "Cookie settings" is opened), and turns clicks on store
 * links (a[data-cta]) into one store_click event each.
 */
export function SiteAnalytics() {
  const available = useSyncExternalStore(noop, analyticsAvailable, serverFalse);
  const consent = useSyncExternalStore(subscribeConsent, getConsent, serverConsent);
  const settingsOpen = useSyncExternalStore(subscribeSettings, getSettingsOpen, serverFalse);

  useEffect(() => {
    // Remember the external referrer in memory for a later Accept on another
    // page (lib/analytics). Nothing is stored on the device.
    captureEntry();
  }, []);

  useEffect(() => {
    if (available && consent === "granted") loadAnalytics();
  }, [available, consent]);

  useEffect(() => {
    if (!available) return;
    // One delegated listener for every store link on the page: one click,
    // one event. It never prevents or delays the navigation.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[data-cta]");
      if (!(link instanceof HTMLAnchorElement)) return;
      trackEvent("store_click", {
        store: link.dataset.cta ?? "",
        cta_location: link.dataset.ctaLocation ?? "",
        page_language: pageLanguage(),
        page_path: window.location.pathname,
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [available]);

  if (!available || consent === "server") return null;
  if (consent !== "unset" && !settingsOpen) return null;
  return <ConsentBanner current={consent} />;
}

function ConsentBanner({ current }: { current: Consent }) {
  const t = useTranslations("Client.consent");
  const button = cn(
    "min-h-11 flex-1 rounded-full px-5 text-sm font-bold transition sm:flex-none",
    focusRing,
  );

  return (
    <section
      role="region"
      aria-label={t("label")}
      className="fixed inset-x-2 bottom-2 z-50 mx-auto max-w-xl rounded-2xl border border-line bg-white px-3.5 pb-3 pt-3 text-left shadow-[0_12px_40px_rgba(39,21,10,0.18)] sm:inset-x-4 sm:bottom-4 sm:p-5"
    >
      <p className="text-[13px] leading-5 text-ink sm:text-sm sm:leading-6">
        {t("text")}{" "}
        <a
          href={PRIVACY_POLICY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("font-semibold text-crimson underline underline-offset-2", focusRing)}
        >
          {t("privacy")}
        </a>
      </p>
      <div className="mt-2.5 flex flex-wrap items-center justify-end gap-2 sm:mt-3">
        {current !== "unset" ? (
          <button type="button" onClick={closeConsentSettings} className={cn(button, "flex-none px-3 text-ink-soft hover:text-ink")}>
            {t("close")}
          </button>
        ) : null}
        {/* Equal choices: same size and style, reject first. */}
        <button
          type="button"
          onClick={() => setConsent("denied")}
          aria-pressed={current === "denied" ? true : undefined}
          className={cn(button, "border border-ink bg-white text-ink hover:bg-cream")}
        >
          {t("reject")}
        </button>
        <button
          type="button"
          onClick={() => setConsent("granted")}
          aria-pressed={current === "granted" ? true : undefined}
          className={cn(button, "border border-ink bg-white text-ink hover:bg-cream")}
        >
          {t("accept")}
        </button>
      </div>
    </section>
  );
}

/**
 * "Cookie settings" button that reopens the consent banner (to change or
 * withdraw consent). Renders nothing where GA is off (localhost, previews).
 * With `wrapperClassName`, it is rendered inside a <p>, after `lead`.
 */
export function ConsentSettingsButton({
  className,
  lead,
  wrapperClassName,
}: {
  className?: string;
  lead?: string;
  wrapperClassName?: string;
}) {
  const t = useTranslations("Client.consent");
  const available = useSyncExternalStore(noop, analyticsAvailable, serverFalse);
  if (!available) return null;
  const button = (
    <button
      type="button"
      data-consent-settings=""
      onClick={openConsentSettings}
      className={cn("rounded-sm transition hover:text-ink", focusRing, className)}
    >
      {t("settings")}
    </button>
  );
  if (wrapperClassName === undefined) return button;
  return (
    <p className={wrapperClassName}>
      {lead}
      {button}
    </p>
  );
}
