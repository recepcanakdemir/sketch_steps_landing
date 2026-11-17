import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { screens } from "@/components/home/assets";
import { PhoneFrame, focusRing } from "@/components/home/primitives";
import { SocialProof } from "@/components/home/social-proof";
import { StoreBadges } from "@/components/home/store-buttons";
import { cn } from "@/lib/utils";

export const HERO_CTA_ID = "hero-cta";

export async function SiteHeader() {
  const t = await getTranslations("Home.nav");
  const linkClass = cn(
    "rounded-full px-3 py-2 text-sm font-semibold text-ink-soft transition hover:text-ink",
    focusRing,
  );

  return (
    <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
      <Link
        href="/"
        aria-label={t("home")}
        className={cn("flex min-w-0 items-center gap-2.5 rounded-2xl", focusRing)}
      >
        <Image
          src="/images/sketch-steps-app-icon-180.png"
          alt=""
          width={40}
          height={40}
          priority
          className="h-10 w-10 rounded-xl"
        />
        <Image
          src="/images/sketch-steps-wordmark.png"
          alt="Sketch Steps"
          width={120}
          height={40}
          priority
          sizes="108px"
          className="h-9 w-[108px] object-contain"
        />
      </Link>
      <nav aria-label={t("label")} className="hidden items-center gap-1 whitespace-nowrap lg:flex">
        <a className={linkClass} href="#how-it-works">
          {t("howItWorks")}
        </a>
        <a className={linkClass} href="#features">
          {t("features")}
        </a>
        <a className={linkClass} href="#faq">
          {t("faq")}
        </a>
      </nav>
      <StoreBadges size="header" location="header" className="shrink-0 flex-nowrap gap-2" />
    </header>
  );
}

export async function Hero() {
  const t = await getTranslations("Home.hero");
  const tags = t.raw("tags") as string[];

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden pb-16 pt-6 sm:pb-24 lg:pb-28 lg:pt-10"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8 lg:px-8">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          {/* Download milestone leads the hero, centred in the text column. */}
          <SocialProof className="mb-5 sm:mb-7" />
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-ink-soft sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-crimson" aria-hidden="true" />
            {t("eyebrow")}
          </p>
          <h1
            id="hero-title"
            className="mt-5 text-balance font-display text-[42px] font-extrabold leading-[1.02] tracking-[-0.02em] text-ink sm:text-6xl lg:text-[64px]"
          >
            {t.rich("title", {
              accent: (chunks) => (
                <span className="relative whitespace-nowrap text-crimson">
                  {chunks}
                  <svg
                    viewBox="0 0 300 16"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="absolute -bottom-2 left-0 h-3 w-full text-crimson/35"
                  >
                    <path
                      d="M3 11C60 4 140 2 297 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              ),
            })}
          </h1>

          <div id={HERO_CTA_ID} className="mt-8">
            <StoreBadges size="medium" location="hero" align="start" />
          </div>
          <a
            href="#how-it-works"
            className={cn(
              "mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-sm font-semibold text-ink underline decoration-crimson/40 underline-offset-4 transition hover:decoration-crimson",
              focusRing,
            )}
          >
            {t("secondaryCta")}
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M12 5v14m0 0-6-6m6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <ul
            aria-label={t("tagsLabel")}
            className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start"
          >
            {tags.map((tag, i) => (
              <li
                key={tag}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-semibold text-ink",
                  ["bg-peach", "bg-sage", "bg-blush"][i % 3],
                )}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto h-[470px] w-full max-w-[520px] sm:h-[600px] lg:h-[640px]">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[78%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-[48px] bg-peach/70"
          />
          <PhoneFrame
            src={screens.tutorialReadyPortrait}
            alt={t("backAlt")}
            sizes="(min-width: 1024px) 250px, (min-width: 640px) 230px, 180px"
            className="absolute left-[4%] top-[10%] w-[180px] -rotate-6 sm:left-[6%] sm:w-[230px] lg:w-[250px]"
          />
          <PhoneFrame
            src={screens.stepViewerPortrait2}
            alt={t("frontAlt")}
            priority
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 260px, 205px"
            className="absolute right-[4%] top-0 w-[205px] sm:right-[6%] sm:w-[260px] lg:w-[280px]"
          />
        </div>
      </div>
    </section>
  );
}
