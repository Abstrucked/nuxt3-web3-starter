<script lang="ts" setup>
import {ethers} from 'ethers'
// import {formatAddress} from "~/utils/address";
import {useOnboard} from '@web3-onboard/vue'
import type {EIP1193Provider} from "@web3-onboard/core";
import {asyncComputed} from "@vueuse/core";
const {chain} = useEnv()

const {connectWallet, disconnectConnectedWallet, connectedWallet} = useOnboard()

const connect = async () => {
  await connectWallet()
}

const {toast} = useToast()
const {isConnected, address} = useWallet()
// const connectedAddress = computed(() => connectedWallet.value?.accounts[0].address as string)
// const isConnected = computed(() => ethers.isAddress(connectedAddress.value as string))


watch(isConnected, (value) => {
  if (value) {

    console.log("Connected Wallet: ", connectedWallet.value)
    const provider = connectedWallet.value?.provider as EIP1193Provider

    console.log("Provider: ", provider)

    provider.on('accountsChanged', (accounts: string[]) => {
      console.log("Accounts Changed: ", accounts)
    })

  }
})


</script>

<template>
  <div>
    <UButton v-if="!isConnected" @click="connect">Connect</UButton>
    <UContainer v-else>
      <div class="flex flex-col md:flex-row items-center md:gap-3">
        <div class="text-sm mr-1">{{ formatAddress(address) }}</div>
        <UButton @click="disconnectConnectedWallet">Disconnect</UButton>
      </div>
    </UContainer>
  </div>
</template>

<style scoped></style>
