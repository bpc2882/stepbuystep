/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      // base defaults
      sans: "Inter, ui-sans-serif, system-ui",
      serif: "Merriweather, Georgia, serif",

      // custom presets (note: strings not arrays in v4)
      ecmSans: "Raleway, ui-sans-serif, system-ui",
      ecmSerif: "Crimson Pro, Georgia, serif",

      modernSans: "Work Sans, ui-sans-serif, system-ui",
      modernSerif: "Playfair Display, Georgia, serif",

      plexSans: "IBM Plex Sans, ui-sans-serif, system-ui",
      plexSerif: "IBM Plex Serif, Georgia, serif",

      humanistSans: "Source Sans 3, ui-sans-serif, system-ui",
      humanistSerif: "Lora, Georgia, serif",
    },
  },
};
