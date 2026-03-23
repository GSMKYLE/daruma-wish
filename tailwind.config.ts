import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        daruma: {
          red: "#E04A3A",
          orange: "#F27D42",
          cream: "#FDFBF7",
          gold: "#F4B942",
          dark: "#2D2A26",
          paper: "#F5EFE6",
          blue: "#2471E7",
          green: "#71E07E",
          purple: "#8C52FF",
          softblue: "#95C6FF",
          bg: "#141722",
          panel: "#1E2235",
          accent: "#A855F7"
        }
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "sans-serif"],
        display: ["var(--font-quicksand)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 30px rgba(168, 85, 247, 0.15)",
        card: "0 4px 20px rgba(0, 0, 0, 0.05)",
        button: "0 6px 0 rgba(107, 33, 168, 1)",
        "button-hover": "0 2px 0 rgba(107, 33, 168, 1)",
        chip: "0 4px 12px rgba(0,0,0,0.05)",
        "chip-active": "0 0 0 2px #E04A3A, 0 4px 12px rgba(224, 74, 58, 0.2)",
        glow: "0 0 20px rgba(168, 85, 247, 0.4)",
        "wish-card": "0 20px 40px -10px rgba(0,0,0,0.5), 0 0 20px rgba(168,85,247,0.2)"
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "fill-ring": "fillRing 2s ease-out forwards",
        confetti: "confetti 3s ease-out forwards",
        "card-appear": "cardAppear 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        stamp: "stamp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s forwards"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fillRing: {
          "0%": { strokeDasharray: "0 100" },
          "100%": { strokeDasharray: "100 100" }
        },
        confetti: {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(100vh) rotate(720deg)", opacity: "0" }
        },
        cardAppear: {
          "0%": { transform: "scale(0.8) translateY(50px)", opacity: "0" },
          "100%": { transform: "scale(1) translateY(0)", opacity: "1" }
        },
        stamp: {
          "0%": { transform: "scale(2) rotate(-20deg)", opacity: "0" },
          "100%": { transform: "scale(1) rotate(-10deg)", opacity: "1" }
        }
      },
      backgroundImage: {
        "paper-texture": "url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23e04a3a\\' fill-opacity=\\'0.02\\' fill-rule=\\'evenodd\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'3\\'/%3E%3Ccircle cx=\\'13\\' cy=\\'13\\' r=\\'3\\'/%3E%3C/g%3E%3C/svg%3E')",
      }
    }
  },
  plugins: [],
};
export default config;
