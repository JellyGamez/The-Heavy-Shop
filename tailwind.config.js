/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        'red-primary': '#c70404',
        'red-dark': '#a60303',
        'gray-primary': '#262626',
        'gray-dark': '#171717'
      },
      maxWidth: {
        '8xl': '90rem',
        '9xl': '100rem',
      }
    },
  },
  plugins: [],
}

