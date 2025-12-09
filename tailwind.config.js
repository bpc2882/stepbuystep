/** @type {import('tailwindcss').Config} */
const { COLORS, RADII, SHADOWS } = require("./src/theme/tokens");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "ui-sans-serif", "system-ui"],
      },
        colors: {
          'sbs-textBase': COLORS.textBase,
          'sbs-brandCopper': COLORS.brandCopper,
          'sbs-brandAmber': COLORS.brandAmber,
          'sbs-bg': '#f9f6f1', // add your intended page background colour
        },
      borderRadius: RADII, // use rounded-default
      boxShadow: SHADOWS,  // use shadow-strong
    },
  },
  plugins: [],
};
