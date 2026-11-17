"use client";

import Image from "next/image";
import { type CSSProperties, useState } from "react";

import { cn } from "@/lib/utils";

type DemoImage = { src: string; alt: string };
type Size = { width: number; height: number };
type DemoPhoto = DemoImage & Size;

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
  labels,
}: {
  photo: DemoPhoto;
  steps: DemoImage[];
  /** Natural pixel size of every step image. */
  stepSize: Size;
  labels: StepDemoLabels;
}) {
  // The stage never grows past the images' natural width, so the browser
  // never enlarges them on standard displays.
  const stageStyle = {
    maxWidth: stepSize.width,
    aspectRatio: `${stepSize.width} / ${stepSize.height}`,
  };

  const [index, setIndex] = useState(0);
  const total = steps.length;
  const go = (next: number) => setIndex(Math.min(total - 1, Math.max(0, next)));

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
            onClick={() => go(index - 1)}
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
            onChange={(event) => go(Number(event.target.value) - 1)}
            aria-label={labels.sliderLabel}
            aria-valuetext={fill(labels.stepCounter, { step: index + 1, total })}
            className="step-range min-w-0 flex-1"
          />
          <button
            type="button"
            onClick={() => go(index + 1)}
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
                onClick={() => go(i)}
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
      </div>

      <div className="order-1 min-w-0 lg:order-2">
        <div className="relative mx-auto w-full" style={{ maxWidth: stepSize.width }}>
          <div
            className="relative w-full overflow-hidden rounded-[24px] border border-line bg-white shadow-device"
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
