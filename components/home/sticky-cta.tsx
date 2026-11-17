"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import {
  AppStoreBadge,
  GooglePlayBadge,
  useBrowserEnvironment,
} from "@/components/home/store-buttons";
import { cn } from "@/lib/utils";

/**
 * Mobile-only download bar. It appears once the hero download buttons have
 * scrolled out of view and hides again when the final download section comes
 * into view (and below it), so it never covers the footer or doubles up with
 * another CTA. Not a popup: it never blocks content and has no timer.
 */
export function StickyCta({
  heroAnchorId,
  finalAnchorId,
}: {
  heroAnchorId: string;
  finalAnchorId: string;
}) {
  const t = useTranslations("Client.sticky");
  const { isAndroid } = useBrowserEnvironment();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(heroAnchorId);
    const final = document.getElementById(finalAnchorId);
    if (!hero || !final) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const heroPassed = hero.getBoundingClientRect().bottom < 0;
      const finalReached =
        final.getBoundingClientRect().top < window.innerHeight;
      setVisible(heroPassed && !finalReached);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [heroAnchorId, finalAnchorId]);

  return (
    <aside
      aria-label={t("label")}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_rgba(39,21,10,0.08)] backdrop-blur transition duration-300 md:hidden",
        visible ? "visible translate-y-0" : "invisible translate-y-full",
      )}
    >
      <div className="mx-auto flex max-w-md items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Image
            src="/images/sketch-steps-app-icon-180.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-xl"
          />
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-bold text-ink">
              {t("title")}
            </p>
            <p className="truncate text-xs text-ink-soft">{t("subtitle")}</p>
          </div>
        </div>
        {isAndroid ? (
          <GooglePlayBadge size="compact" location="sticky" />
        ) : (
          <AppStoreBadge size="compact" location="sticky" />
        )}
      </div>
    </aside>
  );
}
