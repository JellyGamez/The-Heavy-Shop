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
        'yellow-primary' : '#EAB308',

        'red-primary'    : '#C70404',
        'red-dark'       : '#990000',
        'red-light'      : '#FB4242',
        
        'gray-primary'   : '#262626',
        'gray-dark'      : '#171717',
        'gray-light'     : '#303030',
        'gray-lighter'   : '#474747',
        'gray-lightest'  : '#A3A3A3',
        
      },
      maxWidth: {
        '8xl' : '90rem',
        '9xl' : '110rem',
      },
      fontFamily: {
        'kanit'  : ['Kanit'],
        'ubuntu' : ['Ubuntu'],
      }
    },
  },
  plugins: [],
}
