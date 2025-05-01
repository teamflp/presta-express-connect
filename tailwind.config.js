
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C63E46',
          hover: '#b73840',
          light: '#f8d7da',
        },
        secondary: '#343a40',
        background: '#FDFAF7',
        light: '#f8f9fa',
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'custom': '25px 1px 25px 25px',
      },
    },
  },
  plugins: [],
}
