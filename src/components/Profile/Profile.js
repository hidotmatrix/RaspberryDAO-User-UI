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
import { GODWOKEN_NFTS_ADDRESS } from "../../constants/constants";
import LoadingSpinner from "../spinner/LoadingSpinner";

function Profile() {
  const [chainConfig, setConfig] = useState(null);
  const [GodwokenNFTContract, setGodwokenNFTContract] = useState(null);
  const [alchemy, setAlchemy] = useState(null);
  const [userNFTs, setUserNFTs] = useState([]);
  const { chain } = useNetwork();
  const themes = useContext(ThemeContext);
  const { theme } = themes;

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { address, isConnected } = useAccount();

  const provider = useProvider();
  const contract = useContract({
    addressOrName: GODWOKEN_NFTS_ADDRESS,
    contractInterface: GodwokenNFTs.abi,
    signerOrProvider: provider,
  });

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
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
            const bal = await contract.balanceOf(address);
            const metadataURIs = [];
            const itemArray = [];
            for (var i = 0; i < bal; i++) {
              const tokenId = await contract.tokenOfOwnerByIndex(address, i);
              const metadata_uri = await contract.tokenURI(tokenId.toString());
              metadataURIs.push(metadata_uri);

              const rawUri = `ipfs://QmbHTmDYrtEJXcuJuzhNvp6m2PJexi9KVNweFDZi8Vfmm2/${tokenId.toString()}`;
              const Uri = Promise.resolve(rawUri);
              const owner = address;

              const getUri = Uri.then((value) => {
                let str = value;
                let cleanUri = str.replace(
                  "ipfs://",
                  "https://indigo-defeated-sailfish-361.mypinata.cloud/ipfs/"
                );
                let metadata = axios.get(cleanUri).catch(function (error) {
                  console.log(error.toJSON());
                });
                return metadata;
              });

              getUri.then((value) => {
                // console.log(`Metadata ${tokenId.toString()}`, value);
                let rawImg = value.data.image;
                var name = value.data.name;
                var desc = value.data.description;
                let image = rawImg.replace(
                  "ipfs://",
                  "https://indigo-defeated-sailfish-361.mypinata.cloud/ipfs/"
                );
                Promise.resolve(owner).then((value) => {
                  let ownerW = value;
                  let meta = {
                    title: name,
                    image: image,
                    tokenId: tokenId.toString(),
                    wallet: ownerW,
                    description: desc,
                    balance: 1,
                    contract: { address: GODWOKEN_NFTS_ADDRESS },
                    tokenUri: { gateway: metadata_uri },
                  };
                  itemArray.push(meta);
                });
              });
            }
            await new Promise((r) => setTimeout(r, 2000));
            setUserNFTs(itemArray);
            setIsLoading(false);
          } else {
            const alchemy = new Alchemy(config);

            // Get all NFTs
            const nfts = await alchemy.nft.getNftsForOwner(address);
            setUserNFTs(nfts["ownedNfts"]);

            // Parse output
            const numNfts = nfts["totalCount"];
            const nftList = nfts["ownedNfts"];
            setIsLoading(false);
          }
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchData();
  }, [chain]);

  return (
    <>
      <div className={theme === "light" ? styles.light : styles.dark}>
        {isLoading && chain ? (
          <LoadingSpinner isApprovaltx={false} isSwaptx={false} theme={theme} />
        ) : (
          <div className={styles.profile}>
            {/* <div className={styles.profiledesc}>
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
                  NFTs (non-fungible tokens) are unique cryptographic tokens
                  that exist on a blockchain and cannot be replicated.
                  "Tokenizing" these real-world tangible assets makes buying,
                  selling, and trading them more efficient while reducing the
                  probability of fraud.
                </div>
              </div>
            </div> */}
            <div className={styles.assets}>
              {/* <div className={styles.categorybar}>
                <div className={styles.categories}>
                  <div className={`${styles.category} ${styles.headcategory}`}>
                    All
                  </div>
                  <div className={styles.category}>Favourites</div>
                  <div className={styles.category}>Category 1</div>
                  <div className={styles.category}>Category 2</div>
                </div>
                <div className={styles.searchbar}>
                            <FaSearch />
                            <input className={styles.search} type='text' placeholder='Search' />
                        </div>
              </div> */}
              {isConnected && chain.network ? (
                <div>
                  {userNFTs.length !== 0 ? (
                    <>
                      <div className={styles.heading}>
                        <span>MY NFTs</span>
                      </div>
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
                              <Catalogue nft={nft} index={index} />
                            </Link>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <div className={styles.notconnected}>
                      <div>You don't have any NFT in your wallet</div>
                      <div style={{ marginLeft: "10px", marginTop: "3px" }}>
                        <BsWallet2 />
                      </div>
                    </div>
                  )}
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
        )}
      </div>
    </>
  );
}

export default Profile;
