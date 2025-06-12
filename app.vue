<script setup lang="ts">
import { init } from '@web3-onboard/vue'
import type { AppMetadata } from "@web3-onboard/common";
import injectedModule from '@web3-onboard/injected-wallets'
import coinbaseWallet from '@web3-onboard/coinbase';
import { hychain, hychainTestnet } from "~/web3/chains";
import type { OnboardAPI } from "@web3-onboard/core";

const injected = injectedModule()
const coinbase = coinbaseWallet()

const web3Onboard = ref<null | OnboardAPI>(null)

const appMetadata: AppMetadata = {
  name: 'Project Name',
  description: 'Project Description',
}

web3Onboard.value = init({
  wallets: [injected, coinbase],
  chains: [hychain, hychainTestnet],
  appMetadata: appMetadata,
  theme: 'dark',
  connect: {
    autoConnectLastWallet: true,
    showSidebar: false,
    removeWhereIsMyWalletWarning: true
  }
})

useServerSeoMeta({
  title: "Web3 starter",
  description: "built with Nuxt3, NuxtUI-v3, ethersjs",
  author: "abstrucked.eth"
})

useServerHead({
  bodyAttrs: {
    class: "font-mono"
  }
})

</script>
<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style scoped></style>
