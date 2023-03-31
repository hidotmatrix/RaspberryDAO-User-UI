import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import GodwokenImg from "./images/godwoken-logo-2.svg";

const godwokenMainnetChain = {
  id: 71402,
  name: "Godwoken Mainnet",
  network: "Godwoken",
  iconUrl: GodwokenImg,
  iconBackground: "#000",
  rpcUrls: {
    default: "https://v1.mainnet.godwoken.io/rpc",
  },
  nativeCurrency: {
    decimals: 18,
    name: "Godwoken",
    symbol: "CKB",
  },
  blockExplorers: {
    default: {
      name: "Godwoken Mainnet",
      url: "https://gw-mainnet-explorer.nervosdao.community/",
    },
  },
  testnet: false,
};

const { chains, provider, webSocketProvider } = configureChains(
  [
    // chain.mainnet,
    chain.polygon,
    godwokenMainnetChain,
    // chain.rinkeby,
    //chain.polygonMumbai,
    ...(process.env.REACT_APP_ENABLE_TESTNETS === "true"
      ? [chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten]
      : []),
  ],
  [
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_API_KEY }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit demo",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={midnightTheme({
          accentColor: "#4D3BCE",
          accentColorForeground: "white",
          borderRadius: "medium",
          fontStack: "rounded",
          overlayBlur: "small",
        })}
        coolMode
      >
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
