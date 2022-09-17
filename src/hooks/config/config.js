import { Network } from "alchemy-sdk";

export const ETH_MAINNET_ALCHEMY_CONFIG = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

export const RINKBEY_TESTNET_ALCHEMY_CONFIG = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_RINKEBY,
};

export const POLYGON_MAINNET_ALCHEMY_CONFIG = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET,
};

export const POLYGON_TESTNET_ALCHEMY_CONFIG = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MUMBAI,
};
