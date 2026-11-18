"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import {
  type BrowserEnvironment,
  getBrowserEnvironment,
  tryOpenInNativeBrowser,
} from "@/lib/in-app-browser";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Store buttons with the in-app browser handling carried over unchanged from
 * the v1 landing page (Instagram/Facebook/TikTok webviews often block the App
 * Store, so the user is guided to their real browser).
 *
 * Every store link carries the attributes that GA4 store_click events are
 * built from (components/analytics.tsx, one delegated listener):
 *   data-cta="app_store" | "google_play"
 *   data-cta-location="header" | "hero" | "how_it_works" | "interactive_demo" | "final_cta" | "footer" | "sticky_bar"
 */

export type CtaLocation =
  | "hero"
  | "how_it_works"
  | "sticky_bar"
  | "final_cta"
  | "footer"
  | "header"
  | "interactive_demo";

/**
 * "header" is responsive: an icon-only square button on phones (so both
 * stores fit next to the logo) and the compact badge from the sm breakpoint.
 */
type BadgeSize = "default" | "medium" | "compact" | "header";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2";

export function useBrowserEnvironment() {
  const [environment, setEnvironment] = useState<BrowserEnvironment>({
    browser: null,
    isAndroid: false,
    isIOS: false,
  });

  useEffect(() => {
    const userAgent = navigator.userAgent || "";

    window.requestAnimationFrame(() => {
      setEnvironment(
        getBrowserEnvironment(
          userAgent,
          navigator.platform,
          navigator.maxTouchPoints,
        ),
      );
    });
  }, []);

  return environment;
}

function useBrowserLabel(browser: BrowserEnvironment["browser"]) {
  const t = useTranslations("Client.inApp");
  return browser === "instagram"
    ? "Instagram"
    : browser === "facebook"
      ? "Facebook"
      : browser === "tiktok"
        ? "TikTok"
        : t("thisApp");
}

const bold = (chunks: React.ReactNode) => (
  <span className="font-semibold text-foreground">{chunks}</span>
);

/**
 * App Store click handling for in-app browsers (Instagram, Facebook, TikTok):
 * tries to hand the link to the real browser and, if that does not happen,
 * shows the help dialog. Shared by every App Store link on the page.
 */
