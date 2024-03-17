/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        jacqueFrancois: ["Jacques Francois", "sans-serif"],
        imperialScript: ["Imperial Script", "sans-serif"],
        notoSerifKr: ['"Noto Serif KR"', "serif"],
      },
      backgroundImage: {
        "hero-bg": "url('/bg-img.png')",
      },
      colors: {
        primary: "#81764B",
        secondary: "#988F72",
        beige: "#FAEBD7",
      },
    },
  },
  darkMode: "class",
  plugins: [require("tw-elements-react/dist/plugin.cjs")],
};
