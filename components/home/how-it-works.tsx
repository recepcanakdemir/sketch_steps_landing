import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { SCREEN, demo, screens } from "@/components/home/assets";
import { SCREEN_QUALITY, SectionHeading } from "@/components/home/primitives";
import { StepDemo } from "@/components/home/step-demo";
import { StoreBadges, TryAppButton } from "@/components/home/store-buttons";

type Step = { title: string; body: string; alt: string };

const STEP_SCREENS = [
  screens.home,
  screens.chooseStyle,
  screens.tutorialReadyPortrait,
  screens.stepViewerPortrait,
];

const STEP_TINTS = ["bg-cream", "bg-peach/60", "bg-blush/70", "bg-sage/70"];

export async function HowItWorks() {
  const t = await getTranslations("Home.howItWorks");
  const steps = t.raw("steps") as Step[];

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className="scroll-mt-4 bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          id="how-it-works-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          lead={t("lead")}
        />

        <ol className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className={`flex w-[80%] max-w-[320px] shrink-0 snap-center flex-col overflow-hidden rounded-[28px] ${STEP_TINTS[i]} lg:w-auto lg:max-w-none`}
            >
              <div className="p-6 pb-0">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-crimson font-display text-base font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{step.body}</p>
              </div>
              <div className="relative mx-auto mt-6 h-[300px] w-[78%] overflow-hidden rounded-t-[28px] border-x-[5px] border-t-[5px] border-[#1d1310] bg-white">
                <Image
                  src={STEP_SCREENS[i]}
                  alt={step.alt}
                  width={SCREEN.width}
                  height={SCREEN.height}
                  sizes="(min-width: 1024px) 230px, 62vw"
                  quality={SCREEN_QUALITY}
                  className="block h-auto w-full"
                />
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col items-center gap-5 rounded-[28px] border border-line bg-cream px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left lg:px-10">
          <p className="text-balance font-display text-xl font-bold text-ink sm:text-2xl">
            {t("ctaTitle")}
          </p>
          <StoreBadges size="medium" location="how_it_works" className="sm:justify-end" />
        </div>
      </div>
    </section>
  );
}

export async function DrawingDemo() {
  const t = await getTranslations("Home.demo");
  const total = demo.steps.length;

  return (
    <section
      aria-labelledby="demo-title"
      className="sketchbook-grid relative overflow-hidden bg-cream py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          id="demo-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          lead={t("lead")}
        />
        <div className="mt-12 sm:mt-16">
          <StepDemo
            photo={{ src: demo.photo, alt: t("photoAlt"), ...demo.photoSize }}
            stepSize={demo.stepSize}
            framing={demo.stepFraming}
            cta={<TryAppButton location="interactive_demo" />}
            steps={demo.steps.map((src, i) => ({
              src,
              alt: t("stepAlt", { step: i + 1, total }),
            }))}
            labels={{
              photoLabel: t("photoLabel"),
              stepCounter: t.raw("stepCounter") as string,
              previous: t("previous"),
              next: t("next"),
              sliderLabel: t("sliderLabel"),
              stepButton: t.raw("stepButton") as string,
              stepsLabel: t("stepsLabel"),
            }}
          />
        </div>
      </div>
    </section>
  );
}
