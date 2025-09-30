import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#03050C"
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [{
      mytheme: {
        "primary": "#4a6b38",
        "secondary": "#a6c856",
        "accent": "#bd4749",
        "neutral": "#fbfbfe",
      },
    }],
  },
}