<script setup lang="ts">
import { ethers } from "ethers";
import { asyncComputed } from "@vueuse/core";

/**
 * @dev notification composable setup
 */
const toast = useToast();

/**
 * @dev environment composable setup
 */
const { chain, contract } = useEnv();

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
import { useOnboard } from "@web3-onboard/vue";
import Section from "~/components/common/Section.vue";
const { connectedWallet } = useOnboard();
const { isConnected, getSigner } = useWallet();

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
    const tx = await eth.contract.connect(signer).mint(state.mintAmount, { value: cost })
    await tx.wait()
    toast.clear()
    toast.add({
      id: 'success',
      ui: {
        root: 'bg-gray-800 dark:bg-gray-800'
      },
      color: 'success',
      title: 'Minted',
      description: `Your NFT has been minted successfully.`,
      icon: 'i-octicon-check-24',
      duration: 5000,
    });
    state.isMinting = false;
  } catch (e) {
    console.error(e);
    toast.clear();
    toast.add({
      id: 'error',
      color: 'error',
      title: 'Error minting',
      description: `There was an error minting your NFT. Please try again.`,
      icon: 'i-octicon-alert-24',
      duration: 5000,
    });
  }
  state.isMinting = false;
}

/**
 * @dev check if chain is correct.
 */
const isChainCorrect = asyncComputed(async () => {
  const provider = connectedWallet.value?.provider as ethers.Eip1193Provider
  let check = false
  await provider.request({ method: 'eth_chainId' }).then((_chainId: string) => {
    console.log("Chain ID: ", _chainId,)
    check = _chainId === chain.id
  })
  return check
})

/**
 * @dev watch for chain change and change-action on notification.
 */
watch(() => isChainCorrect.value, (val) => {
  console.log("ChainCorrect::", val)
  if (!val) {
    toast.add({
      title: 'Wrong Chain',
      description: `Please switch to ${chain.label}`,
      color: 'warning',
      duration: 60000,
      actions: [
        {
          label: 'Switch',
          onClick: () => {
            const provider = connectedWallet.value?.provider as ethers.Eip1193Provider
            provider.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chain.id }] }).then(() => {
              toast.add({
                title: 'Chain Switched',
                description: `Switched to ${chain.label}`,
                color: 'success',
                duration: 5000,
              })
            }).catch((error) => {
              toast.add({
                title: 'Chain Switch Failed',
                description: `Failed to switch to ${chain.label}`,
                color: 'error',
                duration: 5000,
              })
            })
          }
        }
      ]
    })
  } else {
    toast.remove('Wrong Chain')
  }
})
</script>
<template>
  <UContainer>
    <ClientOnly>
      <Section variant="none">
        <div class=" mx-auto max-w-md rounded-lg p-4 ring-2 ring-gray-200 dark:ring-gray-800">
          <h2>Mint</h2>
          <UForm :state="state" class="space-y-4">
            <UFormField title="Amount of items" label="Amount of items">

              <UInput v-model="state.mintAmount" label="Amount" :disabled="state.isMinting" />
            </UFormField>
            <UButton @click="mint" :loading="state.isMinting" :disabled="!isConnected || !isChainCorrect">Mint</UButton>
          </UForm>
        </div>
      </Section>
    </ClientOnly>
  </UContainer>
</template>

<style scoped></style>
