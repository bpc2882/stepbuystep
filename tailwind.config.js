/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",   // adjust if your files live elsewhere
  ],
  theme: { extend: {} },
  safelist: [
    // card gradients (from your data)
    'from-emerald-100','to-emerald-400',
    'from-green-100','to-green-500',
    'from-lime-100','to-lime-400',
    'from-amber-100','to-orange-400',
    'from-yellow-100','to-amber-400',
    'from-orange-100','to-orange-500',
    // section title bars
    'from-emerald-500','via-green-600','to-emerald-700',
    'from-amber-500','via-orange-600','to-amber-700',
    'from-purple-500','via-purple-600','to-purple-700',
    'from-rose-400','via-rose-600','to-rose-800',
  ],
}
