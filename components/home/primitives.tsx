import Image from "next/image";

import { SCREEN } from "@/components/home/assets";
import { cn } from "@/lib/utils";

/** App screenshots carry fine pencil lines and small UI text; the default
 * quality (75) visibly softens both. */
export const SCREEN_QUALITY = 90;

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2";

/** Section heading: optional eyebrow, an <h2>, optional lead paragraph. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  align = "center",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-crimson">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="text-balance font-display text-[32px] font-extrabold leading-[1.08] tracking-[-0.01em] text-ink sm:text-5xl"
      >
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 text-pretty text-base leading-7 text-ink-soft sm:text-lg sm:leading-8">
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/** A real app screenshot inside a simple, light device frame. */
export function PhoneFrame({
  src,
  alt,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 300px, 240px",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[38px] bg-[#1d1310] p-[6px] shadow-device",
        className,
      )}
    >
      <div className="overflow-hidden rounded-[32px] bg-white">
        <Image
          src={src}
          alt={alt}
          width={SCREEN.width}
          height={SCREEN.height}
          sizes={sizes}
          quality={SCREEN_QUALITY}
          priority={priority}
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}

/**
 * The top part of a screenshot "peeking" out of the bottom of a card, used in
 * feature cards so long screens don't dominate the layout.
 */
export function ScreenPeek({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 320px, 80vw",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto mt-6 h-[300px] w-[82%] max-w-[320px] overflow-hidden rounded-t-[30px] border-x-[6px] border-t-[6px] border-[#1d1310] bg-white shadow-device sm:h-[340px]",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={SCREEN.width}
        height={SCREEN.height}
        sizes={sizes}
        quality={SCREEN_QUALITY}
        className="block h-auto w-full"
      />
    </div>
  );
}
