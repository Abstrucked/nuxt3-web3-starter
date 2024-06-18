import { ethers } from 'ethers'

declare interface IEthereumClient {
  provider: ethers.JsonRpcProvider
  contract: ethers.Contract
}

export default class EthereumClient implements IEthereumClient{
  provider: ethers.JsonRpcProvider
  contract: ethers.Contract

  constructor(contractAddress: string, rpcUrl: string, contractABI: any = abi) {
    console.log("contractAddress", contractAddress, "rpcUrl", rpcUrl)
    this.provider = new ethers.JsonRpcProvider(rpcUrl)
    this.contract = new ethers.Contract(contractAddress, contractABI, this.provider)
  }

  getSigner = async (address: string) => {
    return new ethers.JsonRpcSigner(this.provider, address)
  }

  browserProvider = async (provider: ethers.Eip1193Provider, chainId: number | string) => {
    return new ethers.BrowserProvider(provider, chainId)
  }
}
