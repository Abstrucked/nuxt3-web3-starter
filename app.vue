<script setup lang="ts">
import Header from "~/components/layout/Header.vue";
import Footer from "~/components/layout/Footer.vue";
import {init} from '@web3-onboard/vue'
import type {AppMetadata} from "@web3-onboard/common";
import injectedModule from '@web3-onboard/injected-wallets'
import coinbaseWallet from '@web3-onboard/coinbase';
import {hychain, hychainTestnet} from "~/web3/chains";
import type {OnboardAPI} from "@web3-onboard/core";

const injected = injectedModule()
const coinbase = coinbaseWallet()

const web3Onboard = ref(null as OnboardAPI)

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
// console.log("web3Onboard", web3Onboard)

</script>
<template>
  <div class="main-layout">
    <Header/>
    <main class="content p-1 md:p-3 lg:p-7 h-80">
      <NuxtPage/>
      <UNotifications/>

    </main>
    <Footer/>
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}
</style>