import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Backdrop from '../Backdrop/Backdrop';
import styles from './Popup.module.css';
import cross from '../../images/Cross.svg';
import Catalogue from '../SwapCatalogue/SwapCatalogue';
import { useAccount, useNetwork, useSwitchNetwork, useProvider, useContract } from "wagmi";
import { Alchemy, Network } from "alchemy-sdk";
import axios from "axios";
import GodwokenNFTs from "../../ABIs/GodwokenNFTs.json";
import { BsWallet2 } from 'react-icons/bs'
import { ThemeContext } from "../../App";

function Popup(props) {
    const [chainConfig, setConfig] = useState(null);
    const [alchemy, setAlchemy] = useState(null);
    const [userNFTs, setUserNFTs] = useState([]);
    const { chain } = useNetwork();
    const themes = useContext(ThemeContext);
    const { theme } = themes;

  const provider = useProvider();
  const contract = useContract({
    addressOrName: "0x999680d5E06bda9b917b345123344A8D70c6d289",
    contractInterface: GodwokenNFTs.abi,
    signerOrProvider: provider,
  });

    const { address,connector, isConnected } = useAccount();
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
              case "Godwoken Testnet":
                config = {};
                break;
            }
    
            try {
              if (chain.network === "Godwoken Testnet") {
                const bal = await contract.balanceOf(
                  "0x5d1d0b1d5790b1c88cc1e94366d3b242991dc05d"
                );
                const metadataURIs = [];
                const itemArray = [];
                for (var i = 0; i < bal; i++) {
                  const tokenId = await contract.tokenOfOwnerByIndex(
                    "0x5d1d0b1d5790b1c88cc1e94366d3b242991dc05d",
                    i
                  );
                  console.log(`At ${i} = ${tokenId.toString()}`);
                  const metadata_uri = await contract.tokenURI(tokenId.toString());
                  metadataURIs.push(metadata_uri);
                  console.log(`Metatdata = ${metadata_uri}`);
    
                  const rawUri = `ipfs://QmVbZhfYHDyttyPjHQokVHVPYe7Bd5RdUrhxHoE6QimyYs/${tokenId.toString()}`;
                  const Uri = Promise.resolve(rawUri);
                  const owner = "0x5d1d0b1d5790b1c88cc1e94366d3b242991dc05d";
    
                  const getUri = Uri.then((value) => {
                    let str = value;
                    let cleanUri = str.replace(
                      "ipfs://",
                      "https://gateway.pinata.cloud/ipfs/"
                    );
                    let metadata = axios.get(cleanUri).catch(function (error) {
                      console.log(error.toJSON());
                    });
                    return metadata;
                  });
    
                  getUri.then((value) => {
                    let rawImg = value.data.image;
                    var name = value.data.name;
                    var desc = value.data.description;
                    let image = rawImg.replace(
                      "ipfs://",
                      "https://gateway.pinata.cloud/ipfs/"
                    );
                    Promise.resolve(owner).then((value) => {
                      let ownerW = value;
                      let meta = {
                        title: name,
                        image: image,
                        tokenId: tokenId.toString(),
                        wallet: ownerW,
                        description: desc,
                        balance:1,
                        contract:{address:"0x999680d5E06bda9b917b345123344A8D70c6d289"},
                        tokenUri:{gateway:metadata_uri}
                      };
                      itemArray.push(meta);
                    });
                  });
                }
                await new Promise((r) => setTimeout(r, 5000));
                setUserNFTs(itemArray);
              } else {
                const alchemy = new Alchemy(config);
                
                // Get all NFTs
                const nfts = await alchemy.nft.getNftsForOwner(address);
                setUserNFTs(nfts["ownedNfts"]);
    
                // Parse output
                const numNfts = nfts["totalCount"];
                const nftList = nfts["ownedNfts"];
    
              }
            } catch (error) {}
          }
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
                                <Catalogue key ={index} setSwap={props.setSwap} setOpen={props.setOpen} nft={nft} selected={props.selected} setSelected={props.setSelected} setIndex={props.setIndex} index={index}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Popup