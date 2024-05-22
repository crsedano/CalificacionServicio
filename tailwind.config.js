/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html','./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
   
    extend: {
      backgroundImage:{
        'campus': "url('/src/assets/Fondo01.jpg')",
      }
    }
  },
  plugins: []
}
