/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          from: {
            opacity:0,
          },
          to: {
            opacity:1,
          },
        },
      },
      animation: {
        'fade': 'fadeIn 1s ease-in-out',
      },
      fontFamily: {
        'jockey-one': ['Jockey One', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
