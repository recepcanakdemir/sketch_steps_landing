import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

import { demo, screens } from "@/components/home/assets";
import { ConsentSettingsButton } from "@/components/analytics";
import { LanguageSwitcher } from "@/components/home/language-switcher";
import { PhoneFrame, SectionHeading, focusRing } from "@/components/home/primitives";
import { StoreBadges } from "@/components/home/store-buttons";
import { DEFAULT_LOCALE, localizePath, type Locale } from "@/i18n/config";
import { BLOG_PATH, hasBlogEntries } from "@/lib/blog";
import { PRIVACY_POLICY_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

export const FINAL_CTA_ID = "download";

const TERMS_OF_USE_URL =
  "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";

const GALLERY_SCREENS = [
  screens.stepViewerPortrait2,
  screens.stepViewerPortrait,
  screens.traceAiReady,
  screens.tracingStudioAnime,
  screens.home,
  screens.tutorialReadyDog,
];

type GalleryItem = { caption: string; alt: string };
type FaqItem = { question: string; answer: string };

export async function ScreenGallery() {
  const t = await getTranslations("Home.gallery");
  const items = t.raw("items") as GalleryItem[];

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="overflow-hidden bg-cream py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading id="gallery-title" eyebrow={t("eyebrow")} title={t("title")} />
        <p className="mt-3 text-center text-sm text-ink-soft lg:hidden">
          {t("scrollHint")}
        </p>
        <ul className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-5 lg:overflow-visible lg:px-0">
          {items.map((item, i) => (
            <li key={item.caption} className="w-[58%] max-w-[240px] shrink-0 snap-center lg:w-auto lg:max-w-none">
              <figure>
                <PhoneFrame
                  src={GALLERY_SCREENS[i]}
                  alt={item.alt}
                  sizes="(min-width: 1024px) 190px, 58vw"
                />
                <figcaption className="mt-3 text-center text-sm font-semibold text-ink">
                  {item.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Native <details> disclosure: every answer is in the server-rendered HTML,
 * works without JavaScript, and is keyboard accessible by default.
 */
export async function Faq() {
  const t = await getTranslations("Home.faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-4 bg-white py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:px-8">
        <SectionHeading id="faq-title" eyebrow={t("eyebrow")} title={t("title")} align="left" className="text-center lg:text-left" />
        <div className="divide-y divide-line border-y border-line">
          {items.map((item) => (
            <details key={item.question} className="faq-item group">
              <summary
                className={cn(
                  "flex min-h-14 cursor-pointer items-center justify-between gap-4 rounded-lg py-5 text-left font-display text-lg font-bold text-ink transition hover:text-crimson",
                  focusRing,
                )}
              >
                <h3>{item.question}</h3>
                <span
                  aria-hidden="true"
                  className="faq-icon grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cream text-crimson transition-transform duration-200"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="pb-6 pr-12 text-[15px] leading-7 text-ink-soft">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function FinalCta() {
  const t = await getTranslations("Home.finalCta");
  const strip = [demo.steps[0], demo.steps[4], demo.steps[8]];

  return (
    <section
      id={FINAL_CTA_ID}
      aria-labelledby="final-cta-title"
      className="scroll-mt-4 bg-white px-5 pb-20 sm:px-6 sm:pb-28 lg:px-8"
    >
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-crimson px-6 py-14 text-center sm:px-12 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(255,255,255,0.16),transparent_40%),radial-gradient(circle_at_85%_90%,rgba(0,0,0,0.12),transparent_45%)]"
        />
        <div className="relative">
          <ul aria-hidden="true" className="mx-auto mb-8 flex max-w-[300px] justify-center gap-3 sm:max-w-[360px]">
            {strip.map((src, i) => (
              <li
                key={src}
                className={cn(
                  "w-1/3 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-lg",
                  i === 0 && "-rotate-6",
                  i === 2 && "rotate-6",
                )}
              >
                <Image
                  src={src}
                  alt=""
                  width={demo.stepSize.width}
                  height={demo.stepSize.height}
                  unoptimized
                  className="aspect-[3/4] h-auto w-full object-cover"
                />
              </li>
            ))}
          </ul>
          <h2
            id="final-cta-title"
            className="text-balance font-display text-[34px] font-extrabold leading-[1.05] text-white sm:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-7 text-white/85 sm:text-lg">
            {t("lead")}
          </p>
          <StoreBadges size="default" location="final_cta" className="mt-8" />
          {/* Verified app facts. Rendered only in languages that have the line. */}
          {t.has("facts") ? (
            <p className="mx-auto mt-5 max-w-xl text-pretty text-sm leading-6 text-white/85">
              {t("facts")}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/**
 * Site footer. Blog pages pass `languageHrefs` so the language menu leads to
 * the matching blog page. A "Blog" link appears once the current language
 * has published articles.
 */
export async function SiteFooter({
  languageHrefs,
}: { languageHrefs?: Partial<Record<Locale, string>> } = {}) {
  const t = await getTranslations("Home.footer");
  const tNav = await getTranslations("Home.nav");
  const tBlog = await getTranslations("Blog");
  const locale = (await getLocale()) as Locale;
  // Support and policy pages exist in English only: mark those links as
  // English on translated homepages (no attribute on the English site).
  const englishOnly = locale === DEFAULT_LOCALE ? {} : { hrefLang: DEFAULT_LOCALE };
  const linkClass = cn(
    "rounded-sm transition hover:text-ink",
    focusRing,
  );

  return (
    <footer className="border-t border-line bg-cream py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 text-center sm:px-6 lg:px-8 xl:flex-row xl:justify-between xl:text-left">
        <div className="flex flex-col items-center gap-5 xl:shrink-0 xl:items-start">
          <Link href={localizePath(locale, "/")} className={cn("flex items-center gap-2.5 rounded-2xl", focusRing)} aria-label={tNav("home")}>
            <Image src="/images/sketch-steps-app-icon-180.png" alt="" width={40} height={40} className="h-10 w-10 rounded-xl" />
            <Image src="/images/sketch-steps-wordmark.png" alt="Sketch Steps" width={120} height={40} sizes="108px" className="h-9 w-[108px] object-contain" />
          </Link>
          <StoreBadges size="compact" location="footer" />
          {/* Phones only: from sm up the switcher is in the header. */}
          <LanguageSwitcher
            locale={locale}
            label={tNav("language")}
            placement="footer"
            hrefs={languageHrefs}
            className="sm:hidden"
          />
        </div>
        <nav aria-label={t("label")} className="flex max-w-2xl flex-wrap justify-center gap-x-5 gap-y-3 text-sm font-medium text-ink-soft">
          {hasBlogEntries(locale) ? (
            <Link className={linkClass} href={localizePath(locale, BLOG_PATH)}>
              {tBlog("nav")}
            </Link>
          ) : null}
          <a className={linkClass} href={PRIVACY_POLICY_URL} target="_blank" rel="noopener noreferrer">
            {t("privacyPolicy")}
          </a>
          <Link className={linkClass} href="/android-privacy-policy" {...englishOnly}>
            {t("androidPrivacy")}
          </Link>
          <Link className={linkClass} href="/ios-privacy-policy" {...englishOnly}>
            {t("iosPrivacy")}
          </Link>
          <a className={linkClass} href={TERMS_OF_USE_URL} target="_blank" rel="noopener noreferrer">
            {t("terms")}
          </a>
          <Link className={linkClass} href="/account-deletion" {...englishOnly}>
            {t("deleteAccount")}
          </Link>
          <Link className={linkClass} href="/support" {...englishOnly}>
            {t("support")}
          </Link>
          <ConsentSettingsButton className="font-medium" />
        </nav>
        <p className="text-sm text-ink-soft xl:text-right">
          {t("copyright", { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
