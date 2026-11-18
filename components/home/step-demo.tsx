"use client";

import Image from "next/image";
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";

import { pageLanguage, trackEvent } from "@/lib/analytics";

import { cn } from "@/lib/utils";

type DemoImage = { src: string; alt: string };
type Size = { width: number; height: number };
type DemoPhoto = DemoImage & Size;
/** Uniform scale and shift (source pixels) that puts a step in a common frame. */
export type StepFraming = { scale: number; x: number; y: number };

export type StepDemoLabels = {
  photoLabel: string;
  /** e.g. "Step {step} of {total}" */
  stepCounter: string;
  previous: string;
  next: string;
  sliderLabel: string;
  /** e.g. "Show step {step}" */
  stepButton: string;
  stepsLabel: string;
};

const fill = (template: string, values: Record<string, number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2";

/**
 * User-controlled step viewer for a real Sketch Steps tutorial. No autoplay:
 * the user moves with the buttons, the slider (arrow keys work natively) or
 * the step thumbnails. All step images are in the server-rendered HTML, so
 * switching is instant and crawlers see every step.
 */
export function StepDemo({
  photo,
  steps,
  stepSize,
  framing,
  labels,
  cta,
}: {
  photo: DemoPhoto;
  steps: DemoImage[];
  /** Natural pixel size of every step image. */
  stepSize: Size;
  /** Optional per-step framing, one entry per step (see assets.ts). */
  framing?: readonly StepFraming[];
  labels: StepDemoLabels;
  /** Call to action rendered under the step controls. */
  cta?: ReactNode;
}) {
  // The stage never grows past the images' natural width, so the browser
  // never enlarges them on standard displays.
  const stageStyle = {
    maxWidth: stepSize.width,
    aspectRatio: `${stepSize.width} / ${stepSize.height}`,
  };

  const frameStyle = (i: number): CSSProperties | undefined => {
    const f = framing?.[i];
    if (!f) return undefined;
    const x = (f.x / stepSize.width) * 100;
    const y = (f.y / stepSize.height) * 100;
    return { transform: `translate(${x.toFixed(2)}%, ${y.toFixed(2)}%) scale(${f.scale})` };
  };

  const [index, setIndex] = useState(0);
  const total = steps.length;
  const clamp = (next: number) => Math.min(total - 1, Math.max(0, next));

  // GA4 demo_interaction: one event per button press or thumbnail pick. The
  // slider fires change events continuously while dragging, so it is only
  // reported once the visitor has stopped on a step for a moment.
  const sliderTimer = useRef(0);
  useEffect(() => () => window.clearTimeout(sliderTimer.current), []);
  const report = (action: string, next: number) =>
    trackEvent("demo_interaction", {
      action,
      step_number: next + 1,
      page_language: pageLanguage(),
    });
  const go = (next: number, action: "next" | "previous" | "select_step") => {
    const target = clamp(next);
    setIndex(target);
    if (target !== index) report(action, target);
  };
  const slide = (next: number) => {
    const target = clamp(next);
    setIndex(target);
    window.clearTimeout(sliderTimer.current);
    sliderTimer.current = window.setTimeout(() => report("slider", target), 800);
  };

  return (
    <div
      className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_var(--stage-width)] lg:gap-14"
      style={{ "--stage-width": `${stepSize.width}px` } as CSSProperties}
    >
      <div className="order-2 min-w-0 lg:order-1">
        <p
          className="font-display text-3xl font-bold text-ink sm:text-4xl"
          aria-live="polite"
        >
          {fill(labels.stepCounter, { step: index + 1, total })}
        </p>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => go(index - 1, "previous")}
            disabled={index === 0}
            aria-label={labels.previous}
            className={cn(
              "grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line bg-white text-ink shadow-card transition hover:border-crimson/40 disabled:opacity-40",
              focusRing,
            )}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <input
            type="range"
            min={1}
            max={total}
            step={1}
            value={index + 1}
            onChange={(event) => slide(Number(event.target.value) - 1)}
            aria-label={labels.sliderLabel}
            aria-valuetext={fill(labels.stepCounter, { step: index + 1, total })}
            className="step-range min-w-0 flex-1"
          />
          <button
            type="button"
            onClick={() => go(index + 1, "next")}
            disabled={index === total - 1}
            aria-label={labels.next}
            className={cn(
              "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-crimson text-white shadow-[0_4px_0_#89242F] transition hover:bg-crimson-deep disabled:opacity-40 disabled:shadow-none",
              focusRing,
            )}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <ol
          aria-label={labels.stepsLabel}
          className="no-scrollbar -mx-1 mt-6 flex gap-2 overflow-x-auto px-1 py-1"
        >
          {steps.map((step, i) => (
            <li key={step.src} className="shrink-0">
              <button
                type="button"
                onClick={() => go(i, "select_step")}
                aria-label={fill(labels.stepButton, { step: i + 1 })}
                aria-current={i === index ? "step" : undefined}
                className={cn(
                  "relative block h-16 w-12 overflow-hidden rounded-lg border-2 bg-white transition",
                  i === index
                    ? "border-crimson"
                    : "border-line hover:border-crimson/40",
                  focusRing,
                )}
              >
                <Image
                  src={step.src}
                  alt=""
                  width={stepSize.width}
                  height={stepSize.height}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </button>
            </li>
          ))}
        </ol>

        {cta ? (
          <div className="mt-8 flex justify-center border-t border-line pt-6 lg:justify-start">
            {cta}
          </div>
        ) : null}
      </div>

      <div className="order-1 min-w-0 lg:order-2">
        <div className="relative mx-auto w-full" style={{ maxWidth: stepSize.width }}>
          <div
            className="relative w-full overflow-hidden rounded-[24px] border border-line bg-[#F4F4F4] shadow-device"
            style={stageStyle}
          >
            {steps.map((step, i) => (
              <Image
                key={step.src}
                src={step.src}
                alt={step.alt}
                fill
                unoptimized
                aria-hidden={i === index ? undefined : true}
                style={frameStyle(i)}
                className={cn(
                  "object-cover transition-opacity duration-200",
                  i === index ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
          </div>
          <figure className="absolute -bottom-5 -left-3 w-[34%] max-w-[110px] rotate-[-4deg] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-device sm:-left-6">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="110px"
              quality={90}
              className="aspect-[3/4] h-auto w-full object-cover"
            />
            <figcaption className="sr-only">{labels.photoLabel}</figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}
