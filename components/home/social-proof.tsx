import { getTranslations } from "next-intl/server";

import { DOWNLOAD_MILESTONE } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Download milestone shown under the hero store buttons: the figure between
 * two mirrored laurel branches, with "Downloads worldwide" on its own line.
 * No card, border or shadow. A static, verified figure (see DOWNLOAD_MILESTONE
 * in lib/site.ts): no live counter, no ratings, and worded as downloads, never
 * as active users. The number is formatted per locale by next-intl
 * ({count, number}), so translations only change wording. A label too wide
 * for one line can mark its second line with <line>…</line> (as Spanish
 * does), so the column never grows wider than the number and the laurels stay
 * put; labels without the tag render as a single line.
 *
 * Entrance: a short CSS fade-up (`.social-proof-in` in globals.css), switched
 * off under prefers-reduced-motion; no JavaScript.
 */
export async function SocialProof({ className }: { className?: string }) {
  const t = await getTranslations("Home.socialProof");

  return (
    <p
      className={cn(
        "social-proof-in flex items-center justify-center gap-[2.5vw] sm:gap-5 lg:gap-6",
        className,
      )}
    >
      <Laurel />
      <span className="flex flex-col items-center text-center">
        <span className="whitespace-nowrap font-display text-[12vw] font-extrabold leading-none tracking-[-0.02em] text-crimson sm:text-[64px] lg:text-[72px]">
          {t("number", { count: DOWNLOAD_MILESTONE.count })}
        </span>{" "}
        <span className="mt-[1.8vw] whitespace-nowrap text-[3.5vw] font-semibold uppercase leading-none tracking-[0.13em] text-ink-soft sm:mt-3 sm:text-[22px] lg:text-[24px]">
          {t.rich("label", {
            line: (chunks) => <span className="mt-[0.3em] block">{chunks}</span>,
          })}
        </span>
      </span>
      <Laurel mirrored />
    </p>
  );
}

/* ---------- laurel branch ---------------------------------------------- */

// The stem is one cubic Bézier curving up and inwards (left branch; the right
// one is the same drawing mirrored). Leaves are placed along it in pairs,
// angled outwards and inwards from the stem's direction, getting smaller
// towards the tip. Computed once at module load; values are rounded so the
// server and client markup are identical.
const STEM = [
  [22, 61],
  [7, 52],
  [3, 34],
  [9, 21],
] as const;
const STEM_TIP: [number, number] = [18, 5];

function bezier(t: number) {
  const [p0, p1, p2, p3] = STEM;
  const u = 1 - t;
  const point = [0, 1].map(
    (k) => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k],
  );
  const tangent = [0, 1].map(
    (k) => 3 * u * u * (p1[k] - p0[k]) + 6 * u * t * (p2[k] - p1[k]) + 3 * t * t * (p3[k] - p2[k]),
  );
  return { x: point[0], y: point[1], angle: (Math.atan2(tangent[1], tangent[0]) * 180) / Math.PI };
}

const r2 = (n: number) => Math.round(n * 100) / 100;

const LEAVES = [0.08, 0.27, 0.46, 0.65, 0.84, 0.99].flatMap((t, i) => {
  const { x, y, angle } = bezier(t);
  const size = r2(1 - i * 0.05);
  return [
    { x: r2(x), y: r2(y), rotate: r2(angle - 42), size, outer: true },
    { x: r2(x), y: r2(y), rotate: r2(angle + 40), size: r2(size * 0.86), outer: false },
  ];
});

const LEAF = "M0 0C3.2-3.8 9.2-4.2 12.8 0C9.2 4.2 3.2 3.8 0 0Z";

function Laurel({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <svg
      viewBox="-2 0 34 64"
      aria-hidden="true"
      className={cn("h-[23vw] w-auto shrink-0 sm:h-[136px] lg:h-[150px]", mirrored && "-scale-x-100")}
    >
      <path
        d={`M${STEM[0].join(" ")}C${STEM[1].join(" ")} ${STEM[2].join(" ")} ${STEM[3].join(" ")}Q11.5 11 ${STEM_TIP.join(" ")}`}
        fill="none"
        stroke="#A9804A"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      {LEAVES.map((leaf) => (
        <path
          key={`${leaf.x}-${leaf.rotate}`}
          d={LEAF}
          fill={leaf.outer ? "#B98E4F" : "#CDA86E"}
          transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.rotate}) scale(${leaf.size})`}
        />
      ))}
      {/* tip leaf */}
      <path d={LEAF} fill="#B98E4F" transform={`translate(${STEM_TIP.join(" ")}) rotate(-58) scale(0.8)`} />
    </svg>
  );
}
