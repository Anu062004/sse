import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0B1530",
        yellow: "#F5B800",
        paper: "#F4F5F7",
        line: "#D9DCE1",
        error: "#B42318",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      maxWidth: {
        site: "1440px",
      },
      keyframes: {
        heroZoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.06)" },
        },
      },
      animation: {
        "hero-zoom": "heroZoom 24s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};

export default config;
