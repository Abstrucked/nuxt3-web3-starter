import { useOnboard} from "@web3-onboard/vue";
import {ethers} from "ethers";
import {asyncComputed} from "@vueuse/core";

export const useWallet = () => {
  const {connectedWallet} = useOnboard();
  return {
    isConnected: computed(() => {
      return !!connectedWallet.value?.accounts[0].address ;
    }),
    address: computed(() => {
      return connectedWallet.value?.accounts[0].address;
    }),
    getSigner: async () => {
      try {
        if (!connectedWallet.value) throw new Error('No connected wallet');
        const walletProvider = connectedWallet.value?.provider as ethers.Eip1193Provider;
        const chain = connectedWallet.value?.chains[0].id;
        const browserProvider =  new ethers.BrowserProvider(walletProvider, parseInt(chain));
        console.log("browserProvider", browserProvider)
        return new ethers.JsonRpcSigner(browserProvider, connectedWallet.value.accounts[0].address as string) as ethers.JsonRpcSigner
      }catch (e) {
        console.error(e)
      }
    }

  }
}