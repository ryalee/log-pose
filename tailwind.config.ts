import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sea: {
          950: "#050e1a",
          900: "#0a1c30",
          800: "#0f2a45",
          700: "#154060",
          600: "#1c5a86",
        },
        straw: {
          400: "#f7cf4a",
          500: "#f0b90b",
          600: "#d69a00",
        },
        vest: {
          500: "#e2452c",
          600: "#c2331d",
          700: "#9c2717",
        },
        parchment: {
          100: "#faf3df",
          200: "#f2e6c2",
          300: "#e6d2a0",
        },
        ink: "#1c130a",
      },
      fontFamily: {
        pirate: ["var(--font-pirata)", "cursive"],
        display: ["var(--font-cabin)", "sans-serif"],
        body: ["var(--font-mulish)", "sans-serif"],
      },
      backgroundImage: {
        "sea-gradient":
          "radial-gradient(ellipse at top, #154060 0%, #0a1c30 45%, #050e1a 100%)",
        "paper-texture":
          "repeating-linear-gradient(0deg, rgba(28,19,10,0.03) 0px, rgba(28,19,10,0.03) 1px, transparent 1px, transparent 3px)",
      },
      boxShadow: {
        poster:
          "0 12px 0 -4px rgba(28,19,10,0.15), 0 20px 40px -10px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
