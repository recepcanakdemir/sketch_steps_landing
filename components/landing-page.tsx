"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  type BrowserEnvironment,
  getBrowserEnvironment,
  tryOpenInNativeBrowser,
} from "@/lib/in-app-browser";
import { cn } from "@/lib/utils";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/sketch-flow-ai-ar-drawing/id6763632360";
const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.sketchsteps.app";
const PRIVACY_POLICY_URL =
  "https://learned-trollius-e3f.notion.site/Sketch-Steps-Privacy-Policy-35072e55921f80848251fb0847ee0dee";
const TERMS_OF_USE_URL =
  "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";
const SUPPORT_EMAIL = "support@sketchsteps.app";

function useInAppBrowser() {
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

const tutorialPhoto = {
  src: "/images/tutorialexample/Modern Evde Doğal Işıklı Selfie.png",
  alt: "Original portrait uploaded to Sketch Steps",
};

const tutorialSteps = Array.from({ length: 9 }, (_, index) => {
  const imageNumber = 62 + index;

  return {
    label: `Step ${index + 1}`,
    src: `/images/tutorialexample/IMG_00${imageNumber}.JPG`,
    alt: `Sketch Steps Loomis drawing guide step ${index + 1}`,
  };
});

const drawingEffectsOriginal = {
  src: "/images/drawing_effects/original_photo.jpeg",
  alt: "Original photo before drawing effects",
};

const drawingEffects = [
  "Anime_cartoon.JPG",
  "Architectural_line.JPG",
  "Bold_charcoal.JPG",
  "Clean_pencil.JPG",
  "Soft_sketch.JPG",
  "Watercolor.JPG",
].map((filename) => {
  const label = filename
    .replace(/\.[^.]+$/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  return {
    label,
    src: `/images/drawing_effects/${filename}`,
    alt: `${label} drawing effect preview`,
  };
});

const gallery = [
  {
    src: "/images/gallery-home.jpeg",
    alt: "Sketch Steps home screen with AI Loomis Studio and Tracing Studio",
  },
  {
    src: "/images/gallery-tutorial-ready.jpeg",
    alt: "Tutorial Ready screen with generated drawing steps",
  },
  {
    src: "/images/gallery-templates.jpeg",
    alt: "Drawing template library screen",
  },
  {
    src: "/images/gallery-step-1.jpeg",
    alt: "Step 1 Loomis drawing guide with circle construction",
  },
  {
    src: "/images/gallery-step-2.jpeg",
    alt: "Step 2 Loomis drawing guide with early head construction",
  },
  {
    src: "/images/gallery-step-4.jpeg",
    alt: "Step 4 Loomis drawing guide with facial features and hair",
  },
];

const faqItems = [
  {
    question: "What is the Loomis Method?",
    answer:
      "The Loomis Method is a portrait drawing framework that starts with a simplified head shape, then adds center lines, facial landmarks, and proportions so the face can be drawn with structure instead of guesswork.",
  },
  {
    question: "Is Sketch Steps suitable for beginners?",
    answer:
      "Yes. Sketch Steps is designed for beginners and aspiring artists who want clear, repeatable drawing steps without having to search through random tutorials.",
  },
  {
    question: "Can I use my own photos?",
    answer:
      "Yes. You can generate guides from face photos in your gallery or from a new camera capture, making every practice session personal.",
  },
  {
    question: "Does the app support tracing?",
    answer:
      "Yes. The tracing studio lets you practice directly over guided references while you learn the construction behind each portrait.",
  },
  {
    question: "Is the app free?",
    answer:
      "Sketch Steps can be downloaded from the App Store or Google Play. Pricing and premium options are shown in the app before any purchase.",
  },
  {
    question: "Is there an Android version?",
    answer: "Yes. Sketch Steps is available now on Google Play.",
  },
];

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("mx-auto max-w-3xl text-center", className)}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-4xl font-semibold leading-[1.03] tracking-normal text-foreground sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-8 text-muted">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

function Logo() {
  return (
    <a
      href="#"
      className="flex min-w-0 items-center gap-3"
      aria-label="Sketch Steps"
    >
      <Image
        src="/images/sketch-steps-app-icon.png"
        alt=""
        width={40}
        height={40}
        className="block h-10 w-10 rounded-2xl object-cover"
        priority
        sizes="40px"
      />
      <Image
        src="/images/sketch-steps-wordmark.png"
        alt="Sketch Steps"
        width={120}
        height={40}
        className="block h-8 w-[96px] object-contain sm:h-9 sm:w-[108px]"
        priority
        sizes="(min-width: 640px) 108px, 96px"
      />
    </a>
  );
}

function AppStoreBadge({
  className,
  size = "default",
}: {
  className?: string;
  size?: "default" | "medium" | "compact";
}) {
  const isCompact = size === "compact";
  const isMedium = size === "medium";
  const environment = useInAppBrowser();
  const { browser, isAndroid } = environment;
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

  const browserLabel =
    browser === "instagram"
      ? "Instagram"
      : browser === "facebook"
        ? "Facebook"
        : browser === "tiktok"
          ? "TikTok"
          : "this app";

  return (
    <>
      <a
        href={APP_STORE_URL}
        aria-label="Download Sketch Steps on the App Store"
        onClick={handleAppStoreClick}
        className={cn(
          "inline-flex max-w-full items-center justify-center rounded-lg bg-[#211d26] text-white transition hover:-translate-y-0.5 hover:bg-[#18141d]",
          isCompact
            ? "h-10 w-[150px]"
            : isMedium
              ? "h-12 w-[180px] sm:h-14 sm:w-[205px]"
              : "h-16 w-[220px] sm:h-20 sm:w-[270px]",
          className,
        )}
      >
        <svg
          viewBox="0 0 384 512"
          width={isCompact ? 21 : isMedium ? 28 : 45}
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
          />
        </svg>
        <span className={cn("leading-none", isCompact ? "ml-2.5" : isMedium ? "ml-2.5 sm:ml-3" : "ml-3 sm:ml-4")}>
          <span
            className={cn(
              "block font-medium leading-none tracking-normal",
              isCompact
                ? "text-[9px]"
                : isMedium
                  ? "text-[11px] sm:text-[13px]"
                  : "text-sm sm:text-[18px]",
            )}
          >
            Download on the
          </span>
          <span
            className={cn(
              "block font-sans font-medium leading-none tracking-normal",
              isCompact
                ? "mt-0.5 text-[18px]"
                : isMedium
                  ? "mt-0.5 text-[23px] sm:mt-1 sm:text-[27px]"
                  : "mt-1 text-[28px] sm:text-[36px]",
            )}
          >
            App Store
          </span>
        </span>
      </a>

      {showInAppHelp ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="open-browser-title"
        >
          <div className="w-full max-w-sm rounded-[28px] bg-white p-6 text-center shadow-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
              Open in browser
            </p>
            <h2
              id="open-browser-title"
              className="mt-3 text-2xl font-semibold tracking-normal text-foreground"
            >
              {browserLabel} is blocking the App Store.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Tap the <span className="font-semibold text-foreground">•••</span>{" "}
              menu in the top-right corner, choose{" "}
              <span className="font-semibold text-foreground">
                Open in browser
              </span>
              , then tap the App Store button again.
            </p>
            {isAndroid ? (
              <p className="mt-3 rounded-2xl bg-neutral-50 p-3 text-sm leading-6 text-muted">
                Sketch Steps is available for Android on Google Play. Close
                this message and use the Google Play button on this page.
              </p>
            ) : null}
            <div className="mt-5 grid gap-3">
              <button
                type="button"
                onClick={copyAppStoreLink}
                className="rounded-full bg-[#211d26] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#18141d]"
              >
                {copied ? "Copied" : "Copy App Store link"}
              </button>
              <button
                type="button"
                onClick={attemptNativeBrowserOpen}
                className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-neutral-50"
              >
                Open in my browser
              </button>
              <button
                type="button"
                onClick={() => setShowInAppHelp(false)}
                className="px-5 py-2 text-sm font-semibold text-muted transition hover:text-foreground"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function GooglePlayBadge({
  className,
  size = "default",
}: {
  className?: string;
  size?: "default" | "medium" | "compact";
}) {
  const isCompact = size === "compact";
  const isMedium = size === "medium";

  return (
    <a
      href={GOOGLE_PLAY_URL}
      aria-label="Get Sketch Steps on Google Play"
      className={cn(
        "inline-flex max-w-full items-center justify-center rounded-lg bg-[#211d26] text-white transition hover:-translate-y-0.5 hover:bg-[#18141d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        isCompact
          ? "h-10 w-[150px]"
          : isMedium
            ? "h-12 w-[180px] sm:h-14 sm:w-[205px]"
            : "h-16 w-[220px] sm:h-20 sm:w-[270px]",
        className,
      )}
    >
      <svg
        viewBox="0 0 512 512"
        width={isCompact ? 23 : isMedium ? 31 : 47}
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
          isCompact ? "ml-2" : isMedium ? "ml-2.5 sm:ml-3" : "ml-3 sm:ml-4",
        )}
      >
        <span
          className={cn(
            "block font-medium uppercase leading-none tracking-normal",
            isCompact
              ? "text-[8px]"
              : isMedium
                ? "text-[9px] sm:text-[11px]"
                : "text-[11px] sm:text-sm",
          )}
        >
          Get it on
        </span>
        <span
          className={cn(
            "block font-sans font-medium leading-none tracking-normal",
            isCompact
              ? "mt-0.5 text-[17px]"
              : isMedium
                ? "mt-0.5 text-[21px] sm:mt-1 sm:text-[25px]"
                : "mt-1 text-[27px] sm:text-[34px]",
          )}
        >
          Google Play
        </span>
      </span>
    </a>
  );
}

function StoreBadges({
  size = "default",
  className,
}: {
  size?: "default" | "medium" | "compact";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 sm:flex-row",
        className,
      )}
    >
      <AppStoreBadge size={size} />
      <GooglePlayBadge size={size} />
    </div>
  );
}

