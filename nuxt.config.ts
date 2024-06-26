// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/image"],
  colorMode: {
    preference: 'dark',
  },
  tailwindcss: {
    cssPath: '~/assets/global.css',
  },
  runtimeConfig: {
    public: {
      testnetContract: process.env.NUXT_TESTNET_CONTRACT,
      contract: process.env.NUXT_CONTRACT,
      env: process.env.NUXT_NODE_ENV,
    }
  }
})