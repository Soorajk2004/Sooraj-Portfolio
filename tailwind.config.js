/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#101014",
        elevation1: "#1B1B22",
        elevation2: "#232330",
        amberAccent: "#D9A05B",
        textPrimary: "#EDEDF2",
        textMuted: "#7A7A8C",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      boxShadow: {
        'elev-1': '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4), inset 0 -1px 0 0 rgba(217, 160, 91, 0.08)',
        'elev-2': '0 20px 35px -10px rgba(0, 0, 0, 0.6), 0 10px 15px -5px rgba(0, 0, 0, 0.45), inset 0 -1px 0 0 rgba(217, 160, 91, 0.12)',
        'elev-menu': '0 14px 32px -6px rgba(0, 0, 0, 0.6), 0 6px 14px -3px rgba(0, 0, 0, 0.45), inset 0 -1px 0 0 rgba(217, 160, 91, 0.1)',
        'elev-menu-scrolled': '0 26px 54px -10px rgba(0, 0, 0, 0.75), 0 14px 26px -5px rgba(0, 0, 0, 0.55), inset 0 -1px 0 0 rgba(217, 160, 91, 0.2)',
        'elev-card-right': '6px 24px 42px -10px rgba(0, 0, 0, 0.65), 3px 12px 18px -4px rgba(0, 0, 0, 0.45), inset 0 -1px 0 0 rgba(217, 160, 91, 0.12)',
        'elev-card-left': '-6px 24px 42px -10px rgba(0, 0, 0, 0.65), -3px 12px 18px -4px rgba(0, 0, 0, 0.45), inset 0 -1px 0 0 rgba(217, 160, 91, 0.12)',
        'elev-card-center': '0 24px 44px -8px rgba(0, 0, 0, 0.7), 0 12px 20px -4px rgba(0, 0, 0, 0.45), inset 0 -1px 0 0 rgba(217, 160, 91, 0.14)',
        'elev-lift': '0 32px 64px -12px rgba(0, 0, 0, 0.82), 0 16px 28px -6px rgba(0, 0, 0, 0.58), inset 0 -1px 0 0 rgba(217, 160, 91, 0.24)',
        'elev-mobile': '0 8px 18px -4px rgba(0, 0, 0, 0.5), inset 0 -1px 0 0 rgba(217, 160, 91, 0.08)',
      },
    },
  },
  plugins: [],
}
