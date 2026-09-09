/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        university: {
          50: '#f0f5fc',
          100: '#e1eafa',
          200: '#c8daf5',
          300: '#a1c2ee',
          400: '#75a2e4',
          500: '#5483da',
          600: '#4066cc',
          700: '#3553b6',
          800: '#304595',
          900: '#2b3b77',
          950: '#1e264b',
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
