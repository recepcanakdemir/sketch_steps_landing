"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

import { attributionLabel, getAttribution } from "@/lib/attribution";

/**
 * Per-account traffic in Vercel Web Analytics (cookieless, no consent
 * banner). See docs/attribution.md.
 *
 * - "Visit": once per page load for tagged visits (bio links), with the
 *   source, e.g. "instagram/andrew_drawing1". Untagged visits are not sent;
 *   Vercel's own page views already count them.
 * - "Store click": every App Store / Google Play click, with the store and
 *   the source ("(none)" when untagged).
 *
 * Two properties per event: the limit of the Vercel Pro plan.
 */
let visitSent = false;

export function SourceTracking() {
  useEffect(() => {
    const attribution = getAttribution();
    const source = attributionLabel(attribution);
    // <Analytics /> sets up window.va (its event queue) a moment after the
    // first render; an event tracked before that is dropped. Wait for it,
    // for at most ~5 s.
    let timer = 0;
    const sendVisit = (triesLeft: number) => {
      if (visitSent) return;
      if ((window as { va?: unknown }).va) {
        visitSent = true;
        track("Visit", { source });
      } else if (triesLeft > 0) {
        timer = window.setTimeout(() => sendVisit(triesLeft - 1), 100);
      }
    };
    if (attribution) sendVisit(50);

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[data-cta]");
      if (!(link instanceof HTMLAnchorElement)) return;
      track("Store click", { store: link.dataset.cta ?? "", source });
    };
    document.addEventListener("click", onClick, true);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
