/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        main: '400px 1fr',
        amount: '2fr 100px'
      },
      minWidth: {
        'screen': '100vw',
      },
      minHeight: {
        'screen': '100vh',
      },
      colors: {
        'light': '#FAF9F6',
        'error': '#D32F2F',
      },
    },
  },
  plugins: [],
};
