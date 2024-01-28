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
        heroDark: "url('/src/assets/images/bg-dark.webp')",
      },
      colors: {
        light: "#FFFFFF",
        dark: "#000000",
      },
      animation: {
        alertModal: "contentShow 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        contentShow: {
          "0%": {
            opacity: 0,
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%, -50%) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
