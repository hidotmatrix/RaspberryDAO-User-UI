import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Profile.module.scss";
import Banner from "../../images/Profile/Banner.svg";
import ProfileImg from "../../images/Profile/Profile.svg";
import { FaSearch } from "react-icons/fa";
import Catalogue from "../Catalogue/Catalogue";
import { ThemeContext } from "../../App";
import { useAccount, useNetwork, useContract, useProvider } from "wagmi";
import { Alchemy, Network } from "alchemy-sdk";
import { BsWallet2 } from "react-icons/bs";
import axios from "axios";
import GodwokenNFTs from "../../ABIs/GodwokenNFTs.json";

function Profile() {
  const [chainConfig, setConfig] = useState(null);
  const [GodwokenNFTContract, setGodwokenNFTContract] = useState(null);
  const [alchemy, setAlchemy] = useState(null);
  const [userNFTs, setUserNFTs] = useState([]);
  const { chain } = useNetwork();
  const themes = useContext(ThemeContext);
  const { theme } = themes;

  const { address, isConnected } = useAccount();

  const provider = useProvider();
  const contract = useContract({
    addressOrName: "0x999680d5E06bda9b917b345123344A8D70c6d289",
    contractInterface: GodwokenNFTs.abi,
    signerOrProvider: provider,
  });

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
              const metadata_uri = await contract.tokenURI(tokenId.toString());
              metadataURIs.push(metadata_uri);

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
      <div className={theme === "light" ? styles.light : styles.dark}>
        <div className={styles.profile}>
          <div className={styles.profiledesc}>
            <div className={styles.bannerimage}>
              <img src={Banner} alt="BannerImage"></img>
            </div>
            <div className={styles.profileimage}>
              <img src={ProfileImg} alt="ProfileImage"></img>
            </div>
            <div className={styles.details}>
              <div className={styles.name}>Kane Williamson</div>
              <div className={styles.desc}>Wellington, New Zealand</div>
              <div className={styles.descdetails}>
                NFTs (non-fungible tokens) are unique cryptographic tokens that
                exist on a blockchain and cannot be replicated. "Tokenizing"
                these real-world tangible assets makes buying, selling, and
                trading them more efficient while reducing the probability of
                fraud.
              </div>
            </div>
          </div>
          <div className={styles.assets}>
            <div className={styles.categorybar}>
              <div className={styles.categories}>
                <div className={`${styles.category} ${styles.headcategory}`}>
                  All
                </div>
                <div className={styles.category}>Favourites</div>
                <div className={styles.category}>Category 1</div>
                <div className={styles.category}>Category 2</div>
                {/* <div className={styles.category}>
                                Category 3
                            </div> */}
              </div>
              {/* <div className={styles.searchbar}>
                            <FaSearch />
                            <input className={styles.search} type='text' placeholder='Search' />
                        </div> */}
            </div>
            {isConnected ? (
              <div className={styles.nfts}>
                {userNFTs.map((nft, index) => {
                  return (
                    <Link
                      to={`/profile/${nft.tokenId}`}
                      state={{
                        nft: nft,
                      }}
                      key={index} 
                    >
                      <Catalogue nft={nft} index={index}/>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className={styles.notconnected}>
                <div>Connect your Wallet</div>
                <div style={{ marginLeft: "10px", marginTop: "3px" }}>
                  <BsWallet2 />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
