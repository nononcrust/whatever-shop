import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  fontFamily: {
    sans: ["var(--font-pretendard)", ...defaultTheme.fontFamily.sans],
  },
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "var(--background)",
          100: "var(--background-100)",
          200: "var(--background-200)",
          hover: "var(--background-hover)",
        },
        main: "var(--main)",
        sub: "var(--sub)",
        subtle: "var(--subtle)",
        placeholder: "var(--placeholder)",
        border: "var(--border)",
        primary: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
          lighter: "var(--primary-lighter)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          dark: "var(--secondary-dark)",
        },
        error: {
          DEFAULT: "var(--error)",
          dark: "var(--error-dark)",
          lighter: "var(--error-lighter)",
        },
        ring: {
          DEFAULT: "var(--ring)",
          error: "var(--ring-error)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
