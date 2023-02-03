module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        athiti: ["var(--athiti-font)", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
