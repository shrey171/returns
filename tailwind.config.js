/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        main: "400px 1fr",
        amount: "2fr 100px",
      },
      minWidth: {
        screen: "100vw",
      },
      minHeight: {
        screen: "100vh",
      },
      colors: {
        accent: "#007bff",
        error: "#D32F2F",
        gross: '#008080',
        invested: '#B0B0B0',
        light: "#FAF9F6",
        net: "#4682B4",
        "dark-gray": "#333333",
      },
    },
  },
  plugins: [],
};