function InAppBrowserNotice() {
  const { browser } = useInAppBrowser();

  if (!browser) {
    return null;
  }

  const browserLabel =
    browser === "instagram"
      ? "Instagram"
      : browser === "facebook"
        ? "Facebook"
        : browser === "tiktok"
          ? "TikTok"
          : "this app";

  return (
    <div className="sticky top-0 z-40 border-b border-[#f2d9dc] bg-[#fff4f5] px-4 py-3 text-center text-sm leading-6 text-foreground">
      You’re viewing this inside {browserLabel}. If a store link doesn’t open,
      tap <span className="font-semibold">•••</span> and choose{" "}
      <span className="font-semibold">Open in browser</span>.
    </div>
  );
}

function LaurelBranch({ side }: { side: "left" | "right" }) {
  return (
    <Image
      src={
        side === "left" ? "/images/laurel-left.png" : "/images/laurel-right.png"
      }
      alt=""
      width={600}
      height={300}
      className={cn(
        "absolute top-1/2 hidden h-32 w-auto -translate-y-1/2 object-contain sm:block",
        side === "left"
          ? "left-0 2xl:-left-8"
          : "right-0 2xl:-right-8",
      )}
      sizes="160px"
      aria-hidden="true"
    />
  );
}

function HeroTrustWreath() {
  return (
    <div className="relative mx-auto mb-5 max-w-2xl -translate-y-1 px-4 text-center sm:-translate-y-4 sm:px-8 xl:-ml-8 2xl:-ml-12">
      <LaurelBranch side="left" />
      <LaurelBranch side="right" />
      <div className="flex items-center justify-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className="h-5 w-5 fill-[#F5C542] text-[#F5C542]"
          />
        ))}
      </div>
      <p className="mx-auto mt-3 max-w-sm text-sm font-semibold leading-snug text-foreground sm:max-w-none sm:text-lg">
        Trusted by artists, beginners,
        <br />
        and students worldwide.
      </p>
    </div>
  );
}

