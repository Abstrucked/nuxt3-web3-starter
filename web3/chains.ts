
declare type Chain = {
  id: string,
  token: string,
  label: string,
  rpcUrl: string
  intId?: number
}

export const ethereum: Chain = {
  id: '0x1',
  intId: 1,
  token: 'ETH',
  label: 'Ethereum',
  rpcUrl: "https://eth.llamarpc.com"
}

export const hychain: Chain = {
  id: '0xb5f',
  token: 'TOPIA',
  label: 'Hychain',
  rpcUrl: "https://rpc.hychain.com/http"
}

export const hychainTestnet: Chain = {
  id: '0x71b8',
  token: 'TOPIA',
  label: 'Hychain Testnet',
  rpcUrl: 'https://testnet-rpc.hychain.com/http'
}