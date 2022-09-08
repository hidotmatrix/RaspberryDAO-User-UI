import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, midnightTheme } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const godwokenChain = {
  id: 71402,
  name: 'Godwoken',
  network: 'Godwoken',
  iconUrl: 'https://www.nervos.org/wp-content/uploads/2021/11/godwokenlive-810x456.png',
  iconBackground: '#000',
  rpcUrls: {
    default: 'https://v1.mainnet.godwoken.io/rpc'
  },
  nativeCurrency: {
    decimals: 18,
    name: 'Godwoken',
    symbol: 'CKB',
  },
  blockExplorers: {
    default:{name:'GodWoken', url:'https://v1.gwscan.com/'}
  },
  testnet: false
}

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.mainnet,
    chain.polygon,
    chain.optimism,
    chain.arbitrum,
    godwokenChain,
    ...(process.env.REACT_APP_ENABLE_TESTNETS === 'true'
      ? [chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten]
      : []),
  ],
  [
    alchemyProvider({ apiKey: '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC' }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit demo',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={midnightTheme({
        accentColor: '#4D3BCE',
        accentColorForeground: 'white',
        borderRadius: 'medium',
        fontStack: 'rounded',
        overlayBlur: 'small',
      })} coolMode>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
