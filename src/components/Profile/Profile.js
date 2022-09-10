import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Profile.module.scss";
import Banner from "../../images/Profile/Banner.svg";
import ProfileImg from "../../images/Profile/Profile.svg";
import { FaSearch } from "react-icons/fa";
import Catalogue from "../Catalogue/Catalogue";
import { ThemeContext } from "../../App";
import { Alchemy, Network } from "alchemy-sdk";
import { chain, createClient, WagmiProvider } from "wagmi";
import GetProvider from "../../hooks/GetProvider";

function Profile() {
  const provider = GetProvider();
  let config;
  switch (provider.network.name) {
    case "homestead":
      config = {
        apiKey: process.env.ALCHEMY_API_KEY,
        network: Network.ETH_MAINNET,
      };
      break;
    case "matic":
      config = {
        apiKey: process.env.ALCHEMY_API_KEY,
        network: Network.MATIC_MAINNET,
      };
      break;
    case "rinkeby":
      config = {
        apiKey: process.env.ALCHEMY_API_KEY,
        network: Network.ETH_RINKEBY,
      };
      break;
    case "maticmum":
      config = {
        apiKey: process.env.ALCHEMY_API_KEY,
        network: Network.MATIC_MUMBAI,
      };
      break;
  }

  const alchemy = new Alchemy(config);

  const themes = useContext(ThemeContext);
  const { theme } = themes;

  useEffect(() => {
    async function fetchNFTs() {
      console.log("Network", provider.network.name);
      //   const userNFTs = await GetNFTs(address, provider.network.name);
      //   console.log("User NFTs", userNFTs);
      const address = "elanhalpern.eth";

      // Get all NFTs
      const nfts = await alchemy.nft.getNftsForOwner(address);

      console.log("User NFTs", nfts);

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
    fetchNFTs();
  }, [provider]);

  let num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
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
              exist on a blockchain and cannot be replicated. "Tokenizing" these
              real-world tangible assets makes buying, selling, and trading them
              more efficient while reducing the probability of fraud.
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
          <div className={styles.nfts}>
            {num.map(() => {
              return (
                <Link to="/profile/iuebfibsdivdissdibv">
                  <Catalogue />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
