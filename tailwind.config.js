
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
        purple: {
          light: '#D6BCFA',
          DEFAULT: '#9b87f5',
          dark: '#7E69AB',
        },
        dark: '#1A1F2C',
        blue: {
          bright: '#1EAEDB',
        },
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'form': '0 4px 20px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        'custom': '25px 1px 25px 25px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'auth-pattern': "url('data:image/svg+xml,%3Csvg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z\" fill=\"rgba(200,200,200,0.15)\"%3E%3C/path%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
}
