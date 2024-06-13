/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{pug,html}"],
  theme: {
    extend: {
      gridTemplateRows: {
        layout: '3fr 1fr 1fr'
      },
      cards: {
        card: 'border-zinc-300 border-2 rounded-lg p-2'
      }
    },
  },
  plugins: [],
}

