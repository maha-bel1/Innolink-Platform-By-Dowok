// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'c-1': '#e7e2f3',
        'c-2': '#a7b2e6',
        'c-3': '#688cca',
        'c-4': '#496d9c',
        'c-5': '#2d3c67',
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
}