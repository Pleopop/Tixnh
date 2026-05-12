/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tinh: {
          cream: "#faf8f5",
          ink: "#2c2a26",
          muted: "#6b6560",
          sage: "#8a9a8f",
          sageDeep: "#5c6b62",
          dusk: "#c4b8a8",
          paper: "#f3efe8",
        },
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};
