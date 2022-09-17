import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Backdrop from '../Backdrop/Backdrop';
import styles from './Popup.module.css';
import cross from '../../images/Cross.svg';
import Catalogue from '../SwapCatalogue/SwapCatalogue';
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { Alchemy, Network } from "alchemy-sdk";
import { BsWallet2 } from 'react-icons/bs'
import { ThemeContext } from "../../App";

function Popup(props) {
    const [provider, setProvider] = useState(null);
    const [chainConfig, setConfig] = useState(null);
    const [alchemy, setAlchemy] = useState(null);
    const [userNFTs, setUserNFTs] = useState([]);
    const { chain } = useNetwork();
    const themes = useContext(ThemeContext);
    const { theme } = themes;

    const { connector, isConnected } = useAccount();
    console.log("isConnected", isConnected);
    useEffect(() => {
        async function fetchData() {
            let config;
            if (chain) {
                switch (chain.network) {
                    case "homestead":
                        config = {
                            apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
                            network: Network.ETH_MAINNET,
                        };
                        break;
                    case "matic":
                        config = {
                            apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
                            network: Network.MATIC_MAINNET,
                        };
                        break;
                    case "rinkeby":
                        config = {
                            apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
                            network: Network.ETH_RINKEBY,
                        };
                        break;
                    case "maticmum":
                        config = {
                            apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
                            network: Network.MATIC_MUMBAI,
                        };
                        break;
                }
                const alchemy = new Alchemy(config);
                // Wallet address
                const address = "elanhalpern.eth"; // static address

                // Get all NFTs
                const nfts = await alchemy.nft.getNftsForOwner(address);
                setUserNFTs(nfts["ownedNfts"]);

                // Parse output
                const numNfts = nfts["totalCount"];
                const nftList = nfts["ownedNfts"];

                console.log(`Total NFTs owned by ${address}: ${numNfts} \n`);

                let i = 1;

                for (let nft of nftList) {
                    console.log(`${i}. ${nft.title}`);
                    i++;
                }
            }

            setConfig(config);
            console.log("Chain", chain);
            console.log("useEffect called");
        }
        fetchData();
    }, [chain, userNFTs]);
    return (
        <>
            <Backdrop show={props.show} switch={props.switch} />
            <div className={styles.popup}>
                <div className={styles.cross}>
                    <img src={cross} alt="" onClick={props.switch}></img>
                </div>
                <div className={styles.catalogues}>
                    <div className={styles.nfts}>
                        {userNFTs.map((nft,index) => {
                            return (
                                <Catalogue setSwap={props.setSwap} setOpen={props.setOpen} nft={nft} selected={props.selected} setSelected={props.setSelected} setIndex={props.setIndex} index={index}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Popup