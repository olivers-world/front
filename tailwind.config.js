/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jacqueFrancois: ["Jacques Francois", "sans-serif"],
        imperialScript: ["Imperial Script", "sans-serif"],
        notoSerifKr: ['"Noto Serif KR"', 'serif'],
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
  plugins: [],
};
