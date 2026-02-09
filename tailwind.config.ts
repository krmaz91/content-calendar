import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-sora)", "ui-sans-serif", "system-ui"],
        body: ["var(--font-inter)", "ui-sans-serif", "system-ui"]
      },
      colors: {
        ink: {
          900: "#0b0f1a",
          800: "#151b2b",
          700: "#1d2436"
        },
        electric: {
          600: "#00e5ff",
          500: "#12d6f4"
        },
        lime: {
          500: "#b8ff3d"
        }
      }
    }
  },
  plugins: []
};

export default config;
