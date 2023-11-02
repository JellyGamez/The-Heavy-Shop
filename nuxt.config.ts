// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true
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
    '@nuxtjs/robots',
    'nuxt-headlessui',
  ],
  headlessui: {
    prefix: 'Headless'
  },
})
