module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        athiti: ["Athiti", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
