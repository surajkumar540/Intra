/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  fontFamily: {
    poppins: ["Poppins", "sans-serif"],
    openSans: ["Open Sans", "sans-serif"],
    "dm-sans": ["DM Sans", "sans-serif"],
  },
  theme: {
    extend: {
      colors: {
        primary: "#FE697D", // Your custom pinkish red
      },
      // backgground gradient
      backgroundImage: {
        'dual-gradient': `linear-gradient(0deg, #000000, #000000), linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 100%)`,
      },
    },
  },
  plugins: [],
};