function useAppStoreLink() {
  const t = useTranslations("Client");
  const environment = useBrowserEnvironment();
  const { browser, isAndroid } = environment;
  const browserLabel = useBrowserLabel(browser);
  const [showInAppHelp, setShowInAppHelp] = useState(false);
  const [copied, setCopied] = useState(false);
  const attemptCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => attemptCleanupRef.current?.();
  }, []);

  function attemptNativeBrowserOpen() {
    attemptCleanupRef.current?.();
    setShowInAppHelp(false);

    let didLeavePage = false;
    let fallbackTimer = 0;

    const cleanup = () => {
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("pagehide", handlePageLeave);
      window.removeEventListener("blur", handlePageLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      attemptCleanupRef.current = null;
    };

    const handlePageLeave = () => {
      didLeavePage = true;
      cleanup();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handlePageLeave();
      }
    };

    window.addEventListener("pagehide", handlePageLeave, { once: true });
    window.addEventListener("blur", handlePageLeave, { once: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    fallbackTimer = window.setTimeout(() => {
      cleanup();
      if (!didLeavePage) {
        setShowInAppHelp(true);
      }
    }, 1500);
    attemptCleanupRef.current = cleanup;

    const attempted = tryOpenInNativeBrowser(environment, APP_STORE_URL);

    if (!attempted) {
      cleanup();
      setShowInAppHelp(true);
    }
  }

  function handleAppStoreClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!browser) {
      return;
    }

    event.preventDefault();

    if (isAndroid) {
      setShowInAppHelp(true);
      return;
    }

    attemptNativeBrowserOpen();
  }

  async function copyAppStoreLink() {
    try {
      await navigator.clipboard.writeText(APP_STORE_URL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = APP_STORE_URL;
    }
  }

  const dialog = showInAppHelp ? (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="open-browser-title"
    >
      <div className="w-full max-w-sm rounded-[28px] bg-white p-6 text-center shadow-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-crimson">
          {t("inApp.eyebrow")}
        </p>
        <h2
          id="open-browser-title"
          className="mt-3 font-display text-2xl font-bold text-ink"
        >
          {t("inApp.title", { browser: browserLabel })}
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          {t.rich("inApp.body", { b: bold })}
        </p>
        {isAndroid ? (
          <p className="mt-3 rounded-2xl bg-neutral-50 p-3 text-sm leading-6 text-muted">
            {t("inApp.android")}
          </p>
        ) : null}
        <div className="mt-5 grid gap-3">
          <button
            type="button"
            onClick={copyAppStoreLink}
            className={cn(
              "min-h-11 rounded-full bg-[#211d26] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#18141d]",
              focusRing,
            )}
          >
            {copied ? t("inApp.copied") : t("inApp.copy")}
          </button>
          <button
            type="button"
            onClick={attemptNativeBrowserOpen}
            className={cn(
              "min-h-11 rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-neutral-50",
              focusRing,
            )}
          >
            {t("inApp.openBrowser")}
          </button>
          <button
            type="button"
            onClick={() => setShowInAppHelp(false)}
            className={cn(
              "min-h-11 px-5 py-2 text-sm font-semibold text-muted transition hover:text-foreground",
              focusRing,
            )}
          >
            {t("inApp.close")}
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return { environment, onClick: handleAppStoreClick, dialog };
}

export function AppStoreBadge({
  className,
  size = "default",
  location,
}: {
  className?: string;
  size?: BadgeSize;
  location: CtaLocation;
}) {
  const t = useTranslations("Client");
  const isHeader = size === "header";
  const isCompact = size === "compact" || isHeader;
  const isMedium = size === "medium";
  const { onClick: handleAppStoreClick, dialog } = useAppStoreLink();

  return (
    <>
      <a
        href={APP_STORE_URL}
        aria-label={t("store.appStoreLabel")}
        onClick={handleAppStoreClick}
        data-cta="app_store"
        data-cta-location={location}
        className={cn(
          "inline-flex max-w-full shrink-0 items-center justify-center rounded-xl bg-[#211d26] text-white transition hover:-translate-y-0.5 hover:bg-[#18141d]",
          focusRing,
          isHeader
            ? "h-11 w-11 sm:h-10 sm:w-[140px]"
          : isCompact
            ? "h-10 w-[140px]"
            : isMedium
              ? "h-12 w-[172px] sm:h-14 sm:w-[196px]"
              : "h-14 w-[196px] sm:h-16 sm:w-[220px]",
          className,
        )}
      >
        <svg
          viewBox="0 0 384 512"
          width={isCompact ? 20 : isMedium ? 26 : 30}
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
          />
        </svg>
        <span
          className={cn(
            "text-left leading-none",
            isHeader ? "hidden sm:ml-2 sm:block" : isCompact ? "ml-2" : "ml-2.5 sm:ml-3",
          )}
        >
          <span
            className={cn(
              "block font-medium leading-none",
              isCompact
                ? "text-[9px]"
                : isMedium
                  ? "text-[10px] sm:text-[12px]"
                  : "text-[11px] sm:text-[13px]",
            )}
          >
            {t("store.appStoreTop")}
          </span>
          {" "}
          <span
            className={cn(
              "block font-sans font-semibold leading-none",
              isCompact
                ? "mt-0.5 text-[17px]"
                : isMedium
                  ? "mt-0.5 text-[21px] sm:mt-1 sm:text-[24px]"
                  : "mt-1 text-[24px] sm:text-[27px]",
            )}
          >
            {t("store.appStoreBottom")}
          </span>
        </span>
      </a>

      {dialog}
    </>
  );
}

export function GooglePlayBadge({
  className,
  size = "default",
  location,
}: {
  className?: string;
  size?: BadgeSize;
  location: CtaLocation;
}) {
  const t = useTranslations("Client.store");
  const isHeader = size === "header";
  const isCompact = size === "compact" || isHeader;
  const isMedium = size === "medium";

  return (
    <a
      href={GOOGLE_PLAY_URL}
      aria-label={t("googlePlayLabel")}
      data-cta="google_play"
      data-cta-location={location}
      className={cn(
        "inline-flex max-w-full shrink-0 items-center justify-center rounded-xl bg-[#211d26] text-white transition hover:-translate-y-0.5 hover:bg-[#18141d]",
        focusRing,
        isHeader
          ? "h-11 w-11 sm:h-10 sm:w-[140px]"
        : isCompact
          ? "h-10 w-[140px]"
          : isMedium
            ? "h-12 w-[172px] sm:h-14 sm:w-[196px]"
            : "h-14 w-[196px] sm:h-16 sm:w-[220px]",
        className,
      )}
    >
      <svg
        viewBox="0 0 512 512"
        width={isCompact ? 22 : isMedium ? 28 : 32}
        aria-hidden="true"
      >
        <path fill="#00D7FE" d="M86 62v388l226-194L86 62Z" />
        <path fill="#00F076" d="m86 62 268 151-42 43L86 62Z" />
        <path fill="#FFCE00" d="m354 213 64 36c10 6 10 20 0 26l-64 36-42-55 42-43Z" />
        <path fill="#F63448" d="M86 450 354 311l-42-55L86 450Z" />
      </svg>
      <span
        className={cn(
          "text-left leading-none",
          isHeader ? "hidden sm:ml-2 sm:block" : isCompact ? "ml-2" : "ml-2.5 sm:ml-3",
        )}
      >
        <span
          className={cn(
            "block font-medium uppercase leading-none",
            isCompact
              ? "text-[8px]"
              : isMedium
                ? "text-[9px] sm:text-[10px]"
                : "text-[10px] sm:text-[11px]",
          )}
        >
          {t("googlePlayTop")}
        </span>
        {" "}
        <span
          className={cn(
            "block font-sans font-semibold leading-none",
            isCompact
              ? "mt-0.5 text-[16px]"
              : isMedium
                ? "mt-0.5 text-[19px] sm:mt-1 sm:text-[22px]"
                : "mt-1 text-[22px] sm:text-[25px]",
          )}
        >
          {t("googlePlayBottom")}
        </span>
      </span>
    </a>
  );
}

/**
 * App Store first by default; Google Play first on Android devices. The
 * initial server render uses the default order, so there is no layout shift
 * beyond a swap of two equal-sized buttons.
 */
export function StoreBadges({
  size = "default",
  className,
  location,
  align = "center",
}: {
  size?: BadgeSize;
  className?: string;
  location: CtaLocation;
  align?: "center" | "start";
}) {
  const t = useTranslations("Client.store");
  const { isAndroid } = useBrowserEnvironment();

  return (
    <div
      role="group"
      aria-label={t("storesLabel")}
      className={cn(
        "flex flex-wrap items-center gap-3",
        align === "center" ? "justify-center" : "justify-center lg:justify-start",
        isAndroid && "flex-row-reverse",
        isAndroid && align === "start" && "lg:justify-end",
        className,
      )}
    >
      <AppStoreBadge size={size} location={location} />
      <GooglePlayBadge size={size} location={location} />
    </div>
  );
}

export function InAppBrowserNotice() {
  const t = useTranslations("Client.inApp");
  const { browser } = useBrowserEnvironment();
  const browserLabel = useBrowserLabel(browser);

  if (!browser) {
    return null;
  }

  return (
    <div className="sticky top-0 z-40 border-b border-[#f2d9dc] bg-[#fff4f5] px-4 py-3 text-center text-sm leading-6 text-foreground">
      {t.rich("notice", { browser: browserLabel, b: bold })}
    </div>
  );
}

/**
 * Single "Try Sketch Steps" button for the interactive demo. It points at the
 * App Store by default (and in the server HTML) and at Google Play once the
 * visitor is detected as Android. App Store clicks go through the same
 * in-app browser handling as the badges.
 */
export function TryAppButton({
  location,
  className,
}: {
  location: CtaLocation;
  className?: string;
}) {
  const t = useTranslations("Client.store");
  const { environment, onClick, dialog } = useAppStoreLink();
  const isAndroid = environment.isAndroid;

  return (
    <>
      <a
        href={isAndroid ? GOOGLE_PLAY_URL : APP_STORE_URL}
        onClick={isAndroid ? undefined : onClick}
        data-cta={isAndroid ? "google_play" : "app_store"}
        data-cta-location={location}
        className={cn(
          "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-crimson px-6 py-3 font-display text-base font-bold text-white shadow-[0_4px_0_#89242F] transition hover:-translate-y-0.5 hover:bg-crimson-deep active:translate-y-0 active:shadow-[0_2px_0_#89242F]",
          focusRing,
          className,
        )}
      >
        {t("tryApp")}
        <span className="sr-only">
          {" "}
          ({isAndroid ? t("onGooglePlay") : t("onAppStore")})
        </span>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M5 12h14m0 0-6-6m6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      {dialog}
    </>
  );
}
