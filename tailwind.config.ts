import type { Config } from "tailwindcss";

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
      },
      boxShadow: {
        premium:
          "0 24px 70px rgba(17, 17, 17, 0.08), 0 2px 8px rgba(17, 17, 17, 0.04)",
        phone:
          "0 42px 90px rgba(17, 17, 17, 0.16), 0 12px 28px rgba(17, 17, 17, 0.08)",
        accent:
          "0 20px 48px rgba(228, 56, 68, 0.26), 0 6px 16px rgba(228, 56, 68, 0.14)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
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
