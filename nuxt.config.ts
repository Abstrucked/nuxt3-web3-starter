// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/image", "@nuxt/fonts"],
  colorMode: {
    preference: 'dark',
  },
  css: ["@/assets/css/global.css"],
  ui: {
    colorMode: true,
    theme: {
      colors: ["primary", "secondary", "success", "neutral", "error", "warning", "orchid"]
    }
  },
  runtimeConfig: {
    public: {
      testnetContract: process.env.NUXT_TESTNET_CONTRACT,
      contract: process.env.NUXT_CONTRACT,
      env: process.env.NUXT_NODE_ENV,
    }
  }
})