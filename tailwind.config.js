/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'campus': 'url("/src/assets/pderecho.webp")',
      }
    }
  },
  plugins: []
}
