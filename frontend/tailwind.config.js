/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Clash Display", "system-ui", "sans-serif"],
        inter: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

