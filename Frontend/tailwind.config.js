/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    fontFamily: {
      sans: ["Plus Jakarta Sans", "sans-serif"],
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    colors: {
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      chart: {
        1: "hsl(var(--chart-1))",
        2: "hsl(var(--chart-2))",
        3: "hsl(var(--chart-3))",
        4: "hsl(var(--chart-4))",
        5: "hsl(var(--chart-5))",
      },
    },
    keyframes: {
      marquee: {
        "0%": { transform: "translateX(0%)" },
        "100%": { transform: "translateX(-100%)" },
      },
      slide: {
        "0%": { transform: "translateX(-30px)" },
        "100%": { transform: "translateX(30px)" },
      },
      grow: {
        "0%": { transform: "scale(0) translate(0, 20px)", opacity: "0" },
        "50%": { transform: "scale(1) translate(0, 10px)", opacity: "1" },
        "100%": { transform: "scale(1) translate(0, 0)", opacity: "0" },
      },
    },
    animation: {
      marquee: "marquee 30s linear infinite",
      fall: "fall 3s forwards",
      slide: "slide 2s ease-in-out infinite alternate",
      grow: "grow 2s infinite",
    },
  },
};
export const plugins = [require("tailwindcss-animate")];