function FinalTrustWreath() {
  return (
    <div className="relative mx-auto max-w-5xl px-10 text-center">
      <Image
        src="/images/laurel-left.png"
        alt=""
        width={600}
        height={300}
        className="absolute -left-20 top-1/2 hidden h-52 w-auto -translate-y-1/2 object-contain lg:block xl:-left-10 xl:h-60"
        sizes="(min-width: 1280px) 480px, 416px"
        aria-hidden="true"
      />
      <Image
        src="/images/laurel-right.png"
        alt=""
        width={600}
        height={300}
        className="absolute -right-20 top-1/2 hidden h-52 w-auto -translate-y-1/2 object-contain lg:block xl:-right-10 xl:h-60"
        sizes="(min-width: 1280px) 480px, 416px"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-xl">
        <Image
          src="/images/sketch-steps-app-icon.png"
          alt="Sketch Steps"
          width={72}
          height={72}
          className="mx-auto mb-5 h-16 w-16 rounded-[22px] object-cover shadow-sm sm:h-[72px] sm:w-[72px]"
          sizes="72px"
        />
        <div className="flex items-center justify-center gap-1.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="h-7 w-7 fill-[#F5C542] text-[#F5C542] sm:h-8 sm:w-8"
            />
          ))}
        </div>
        <p className="mx-auto mt-5 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          Trusted by artists, beginners, and students worldwide.
        </p>
      </div>
    </div>
  );
}

