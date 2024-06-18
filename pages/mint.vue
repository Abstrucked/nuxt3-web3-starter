<script setup lang="ts">
import {ethers} from "ethers";

/**
 * @dev environment composable setup
 */
import {useEnv} from "~/composables/useEnv";

const {chain, contract} = useEnv();

/**
 * @dev form reactive state setup
 */
const state = reactive({
  mintAmount: 1,
  isMinting: false
});

/**
 * @dev EthereumClient setup
 */
import abi from "@/assets/abi.json"
import EthereumClient from "~/web3/EthereumClient";

const eth = new EthereumClient(contract, chain.rpcUrl, chain.id, abi);

/**
 * @dev wallet composable
 */
import {useWallet} from "~/composables/useWallet";

const {isConnected, getSigner} = useWallet();

/**
 * @dev mint function setup
 */
// calculate the cost of minting
const cost = BigInt(state.mintAmount) * await eth.contract.price();
// mint function
const mint = async () => {
  state.isMinting = true;
  try {
    const signer: ethers.JsonRpcSigner = await getSigner() as ethers.JsonRpcSigner;
    const tx = await eth.contract.connect(signer).mint(state.mintAmount, {value: cost});
    await tx.wait();
  } catch (e) {
    console.error(e);
  }
  state.isMinting = false;
}

</script>
<template>
  <UContainer>
    <ClientOnly>
      <h1>Mint</h1>
      <UForm :state="state">
        <UInput v-model="state.mintAmount" label="Amount" :disabled="state.isMinting"/>
        <UButton @click="mint" :loading="state.isMinting" :disabled="!isConnected">Mint</UButton>
      </UForm>
    </ClientOnly>
  </UContainer>
</template>

<style scoped></style>
