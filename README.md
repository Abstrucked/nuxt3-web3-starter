# Nuxt Web3 Starter
A Nuxt3 starter template with web3 integration.
This template is based on the [Nuxt UI](https://ui.nuxt.com) template.

- _Look at [Nuxt docs](https://nuxt.com/docs/getting-started/introduction) and [Nuxt UI docs](https://ui.nuxt.com) to learn more._

## Features
- [x] Wallet connection with [web3Onboard](https://onboard.blocknative.com/docs/overview/introduction#features) by **blocknative**
- [x] Minimal custom EthereumClient implementation, ready for expansion
- [x] Dark/Light mode switch
- [x] Minimalistic design with [Tailwind CSS](https://tailwindcss.com)
- [x] Responsive menu
- [x] Media queries composable for mobile, tablet and desktop
- [ ] Event logging
- [x] Contract interaction methods
- [x] Basic ERC721 ABI
- [x] Notifications
### Default Wallets
- [x] Injected
- [x] Coinbase Wallet
- [x] MetaMask

_For different wallets support please refer to the **web3Onboard** documentation_

## Environment Variables
The following environment variables are required to be set in a `.env` file in the root of the project:
```dotenv
NUXT_TESTNET_CONTRACT= #ADD YOUR TESTNET CONTRACT ADDRESS
NUXT_MAINNET_CONTRACT= #ADD YOUR MAINNET CONTRACT ADDRESS
NUX_ENV= #ADD YOUR ENVIRONMENT (production, development)
```
- _The contract addresses are used to interact with the contract on the respective networks_
- _The environment variable is used to determine the network to interact with_


## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
