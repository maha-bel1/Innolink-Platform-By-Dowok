import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Custom color palette with hex values for proper opacity support
        brand: {
          1: "#e7e2f3",
          2: "#a7b2e6", 
          3: "#688cca",
          4: "#496d9c",
          5: "#2d3c67",
        },
        // Updated theme colors using our palette
        border: "#a7b2e6",
        input: "#a7b2e6", 
        ring: "#688cca",
        background: "#e7e2f3",
        foreground: "#2d3c67",
        primary: {
          DEFAULT: "#496d9c",
          foreground: "#e7e2f3",
        },
        secondary: {
          DEFAULT: "#a7b2e6",
          foreground: "#2d3c67",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#e7e2f3",
        },
        muted: {
          DEFAULT: "#a7b2e6",
          foreground: "#496d9c",
        },
        accent: {
          DEFAULT: "#688cca",
          foreground: "#e7e2f3",
        },
        popover: {
          DEFAULT: "#e7e2f3",
          foreground: "#2d3c67",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#2d3c67",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
