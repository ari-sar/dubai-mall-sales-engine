import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      colors: {
        accent: {
          gold: "#c9a96e",
          goldHover: "#d4b87a",
        },
      },
    },
  },
  plugins: [],
};

export default config;
