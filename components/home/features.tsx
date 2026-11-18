import { getTranslations } from "next-intl/server";

import { screens } from "@/components/home/assets";
import { ScreenPeek, SectionHeading } from "@/components/home/primitives";
import { cn } from "@/lib/utils";

type StyleItem = { name: string; detail: string };

function FeatureCard({
  title,
  body,
  className,
  children,
}: {
  title: string;
  body: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <li
      className={cn(
        "flex flex-col overflow-hidden rounded-[28px] px-6 pt-7 sm:px-8 sm:pt-8",
        className,
      )}
    >
      <h3 className="font-display text-2xl font-bold text-ink">{title}</h3>
      <p className="mt-2 max-w-md text-pretty text-[15px] leading-7 text-ink-soft">
        {body}
      </p>
      <div className="mt-auto">{children}</div>
    </li>
  );
}

export async function Features() {
  const t = await getTranslations("Home.features");
  const styles = t.raw("styles.items") as StyleItem[];
  const effects = t.raw("traceAi.effects") as string[];

  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="scroll-mt-4 bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          id="features-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          lead={t("lead")}
        />

        <ul className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title={t("loomis.title")}
            body={t("loomis.body")}
            className="bg-peach/70 md:col-span-2"
          >
            <ScreenPeek src={screens.allStepsPortrait} alt={t("loomis.alt")} />
          </FeatureCard>

          <FeatureCard
            title={t("styles.title")}
            body={t("styles.body")}
            className="bg-blush/80 pb-7 sm:pb-8"
          >
            <ul className="mt-6 grid gap-3">
              {styles.map((style, i) => (
                <li
                  key={style.name}
                  className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 shadow-card"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-9 w-9 shrink-0 rounded-xl",
                      ["bg-peach", "bg-blush", "bg-sage"][i % 3],
                    )}
                  />
                  <span className="min-w-0">
                    <span className="block font-display font-bold text-ink">
                      {style.name}
                    </span>
                    <span className="block text-sm text-ink-soft">
                      {style.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </FeatureCard>

          <FeatureCard
            title={t("animals.title")}
            body={t("animals.body")}
            className="bg-sage/80"
          >
            <ScreenPeek src={screens.allStepsDog} alt={t("animals.alt")} />
          </FeatureCard>

          <FeatureCard
            title={t("traceAi.title")}
            body={t("traceAi.body")}
            className="bg-[#FFF4D6] lg:col-span-2"
          >
            <ul
              aria-label={t("traceAi.effectsLabel")}
              className="mt-5 flex flex-wrap gap-2"
            >
              {effects.map((effect) => (
                <li
                  key={effect}
                  className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-ink shadow-card"
                >
                  {effect}
                </li>
              ))}
            </ul>
            <ScreenPeek src={screens.traceAiEffects} alt={t("traceAi.alt")} />
          </FeatureCard>

          <FeatureCard
            title={t("tracingStudio.title")}
            body={t("tracingStudio.body")}
            className="border border-line bg-white"
          >
            <ScreenPeek src={screens.tracingStudio} alt={t("tracingStudio.alt")} />
          </FeatureCard>

          <FeatureCard
            title={t("freeTutorials.title")}
            body={t("freeTutorials.body")}
            className="bg-cream"
          >
            <ScreenPeek src={screens.freeTutorials} alt={t("freeTutorials.alt")} />
          </FeatureCard>

          <FeatureCard
            title={t("gallery.title")}
            body={t("gallery.body")}
            className="bg-blush/70"
          >
            <ScreenPeek src={screens.myGallery} alt={t("gallery.alt")} />
          </FeatureCard>
        </ul>
      </div>
    </section>
  );
}
