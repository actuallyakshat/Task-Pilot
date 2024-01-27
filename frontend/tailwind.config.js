/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Rubik: ["Rubik", "sans-serif"],
      },
      backgroundImage: {
        hero: "url('/src/assets/images/hero.jpg')",
      },
      colors: {
        light: "#EEEDEB",
        dark: "#1B2430",
      },
    },
  },
  plugins: [],
};
