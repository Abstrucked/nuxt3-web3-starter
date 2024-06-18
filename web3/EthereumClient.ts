import { ethers } from 'ethers'
import abi from '@/assets/abi.json'
declare interface IEthereumClient {
  provider: ethers.JsonRpcProvider
  contract: ethers.Contract
}

/**
 * EthereumClient
 * @param contractAddress - The contract address
 * @param rpcUrl - The RPC URL
 * @param chainId - The chain ID
 * @param contractABI - The contract ABI
 * @returns {IEthereumClient}
 */
export default class EthereumClient implements IEthereumClient{
  provider: ethers.JsonRpcProvider
  contract: ethers.Contract

  constructor(contractAddress: string, rpcUrl: string, chainId: number|string, contractABI: any = abi) {
    if(typeof chainId !== 'number') {
      chainId = parseInt(chainId)
    }
    this.provider = new ethers.JsonRpcProvider(rpcUrl, chainId)
    this.contract = new ethers.Contract(contractAddress, contractABI, this.provider)

  }

  // @dev: can add contract calls here if preferred

}
