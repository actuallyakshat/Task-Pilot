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
        heroLight: "url('/src/assets/images/bg-light.webp')",
        heroDark: "url('/src/assets/images/bg-dark.webp')"
      },
      colors: {
        light: "#FFFFFF",
        dark: "#000000",
      },
    },
  },
  plugins: [],
};
