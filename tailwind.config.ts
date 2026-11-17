import type { Config } from "tailwindcss";

const ROUNDED_STACK = [
  "ui-rounded",
  "SF Pro Rounded",
  "var(--font-nunito)",
  // Japanese: M PLUS Rounded 1c on every platform, because it has the bold
  // weights the headings use; Hiragino Maru Gothic (Apple) has only one.
  "var(--font-mplus-rounded)",
  "Hiragino Maru Gothic ProN",
  "Hiragino Sans",
  "Noto Sans JP",
  "Noto Sans KR",
  "system-ui",
  "-apple-system",
  "Segoe UI",
  "Roboto",
  "sans-serif",
];

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#111111",
        muted: "#666666",
        accent: "#E43844",
        border: "#EDEDED",
        // Sketch Steps 2.0 palette, sampled from the app UI.
        ink: { DEFAULT: "#27150A", soft: "#826351" },
        crimson: { DEFAULT: "#D62845", deep: "#C53A49", shadow: "#89242F" },
        sun: { DEFAULT: "#FFC83D", deep: "#D99A0B" },
        cream: "#FFFAF4",
        sand: "#F6E3D2",
        peach: "#FFE7CF",
        blush: "#FCE6E8",
        sage: "#E8F0E2",
        line: "#EFE3D8",
      },
      boxShadow: {
        premium:
          "0 24px 70px rgba(17, 17, 17, 0.08), 0 2px 8px rgba(17, 17, 17, 0.04)",
        phone:
          "0 42px 90px rgba(17, 17, 17, 0.16), 0 12px 28px rgba(17, 17, 17, 0.08)",
        accent:
          "0 20px 48px rgba(228, 56, 68, 0.26), 0 6px 16px rgba(228, 56, 68, 0.14)",
        card: "0 1px 2px rgba(39, 21, 10, 0.04), 0 12px 32px rgba(39, 21, 10, 0.06)",
        device:
          "0 40px 80px rgba(39, 21, 10, 0.16), 0 12px 24px rgba(39, 21, 10, 0.08)",
      },
      // One rounded stack for everything (see lib/fonts.ts for licensing):
      // SF Pro Rounded from the visitor's own Apple device, then the
      // self-hosted OFL fallbacks (Nunito for Latin, M PLUS Rounded 1c for
      // Japanese), then system fonts so no script is ever left without glyphs.
      // `display` is kept as an alias so existing classes stay valid.
      fontFamily: {
        sans: ROUNDED_STACK,
        display: ROUNDED_STACK,
      },
      keyframes: {
        "soft-pulse": {
          "0%, 100%": { opacity: "0.52" },
          "50%": { opacity: "1" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "soft-pulse": "soft-pulse 3.8s ease-in-out infinite",
        "accordion-down": "accordion-down 0.22s ease-out",
        "accordion-up": "accordion-up 0.22s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
