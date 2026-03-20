/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wood: {
          light: '#a1662f',
          DEFAULT: '#704214',
          dark: '#4a2b0d'
        },
        parchment: '#f0e6d2'
      },
      fontFamily: {
        medieval: ['"Cinzel"', 'serif'], // We will import this in CSS
        casual: ['"Nunito"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}