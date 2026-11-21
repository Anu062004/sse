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
        navy: "#0B1736",
        ink: "#09132D",
        accent: "#F5821F",
        cream: "#F4F2ED",
        sand: "#F1EEE8",
        stone: "#E9E6DF",
        slate: "#3B4763",
        muted: "#5A6680",
        paper: "#F4F2ED",
        line: "#DCD8CF",
        whatsapp: "#169248",
        error: "#B42318",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      maxWidth: {
        site: "1320px",
      },
      borderRadius: {
        card: "20px",
        panel: "28px",
      },
      spacing: {
        gutter: "clamp(20px,4vw,48px)",
        section: "clamp(80px,10vw,140px)",
      },
    },
  },
  plugins: [],
};

export default config;
