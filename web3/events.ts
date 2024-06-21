import EthereumClient from './ethClient';

/**
 * Gets raw Transfers event logs
 * @param contractAddress
 * @param rpcUrl
 * @param contractABI
 * @param fromBlock
 * @param toBlock
 */
export const getTransferEvents = async (contractAddress: string, rpcUrl: string, contractABI: any, fromBlock: number, toBlock: number | string) => {
  const client = new EthereumClient(contractAddress, rpcUrl, contractABI)
  return await client.contract.queryFilter(client.contract.filters.Transfer(), fromBlock, toBlock)
}


