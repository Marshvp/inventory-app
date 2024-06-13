/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{pug,html}"],
  theme: {
    extend: {
      gridTemplateRows: {
        layout: '3fr 1fr 1fr'
      }
    },
  },
  plugins: [],
}

