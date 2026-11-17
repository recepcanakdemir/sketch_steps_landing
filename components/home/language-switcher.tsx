"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

import { focusRing } from "@/components/home/primitives";
import {
  LIVE_LOCALES,
  getLocaleDefinition,
  localizePath,
  type Locale,
} from "@/i18n/config";
import { cn } from "@/lib/utils";

/**
 * Language switcher: a menu button listing every live locale's homepage.
 * It only links to the existing localized URLs (no redirects, no detection,
 * no new routes), so canonicals, hreflang and the sitemap are unaffected.
 * The current query string (utm_*, gclid, fbclid, ttclid...) is carried over
 * once the page has hydrated; the server-rendered links are the plain URLs.
 *
 * "header": globe + language code + chevron, menu opens downward. Below the
 * sm breakpoint it is a 44x44 globe-only button (code and chevron hidden;
 * the accessible name still says "Language: <current language>").
 * "footer": globe + native name, menu opens upward (secondary option on
 * phones, and the only one on screens too narrow for the header globe).
 */
export function LanguageSwitcher({
  locale,
  label,
  placement,
  className,
}: {
  locale: Locale;
  /** Translated word for "Language", used in the accessible name. */
  label: string;
  placement: "header" | "footer";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const search = useSyncExternalStore(subscribeToNothing, getSearch, getServerSearch);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const focusOnOpen = useRef<number | null>(null);
  const menuId = useId();
  const current = getLocaleDefinition(locale);

  // Close on a click or tap outside.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Move focus into the menu after it has been shown by the keyboard.
  useEffect(() => {
    if (open && focusOnOpen.current !== null) {
      itemRefs.current[focusOnOpen.current]?.focus();
      focusOnOpen.current = null;
    }
  }, [open]);

  const activeIndex = Math.max(0, LIVE_LOCALES.indexOf(locale));
  const last = LIVE_LOCALES.length - 1;

  function openWithFocus(index: number) {
    focusOnOpen.current = index;
    setOpen(true);
  }

  function close(returnFocus: boolean) {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }

  function onButtonKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      close(true);
    } else if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openWithFocus(activeIndex);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      openWithFocus(last);
    }
  }

  function onMenuKeyDown(event: React.KeyboardEvent) {
    const index = itemRefs.current.findIndex((item) => item === document.activeElement);
    const focusItem = (next: number) => itemRefs.current[next]?.focus();
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusItem(index >= last ? 0 : index + 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusItem(index <= 0 ? last : index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusItem(0);
        break;
      case "End":
        event.preventDefault();
        focusItem(last);
        break;
      case "Escape":
        event.preventDefault();
        close(true);
        break;
      case "Tab":
        close(false);
        break;
    }
  }

  const isFooter = placement === "footer";

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        // Names the current language, e.g. "Sprache: Deutsch", also when
        // only the globe is visible.
        aria-label={`${label}: ${current.nativeName}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onButtonKeyDown}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-line bg-white/80 text-sm font-bold text-ink-soft transition-colors hover:border-sand hover:bg-white hover:text-ink",
          isFooter
            ? "h-10 px-3"
            : // Phones: 44x44 globe-only. From sm: the original pill.
              "h-11 w-11 justify-center sm:h-10 sm:w-auto sm:px-3",
          open && "border-sand bg-white text-ink",
          focusRing,
        )}
      >
        <GlobeIcon className={isFooter ? undefined : "h-5 w-5 sm:h-4 sm:w-4"} />
        {isFooter ? (
          <span lang={current.code}>{current.nativeName}</span>
        ) : (
          <span aria-hidden="true" className="hidden tracking-[0.04em] sm:inline">
            {current.code.toUpperCase()}
          </span>
        )}
        <ChevronIcon
          className={cn(!isFooter && "hidden sm:block", open && "rotate-180")}
        />
      </button>

      <ul
        id={menuId}
        role="menu"
        aria-label={label}
        hidden={!open}
        onKeyDown={onMenuKeyDown}
        className={cn(
          "absolute z-50 w-44 rounded-2xl border border-line bg-white p-1.5 text-left shadow-card",
          isFooter ? "bottom-full left-1/2 mb-2 -translate-x-1/2" : "right-0 top-full mt-2",
        )}
      >
        {LIVE_LOCALES.map((code, index) => {
          const definition = getLocaleDefinition(code);
          const active = code === locale;
          return (
            <li key={code} role="none">
              <a
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                role="menuitem"
                tabIndex={-1}
                href={`${localizePath(code, "/")}${search}`}
                hrefLang={code}
                lang={code}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 text-sm font-semibold outline-none transition-colors hover:bg-cream focus-visible:bg-cream",
                  active ? "text-crimson" : "text-ink",
                )}
              >
                <span>{definition.nativeName}</span>
                {active ? <CheckIcon /> : null}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// The query string never changes without a full page load on these static
// pages, so there is nothing to subscribe to. The server render has none.
const subscribeToNothing = () => () => {};
const getSearch = () => window.location.search;
const getServerSearch = () => "";

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18Z" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={14}
      height={14}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="m5 12 5 5 9-10" />
    </svg>
  );
}
