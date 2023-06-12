import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Profile.module.scss";
import Catalogue from "../Catalogue/Catalogue";
import { ThemeContext } from "../../App";
import { useAccount, useNetwork, useContract, useProvider } from "wagmi";
import { Alchemy, Network } from "alchemy-sdk";
import { BsWallet2 } from "react-icons/bs";
import axios from "axios";
import GodwokenNFTs from "../../ABIs/GodwokenNFTs.json";
import { GODWOKEN_NFTS_ADDRESS } from "../../constants/constants";
import LoadingSpinner from "../spinner/LoadingSpinner";
import CataloguePopup from "./CataloguePopup";

function Profile() {
  const [userNFTs, setUserNFTs] = useState([]);
  const { chain } = useNetwork();
  const themes = useContext(ThemeContext);
  const { theme } = themes;
  const [open, setOpen] = useState(true);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { address, isConnected } = useAccount();

  const provider = useProvider();
  const contract = useContract({
    addressOrName: GODWOKEN_NFTS_ADDRESS,
    contractInterface: GodwokenNFTs.abi,
    signerOrProvider: provider,
  });

  const change = () => {
    setOpen(false);
  };

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
          case "Godwoken":
            config = {};
            break;
        }

        try {
          if (chain.network === "Godwoken") {
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

              const getUri = Uri.then(async (value) => {
                let str = value;
                let cleanUri = str.replace(
                  "ipfs://",
                  "https://indigo-defeated-sailfish-361.mypinata.cloud/ipfs/"
                );
                let metadata = await axios
                  .get(cleanUri)
                  .catch(function (error) {
                    // console.log(error.toJSON());
                  });
                return metadata;
              });

              getUri.then((value) => {
                let rawImg = value.data.image;
                var name = value.data.name;
                var desc = value.data.description;

                /*
                 * Metadata uri has a error of One negative Token Id in NFT Name , so for fixing that
                 * incrementing and appending the updated_name in the name of NFT.
                 */
                const correct_num = Number(name.charAt(name.length - 1)) + 1;
                const updated_name = name.replace(
                  name.charAt(name.length - 1),
                  correct_num.toString()
                );

                let image = rawImg.replace(
                  "ipfs://",
                  "https://indigo-defeated-sailfish-361.mypinata.cloud/ipfs/"
                );
                Promise.resolve(owner).then((value) => {
                  let ownerW = value;
                  let meta = {
                    title: updated_name,
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

  useEffect(() => {
    if (isConnected) {
      if (chain.network.includes("Godwoken")) {
        setContent(
          <p>
            These are your <b>Raspberry DAO NFTs</b>. To swap your NFTs switch
            to <b>POLYGON NETWORK.</b>
          </p>
        );
        setOpen(true);
      } else {
        setContent(
          <p>
            To view your Swapped NFTs switch to <b>GODWOKEN NETWORK.</b>
          </p>
        );
        setOpen(true);
      }
    } else {
      setOpen(false);
    }
  }, [chain]);

  return (
    <>
      {open ? (
        <CataloguePopup show={open} switch={change} content={content} />
      ) : null}
      <div className={theme === "light" ? styles.light : styles.dark}>
        {isLoading && chain ? (
          <LoadingSpinner isApprovaltx={false} isSwaptx={false} theme={theme} />
        ) : (
          <div className={styles.profile}>
            <div className={styles.assets}>
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
                                chain: chain.network,
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
