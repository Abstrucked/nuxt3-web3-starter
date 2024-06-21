<script setup lang="ts">
import {ethers} from "ethers";
import {asyncComputed} from "@vueuse/core";

/**
 * @dev notification composable setup
 */
const toast = useToast();

/**
 * @dev environment composable setup
 */
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
import {useOnboard} from "@web3-onboard/vue";
import Section from "~/components/common/Section.vue";
const {connectedWallet} = useOnboard();
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
    const tx = await eth.contract.connect(signer).mint(state.mintAmount, {value: cost})
    await tx.wait()
    toast.clear()
    toast.add({
      id: 'success',
      ui: {
        background: 'bg-gray-800 dark:bg-gray-800'
      },
      color: 'green',
      title: 'Minted',
      description: `Your NFT has been minted successfully.`,
      icon: 'i-octicon-check-24',
      timeout: 5000,
    });
    state.isMinting = false;
  } catch (e) {
    console.error(e);
    toast.clear();
    toast.add({
      id: 'error',
      color: 'red',
      title: 'Error minting',
      description: `There was an error minting your NFT. Please try again.`,
      icon: 'i-octicon-alert-24',
      timeout: 5000,
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
  await provider.request({method: 'eth_chainId'}).then((_chainId: string) => {
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
      color: 'yellow',
      timeout: 60000,
      actions: [
        {
          label: 'Switch',
          onClick: () => {
            const provider = connectedWallet.value?.provider as ethers.Eip1193Provider
            provider.request({method: 'wallet_switchEthereumChain', params: [{chainId: chain.id}]}).then(() => {
              toast.add({
                title: 'Chain Switched',
                description: `Switched to ${chain.label}`,
                color: 'green',
                timeout: 5000,
              })
            }).catch((error) => {
              toast.add({
                title: 'Chain Switch Failed',
                description: `Failed to switch to ${chain.label}`,
                color: 'red',
                timeout: 5000,
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
     <Section variant="ring">
       <h2>Mint</h2>
       <UFormGroup label="Amount" hint="Max 10 Items">
       <UForm :state="state" class="space-y-4">
         <UInput v-model="state.mintAmount"  label="Amount" :disabled="state.isMinting"/>
         <UButton @click="mint" :loading="state.isMinting" :disabled="!isConnected || !isChainCorrect">Mint</UButton>
       </UForm>
       </UFormGroup>
     </Section>
    </ClientOnly>
  </UContainer>
</template>

<style scoped></style>
