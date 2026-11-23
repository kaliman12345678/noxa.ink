import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        noxa: {
          bg: "#0D0D0F",
          surface: "#18181B",
          card: "#141416",
          border: "rgba(255, 255, 255, 0.08)",
          sand: "#D6C5B0",
          sandHover: "#C4B29C",
          concrete: "#8C8780",
          bone: "#F5F5F3",
          muted: "#9E9A93",
          navy: "#1B263B",
          steel: "#6E7275",
          charcoal: "#111111",
        },
      },
      fontFamily: {
        headline: ["Oswald", "sans-serif"],
        sans: ["var(--font-jakarta)", "Plus Jakarta Sans", "sans-serif"],
      },
      letterSpacing: {
        ultra: "0.22em",
        wide: "0.14em",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "pulse-subtle": "pulseSubtle 3s infinite ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
