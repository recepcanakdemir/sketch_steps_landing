"use client";

import Image from "next/image";
import {
  ArrowRight,
  Bookmark,
  Layers,
  Library,
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
import { cn } from "@/lib/utils";

const APP_STORE_URL = "https://apps.apple.com/app/id6763632360";
const PRIVACY_POLICY_URL =
  "https://learned-trollius-e3f.notion.site/Sketch-Steps-Privacy-Policy-35072e55921f80848251fb0847ee0dee";
const TERMS_OF_USE_URL =
  "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";
const SUPPORT_EMAIL = "landmarkaiguide@gmail.com";

const processCards = [
  {
    icon: Bookmark,
    title: "Upload, Draw, Save",
    description: "Upload a photo, draw step by step, or save your guide.",
  },
  {
    icon: Layers,
    title: "Follow Each Step",
    description: "Move through clean, guided portrait construction stages.",
  },
  {
    icon: Library,
    title: "Practice Daily",
    description: "Build a personal library of references and exercises.",
  },
];

const howScreenshots = [
  {
    label: "Capture",
    src: "/images/how-collections.png",
    alt: "Sketch Steps collections screen with saved Loomis guides",
    width: 828,
    height: 1792,
  },
  {
    label: "Analyze",
    src: "/images/how-step-inspect.jpeg",
    alt: "Sketch Steps guided drawing step with navigation controls",
    width: 739,
    height: 1600,
  },
  {
    label: "Practice",
    src: "/images/how-cute-animals.jpeg",
    alt: "Sketch Steps drawing reference library with practice templates",
    width: 828,
    height: 1792,
  },
];

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
      "Sketch Steps can be downloaded from the App Store. Pricing and premium options are shown in the app before any purchase.",
  },
  {
    question: "Is there an Android version?",
    answer:
      "We are actively working on the Android version. It will be released as soon as possible.",
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
      />
      <Image
        src="/images/sketch-steps-wordmark.png"
        alt="Sketch Steps"
        width={120}
        height={40}
        className="block h-8 w-[96px] object-contain sm:h-9 sm:w-[108px]"
        priority
      />
    </a>
  );
}

function AppStoreButton({ className }: { className?: string }) {
  return <AppStoreBadge className={className} size="medium" />;
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

  return (
    <a
      href={APP_STORE_URL}
      aria-label="Download Sketch Steps on the App Store"
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
        aria-hidden="true"
      />
      <Image
        src="/images/laurel-right.png"
        alt=""
        width={600}
        height={300}
        className="absolute -right-20 top-1/2 hidden h-52 w-auto -translate-y-1/2 object-contain lg:block xl:-right-10 xl:h-60"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-xl">
        <Image
          src="/images/sketch-steps-app-icon.png"
          alt="Sketch Steps"
          width={72}
          height={72}
          className="mx-auto mb-5 h-16 w-16 rounded-[22px] object-cover shadow-sm sm:h-[72px] sm:w-[72px]"
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
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
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
    <div className="relative mx-auto h-[430px] w-full max-w-[340px] sm:h-[670px] sm:max-w-[560px] lg:h-[620px] lg:max-w-[600px]">
      <div className="absolute inset-x-4 top-14 h-64 rounded-[48px] bg-[#fff4f5] blur-3xl sm:inset-x-10 sm:top-20 sm:h-96" />
      <div className="pointer-events-none absolute left-[52%] top-[44%] z-30 hidden -translate-x-1/2 -translate-y-1/2 sm:block">
        <svg
          width="150"
          height="118"
          viewBox="0 0 150 118"
          fill="none"
          aria-hidden="true"
          className="drop-shadow-sm"
        >
          <path
            d="M17 63C45 100 93 108 91 64C89 25 50 31 62 69C70 96 112 91 132 62"
            stroke="#111111"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M124 62L136 58L132 72"
            stroke="#111111"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <HeroPhoneFrame
        src="/images/sketchsteps-home-latest.jpeg"
        alt="Sketch Steps home screen showing AI Loomis Studio and Tracing Studio"
        className="absolute left-1 top-20 z-10 w-[46%] -rotate-6 sm:left-0 sm:top-28 sm:w-[250px] lg:left-8 lg:top-12 lg:w-[240px] 2xl:left-0"
        priority
      />
      <HeroPhoneFrame
        src="/images/sketchflow-tutorial-ready.jpeg"
        alt="Sketch Steps tutorial ready screen with 8 drawing steps"
        className="absolute right-1 top-6 z-20 w-[46%] rotate-6 sm:right-0 sm:top-4 sm:w-[250px] lg:right-8 lg:w-[240px] 2xl:right-0"
        priority
      />
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
        <AppStoreBadge className="hidden sm:inline-flex" size="compact" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pt-6 sm:px-6 md:pt-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center lg:mx-0 lg:text-left"
        >
          <HeroTrustWreath />
          <h1 className="text-balance text-4xl font-semibold leading-[1.02] tracking-normal text-foreground sm:text-5xl md:text-6xl lg:text-[54px] xl:text-[60px]">
            Step-by-Step Loomis Drawing Guide
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-7 text-muted sm:text-lg lg:mx-0">
            Upload a face and instantly receive guided drawing steps designed
            for beginners and aspiring artists.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <AppStoreButton />
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
        <div className="min-w-0 xl:translate-x-8">
          <HeroMockups />
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="How it works"
          title="From portrait to practice plan in seconds."
          description="Sketch Steps turns one photo into a clear drawing workflow, so every session starts with structure."
        />
        <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {processCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="h-full rounded-[24px] border border-border bg-white p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-50">
                  <card.icon className="h-5 w-5 text-accent" />
                </div>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-muted">
                  0{index + 1}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-normal">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {card.description}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12">
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {howScreenshots.map((item, index) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className={cn(
                  "mx-auto w-full max-w-[250px] sm:max-w-[270px] lg:max-w-[286px]",
                  index === 1 && "lg:mt-8",
                  index === 2 && "lg:mt-4",
                )}
              >
                <HeroPhoneFrame
                  src={item.src}
                  alt={item.alt}
                  className="w-full rounded-[40px] p-2 shadow-[0_30px_80px_rgba(17,17,17,0.12)]"
                  imageClassName="object-cover"
                />
              </motion.div>
            ))}
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
          <div className="mt-10 flex justify-center">
            <AppStoreBadge />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 text-center sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:text-left">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center lg:shrink-0">
          <Logo />
          <AppStoreBadge size="compact" />
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
          <a
            className="transition hover:text-foreground"
            href={TERMS_OF_USE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Use
          </a>
          <a
            className="transition hover:text-foreground"
            href={`mailto:${SUPPORT_EMAIL}`}
          >
            Support
          </a>
        </nav>
        <p className="text-sm text-muted lg:text-right">
          © {new Date().getFullYear()} Sketch Steps. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <main className="bg-white">
      <Hero />
      <HowItWorks />
      <Gallery />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
