
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C63E46',
        secondary: '#213547',
        accent: '#f0e4e5',
      },
    },
  },
  plugins: [],
}
