/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shake: {
          "10%, 90%": { transform: "translate3d(-1px, 0, 0)" },
          "20%, 80%": { transform: "translate3d(2px, 0, 0)" },
          "30%, 50%, 70%": { transform: "translate3d(-4px, 0, 0)" },
          "40%, 60%": { transform: "translate3d(4px, 0, 0)" },
        },
        "dialog-in": {
          "0%": { opacity: 0, transform: "scale(0.9)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        "dialog-out": {
          "0%": { opacity: 1, transform: "scale(1)" },
          "100%": { opacity: 0, transform: "scale(0.9)" },
        },
        grow: {
          "0%": { transform: "translateX(100%) scaleX(0)" },
          "100%": { transform: "translateX(0) scaleX(1)" },
        },
        shrink: {
          "0%": { transform: "translateX(0) scaleX(1)" },
          "100%": { transform: "translateX(100%) scaleX(0)" },
        },
      },
      animation: {
        shaking: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
        "dialog-in": "dialog-in 0.3s ease-out forwards",
        "dialog-out": "dialog-out 0.3s ease-out forwards",
        grow: "grow 0.4s forwards",
        shrink: "shrink 0.4s forwards",
      },
    },
  },
  plugins: [],
};
