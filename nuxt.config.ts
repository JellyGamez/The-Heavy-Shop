// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true
  },
  build: {
    transpile: ['vue-toastification'],
  },
  googleFonts: {
    families: {
      Kanit: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      Ubuntu: [300, 400, 500, 700]
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
    pageTransition: {
      name: 'page', mode: 'out-in'
    }
  },
  modules: [
    '@sidebase/nuxt-auth',
    'nuxt-headlessui',
    '@vue-email/nuxt',
    '@nuxt/image',
    '@nuxtjs/robots',
    '@nuxtjs/google-fonts'
  ],
})