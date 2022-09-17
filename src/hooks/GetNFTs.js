// import { Alchemy, Network } from "alchemy-sdk";
// import { chain, createClient, WagmiProvider } from "wagmi";
// import {
//   ETH_MAINNET_ALCHEMY_CONFIG,
//   POLYGON_MAINNET_ALCHEMY_CONFIG,
//   POLYGON_TESTNET_ALCHEMY_CONFIG,
//   RINKBEY_TESTNET_ALCHEMY_CONFIG,
// } from "./config/config";

// const GetNFTs = async (addr, chain) => {
//   console.log("Address: ", addr, chain);
//   let config;
//   switch (chain) {
//     case "homestead":
//       config = ETH_MAINNET_ALCHEMY_CONFIG();
//       break;
//     case "matic":
//       config = POLYGON_MAINNET_ALCHEMY_CONFIG();
//       break;
//     case "rinkeby":
//       config = RINKBEY_TESTNET_ALCHEMY_CONFIG();
//       break;
//     case "maticmum":
//       config = POLYGON_TESTNET_ALCHEMY_CONFIG();
//       break;
//   }
//   console.log("Config", config);
//   const alchemy = new Alchemy(config);
//   const userNFTs = await alchemy.nft.getNftsForOwner(addr);

//   return "";
// };

// export default GetNFTs;
