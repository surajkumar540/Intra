import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  fontFamily: {
    poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
  },
  theme: {
    extend: {
      colors: {
        primary: '#FE697D', // Your custom pinkish red
      },
    },
  },
  plugins: [],
}

