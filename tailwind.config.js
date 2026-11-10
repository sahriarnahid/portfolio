/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        'xs': '2px',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}