function HeroPhoneFrame({
  src,
  alt,
  className,
  imageClassName,
  priority = false,
  sizes = "(min-width: 1024px) 286px, (min-width: 640px) 270px, 250px",
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[42px] border border-neutral-300/70 bg-neutral-950 p-2 shadow-phone",
        className,
      )}
    >
      <div className="pointer-events-none absolute left-1/2 top-3 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-neutral-950 shadow-[0_1px_0_rgba(255,255,255,0.18)] sm:h-6 sm:w-24" />
      <div className="overflow-hidden rounded-[34px] bg-white">
        <Image
          src={src}
          alt={alt}
          width={828}
          height={1792}
          priority={priority}
          sizes={sizes}
          className={cn(
            "block aspect-[828/1792] h-auto w-full object-cover",
            imageClassName,
          )}
          draggable={false}
        />
      </div>
    </div>
  );
}

function HeroMockups() {
  return (
    <div className="relative mx-auto h-[430px] w-full max-w-[360px] sm:h-[640px] sm:max-w-[600px] lg:h-[610px] lg:max-w-[620px] xl:h-[660px] xl:max-w-[680px]">
      <div className="absolute inset-x-2 top-16 h-64 rounded-[48px] bg-[#fff4f5] blur-3xl sm:inset-x-8 sm:top-24 sm:h-96" />

      <Image
        src="/images/hero/572shots_so.png"
        alt="Sketch Steps camera screen capturing a portrait"
        width={1284}
        height={2778}
        priority
        sizes="(min-width: 1280px) 252px, (min-width: 1024px) 230px, (min-width: 640px) 228px, 151px"
        className="absolute left-0 top-14 z-20 w-[42%] -rotate-[7deg] drop-shadow-[0_34px_48px_rgba(17,17,17,0.18)] sm:left-1 sm:top-24 sm:w-[38%] lg:left-2 lg:top-20 lg:w-[37%] xl:top-24"
        draggable={false}
      />

      <Image
        src="/images/hero/978shots_so.png"
        alt="Sketch Steps tutorial ready screen with generated drawing steps"
        width={1284}
        height={2778}
        sizes="(min-width: 1280px) 211px, (min-width: 1024px) 192px, (min-width: 640px) 192px, 130px"
        className="absolute -right-5 top-[5.5rem] z-30 w-[36%] rotate-[8deg] drop-shadow-[0_34px_48px_rgba(17,17,17,0.16)] sm:-right-7 sm:top-32 sm:w-[32%] lg:-right-8 lg:top-28 lg:w-[31%] xl:-right-12 xl:top-[7.5rem]"
        draggable={false}
      />

      <Image
        src="/images/hero/284shots_so.png"
        alt="Sketch Steps final drawing step screen"
        width={1284}
        height={2778}
        sizes="(min-width: 1280px) 211px, (min-width: 1024px) 192px, (min-width: 640px) 192px, 130px"
        className="absolute right-[21%] top-[5.5rem] z-10 w-[36%] -rotate-[8deg] drop-shadow-[0_30px_44px_rgba(17,17,17,0.14)] sm:right-[18%] sm:top-32 sm:w-[32%] lg:right-[17%] lg:top-28 lg:w-[31%] xl:right-[14%] xl:top-[7.5rem]"
        draggable={false}
      />

      <div className="pointer-events-none absolute left-[48%] top-[44%] z-40 hidden -translate-x-1/2 -translate-y-1/2 sm:left-[46%] sm:top-[46%] sm:block lg:left-[46%]">
        <svg
          width="176"
          height="134"
          viewBox="0 0 176 134"
          fill="none"
          aria-hidden="true"
          className="h-[58px] w-[78px] drop-shadow-sm sm:h-[88px] sm:w-[116px]"
        >
          <path
            d="M18 79C47 109 91 107 88 73C85 41 58 42 69 76C78 103 119 94 140 62"
            stroke="#111111"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M132 63L145 56L143 72"
            stroke="#111111"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pb-2 pt-4 sm:pb-4 lg:pb-4">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          <a className="transition hover:text-foreground" href="#gallery">
            Gallery
          </a>
          <a className="transition hover:text-foreground" href="#faq">
            FAQ
          </a>
          <a className="transition hover:text-foreground" href="#download">
            Download
          </a>
        </nav>
        <StoreBadges className="hidden sm:flex" size="compact" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pt-6 sm:px-6 md:pt-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8 lg:px-8 xl:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-2xl lg:text-left"
        >
          <HeroTrustWreath />
          <h1 className="text-balance text-4xl font-semibold leading-[1.02] tracking-normal text-foreground sm:text-5xl md:text-6xl lg:text-[50px] xl:text-[58px]">
            Step-by-Step Loomis Drawing Guide
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-base leading-7 text-muted sm:text-lg lg:mx-0 lg:max-w-xl">
            Upload a face and instantly receive guided drawing steps designed
            for beginners and aspiring artists.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 lg:items-start lg:justify-start">
            <StoreBadges size="medium" />
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="w-full max-w-[220px] sm:w-auto sm:min-w-48"
            >
              <a href="#how-it-works">
                See How It Works
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </motion.div>
        <div className="min-w-0 lg:translate-x-2 xl:translate-x-6">
          <HeroMockups />
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const lastManualScrollRef = useRef(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (Date.now() - lastManualScrollRef.current < 1400) return;

      setActiveStep((current) => (current + 1) % tutorialSteps.length);
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const selectedStep = tutorialSteps[activeStep];

  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Live demo"
          title="What does Sketch Steps actually do?"
          description="Upload one portrait and Sketch Steps turns it into a clean Loomis drawing lesson, from simple construction lines to a finished sketch you can practice at your own pace."
        />

        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-[32px] border border-border bg-[#fffdfc] shadow-premium">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(228,56,68,0.08),transparent_34%),radial-gradient(circle_at_78%_28%,rgba(17,17,17,0.045),transparent_32%)]" />
            <div className="relative grid gap-8 p-4 sm:p-6 md:gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16 lg:p-8">
              <motion.div
                whileHover={{ rotate: -1.5, y: -4 }}
                transition={{ duration: 0.25 }}
                className="relative mx-auto w-full max-w-[350px] self-center rounded-[28px] border border-neutral-200 bg-white p-3 shadow-[0_24px_70px_rgba(17,17,17,0.10)] sm:max-w-[420px] lg:max-w-none lg:-translate-y-8 lg:-rotate-2"
              >
                <div className="absolute left-7 top-7 z-10 rounded-full bg-[#211d26] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-lg">
                  Your photo
                </div>
                <div className="overflow-hidden rounded-[22px] bg-neutral-100">
                  <Image
                    src={tutorialPhoto.src}
                    alt={tutorialPhoto.alt}
                    width={941}
                    height={1672}
                    sizes="(min-width: 1024px) 310px, (min-width: 640px) 420px, 350px"
                    className="aspect-[4/5] h-auto w-full object-cover object-top"
                  />
                </div>
                <p className="px-3 pb-2 pt-4 text-sm font-medium leading-6 text-foreground sm:text-base">
                  A single selfie becomes a structured portrait study, ready to
                  draw step by step.
                </p>
              </motion.div>

              <div className="pointer-events-none absolute left-[43%] top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
                <svg
                  width="102"
                  height="102"
                  viewBox="0 0 92 92"
                  fill="none"
                  aria-hidden="true"
                  className="drop-shadow-[0_8px_16px_rgba(228,56,68,0.16)]"
                >
                  <path
                    d="M12 58C30 38 58 38 78 50"
                    stroke="#e43844"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M66 38L80 50L64 59"
                    stroke="#e43844"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="min-w-0">
                <motion.div
                  key={selectedStep.src}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="relative mx-auto w-full max-w-[340px] rounded-[28px] border border-neutral-200 bg-white p-3 shadow-[0_24px_70px_rgba(17,17,17,0.10)] sm:max-w-[390px] lg:max-w-[430px]"
                >
                  <div className="absolute left-7 top-7 z-10 rounded-full bg-[#fff4f5] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-accent shadow-lg">
                    {selectedStep.label}
                  </div>
                  <div className="overflow-hidden rounded-[22px] border-2 border-accent/65 bg-white shadow-[0_18px_50px_rgba(228,56,68,0.12)]">
                    <Image
                      src={selectedStep.src}
                      alt={selectedStep.alt}
                      width={309}
                      height={384}
                      sizes="(min-width: 1024px) 430px, (min-width: 640px) 390px, 340px"
                      className="aspect-[309/384] h-auto w-full object-cover"
                    />
                  </div>
                </motion.div>

                <div className="mx-auto mt-4 grid max-w-[540px] grid-cols-9 gap-1 sm:gap-1.5">
                  {tutorialSteps.map((step, index) => (
                    <button
                      key={step.src}
                      type="button"
                      onClick={() => {
                        lastManualScrollRef.current = Date.now();
                        setActiveStep(index);
                      }}
                      aria-label={`Show ${step.label}`}
                      className={cn(
                        "relative h-11 min-w-0 overflow-hidden rounded-xl border bg-white transition min-[380px]:h-12 sm:h-16 lg:h-[70px]",
                        activeStep === index
                          ? "border-accent shadow-[0_10px_28px_rgba(228,56,68,0.18)]"
                          : "border-accent/25 opacity-70 hover:border-accent/60 hover:opacity-100",
                      )}
                    >
                      <span className="absolute left-1 top-1 z-10 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-white">
                        {index + 1}
                      </span>
                      <Image
                        src={step.src}
                        alt=""
                        width={309}
                        height={384}
                        sizes="(min-width: 1024px) 54px, (min-width: 640px) 60px, 11vw"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DrawingEffects() {
  return (
    <section className="overflow-hidden bg-[#fffdfc] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Drawing effects"
          title="Apply different drawing effects to your photo, save it, then try drawing it yourself."
        />

        <Reveal className="mt-14">
          <div className="relative mx-auto flex min-h-[520px] max-w-6xl items-center justify-center overflow-hidden sm:min-h-[700px] md:min-h-[760px] lg:min-h-[840px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(228,56,68,0.10),transparent_34%),radial-gradient(circle_at_18%_22%,rgba(17,17,17,0.045),transparent_30%),radial-gradient(circle_at_82%_76%,rgba(228,56,68,0.07),transparent_28%)]" />

            {drawingEffects.map((effect, index) => {
              const angle =
                ((360 / drawingEffects.length) * index - 90) * (Math.PI / 180);
              const x = `calc(cos(${angle}rad) * clamp(104px, 31vw, 330px))`;
              const y = `calc(sin(${angle}rad) * clamp(104px, 31vw, 330px))`;

              return (
                <motion.div
                  key={effect.src}
                  className={cn(
                    "absolute left-1/2 top-1/2",
                    effect.label === "Clean Pencil" ? "z-20" : "z-0",
                  )}
                  initial={{ opacity: 0, scale: 0.82, x, y }}
                  animate={{ opacity: 1, scale: 1, x, y }}
                  transition={{
                    delay: index,
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="-translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      whileHover={{ y: -5, scale: 1.03 }}
                      transition={{ duration: 0.25 }}
                      className="relative w-[88px] rounded-[20px] border-2 border-accent/70 bg-white p-1.5 shadow-[0_22px_56px_rgba(17,17,17,0.12)] sm:w-[124px] md:w-[136px] lg:w-[172px]"
                    >
                      <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#fff4f5] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.1em] text-accent shadow-md min-[420px]:px-3 min-[420px]:text-[10px] sm:text-[11px]">
                        {effect.label}
                      </div>
                      <Image
                        src={effect.src}
                        alt={effect.alt}
                        width={1024}
                        height={1024}
                        sizes="(min-width: 1024px) 172px, (min-width: 768px) 136px, (min-width: 640px) 124px, 88px"
                        className="aspect-square w-full rounded-[14px] object-cover sm:rounded-[16px]"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 w-[138px] rounded-[24px] border border-neutral-200 bg-white p-2.5 shadow-[0_30px_90px_rgba(17,17,17,0.16)] sm:w-[200px] sm:rounded-[28px] sm:p-3 lg:w-[270px]"
            >
              <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#211d26] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white shadow-md min-[420px]:px-4 min-[420px]:text-[10px] sm:text-[11px]">
                Original photo
              </div>
              <Image
                src={drawingEffectsOriginal.src}
                alt={drawingEffectsOriginal.alt}
                width={736}
                height={920}
                sizes="(min-width: 1024px) 270px, (min-width: 640px) 200px, 138px"
                className="aspect-[4/5] w-full rounded-[18px] object-cover object-top sm:rounded-[22px]"
              />
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="App gallery"
          title="A closer look at Sketch Steps."
        />
        <div className="mx-auto mt-14 grid max-w-6xl gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item, index) => (
            <Reveal key={item.src} delay={index * 0.04}>
              <HeroPhoneFrame
                src={item.src}
                alt={item.alt}
                className="mx-auto w-full max-w-[286px] rounded-[40px] p-2 shadow-[0_30px_80px_rgba(17,17,17,0.12)]"
                imageClassName="object-cover"
                sizes="(min-width: 1024px) 286px, (min-width: 640px) 286px, 286px"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions before your first guide."
        />
        <Reveal className="mt-10">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="download" className="px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
      <Reveal>
        <div className="mx-auto max-w-6xl text-center">
          <FinalTrustWreath />
          <StoreBadges className="mt-10" />
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 text-center sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between xl:text-left">
        <div className="flex flex-col items-center gap-5 xl:shrink-0">
          <Logo />
          <StoreBadges size="compact" />
        </div>
        <nav className="flex max-w-2xl flex-wrap justify-center gap-x-5 gap-y-3 text-sm font-medium text-muted">
          <a className="transition hover:text-foreground" href="#gallery">
            Gallery
          </a>
          <a className="transition hover:text-foreground" href="#faq">
            FAQ
          </a>
          <a
            className="transition hover:text-foreground"
            href={PRIVACY_POLICY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          <Link
            className="rounded-sm transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            href="/android-privacy-policy"
          >
            Android Privacy Policy
          </Link>
          <Link
            className="rounded-sm transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            href="/ios-privacy-policy"
          >
            iOS Privacy Policy
          </Link>
          <a
            className="transition hover:text-foreground"
            href={TERMS_OF_USE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Use
          </a>
          <Link
            className="rounded-sm transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            href="/account-deletion"
          >
            Delete Account
          </Link>
          <a
            className="transition hover:text-foreground"
            href={`mailto:${SUPPORT_EMAIL}`}
          >
            Support
          </a>
        </nav>
        <p className="text-sm text-muted xl:text-right">
          © {new Date().getFullYear()} Sketch Steps. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <main className="bg-white">
      <InAppBrowserNotice />
      <Hero />
      <HowItWorks />
      <DrawingEffects />
      <Gallery />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
