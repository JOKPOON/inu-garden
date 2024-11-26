import { _purple } from "#tailwind-config/theme/accentColor";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  exposeConfig: true,
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    fontFamily: {},
    extend: {
      colors: {
        "orange-primary": "#F04E23",
        "yellow-primary": "#FEC232",
        "yellow-secondary": "#F8D600",
        "black-primary": "#161616",
        "grey-primary": "#929292",
        "grey-secondary": "#D8D8D8",
      },
      screens: {
        xs: "400px",
      },
      height: {
        "half-screen": "50vh",
        "d-screen": ["100vh", "100dvh"],
      },
      width: {
        "half-screen": "50vw",
        "d-screen": ["100vw", "100dvw"],
      },
      zIndex: {
        99: "99",
        1: "1",
        "-1": "-1",
        "-99": "-99",
      },
      boxShadow: {
        under: "0 0 10px 1px rgba(0,0,15,0.1)",
        "under-xl": "0 0 25px 3px rgba(0,0,15,0.1)",
      },
      gridTemplateRows: {
        15: "repeat(15, minmax(0, 1fr))",
      },
      gridRow: {
        "span-7": "span 7 / span 7",
        "span-8": "span 8 / span 8",
        "span-9": "span 9 / span 9",
        "span-10": "span 10 / span 10",
        "span-11": "span 11 / span 11",
        "span-12": "span 12 / span 12",
        "span-13": "span 13 / span 13",
        "span-14": "span 14 / span 14",
        "span-15": "span 15 / span 15",
      },
      gridRowStart: {
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        14: "14",
        15: "15",
      },
      gridTemplateColumns: {
        15: "repeat(15, minmax(0, 1fr))",
        30: "repeat(30, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-13": "span 13 / span 13",
        "span-14": "span 14 / span 14",
        "span-15": "span 15 / span 15",
        "span-30": "span 30 / span 30",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        88: "22rem",
      },
      fontSize: {
        "2xs": "0.625rem",
        "3xs": "0.5rem",
        "4xs": "0.375rem",
      },
    },
  },
};
