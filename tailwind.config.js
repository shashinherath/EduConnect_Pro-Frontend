/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 5s ease-in-out forwards",
        wave1: "wave 1.3s linear infinite",
        wave2: "wave 1.3s linear infinite -1.1s",
        wave3: "wave 1.3s linear infinite -0.9s",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        wave: {
          "0%, 60%, 100%": { transform: "initial" },
          "30%": { transform: "translateY(-15px)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
