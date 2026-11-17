import { getTranslations } from "next-intl/server";

import { DOWNLOAD_MILESTONE } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Download milestone shown under the hero store buttons. A static, verified
 * figure (see DOWNLOAD_MILESTONE in lib/site.ts): no live counter, no ratings,
 * and worded as downloads, never as active users. The number is formatted per
 * locale by next-intl ({count, number}), so translations only change wording.
 *
 * Entrance: a short CSS fade-up (`.social-proof-in` in globals.css) that is
 * switched off under prefers-reduced-motion. It needs no JavaScript, so the
 * text is in the server HTML and visible even if scripts never run.
 */
export async function SocialProof({ className }: { className?: string }) {
  const t = await getTranslations("Home.socialProof");

  return (
    <div
      className={cn(
        // Phones: a light, centred stack (no card) so it never outweighs the
        // store buttons. From sm: an inline card about as wide as both buttons.
        "social-proof-in mx-auto flex max-w-xs flex-col items-center gap-2 text-center",
        "sm:w-fit sm:max-w-full sm:flex-row sm:gap-3.5 sm:rounded-2xl sm:border sm:border-line sm:bg-white/80 sm:py-3 sm:pl-3 sm:pr-5 sm:text-left sm:shadow-[0_10px_30px_-18px_rgba(39,21,10,0.35)] lg:mx-0",
        className,
      )}
    >
      <PencilMark />
      <div className="min-w-0">
        <p className="font-display text-[15px] font-bold leading-tight text-ink sm:text-base">
          {t.rich("title", {
            count: DOWNLOAD_MILESTONE.count,
            number: (chunks) => (
              <span className="relative mr-0.5 inline-block text-[22px] font-extrabold tracking-[-0.01em] text-crimson sm:text-2xl">
                {chunks}
                <svg
                  viewBox="0 0 120 8"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-1.5 w-full text-crimson/30"
                >
                  <path
                    d="M2 5.5C30 2.5 70 2 118 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            ),
          })}
        </p>
        <p className="mx-auto mt-1 max-w-[17rem] text-balance text-[13px] leading-5 text-ink-soft sm:mx-0 sm:max-w-none sm:text-sm">
          {t("body")}
        </p>
      </div>
    </div>
  );
}

/** A red pencil sketching a little loop: the brand's "sketchbook" motif. */
function PencilMark() {
  return (
    <span
      aria-hidden="true"
      className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-peach sm:h-12 sm:w-12"
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full text-crimson/35">
        <circle
          cx="24"
          cy="24"
          r="22.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="3 3.5"
        />
      </svg>
      <svg viewBox="0 0 28 28" className="h-[22px] w-[22px] sm:h-[26px] sm:w-[26px]">
        {/* sketched loop */}
        <path
          d="M4.5 21.5c2.5-.2 4.6-1.6 5.6-3.6"
          fill="none"
          stroke="#27150A"
          strokeOpacity="0.45"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* pencil body */}
        <path d="M18.6 4.2 23.8 9.4 12.4 20.8 7.2 15.6Z" fill="#D62845" />
        <path d="M18.6 4.2 21 1.8a1.6 1.6 0 0 1 2.2 0l3 3a1.6 1.6 0 0 1 0 2.2l-2.4 2.4Z" fill="#FFC83D" />
        <path d="M7.2 15.6 12.4 20.8 6 22.4Z" fill="#F6E3D2" />
        <path d="M6.9 20.6 6 22.4l1.8-.9Z" fill="#27150A" />
        <path d="M9.8 18.2 21.2 6.8" stroke="#89242F" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </span>
  );
}
