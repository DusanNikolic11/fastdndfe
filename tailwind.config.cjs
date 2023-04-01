/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: {
          light: "#F3DCBE",
          dark: "#DBB875",
        },
        brown: "#412616",
      },
    },
  },
  plugins: [],
};
