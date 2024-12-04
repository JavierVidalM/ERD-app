/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        borderWidth: {
          1: '1px',
        },
      },
    },
    plugins: [],
    safelist: [
      {
        pattern: /(bg|text)-(red|orange|amber|emerald|sky|blue|violet|rose|pink|lime)-(300|900)/,
      }
    ]
  }