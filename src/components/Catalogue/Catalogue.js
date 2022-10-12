import React, { useContext } from "react";
import styles from "./Catalogue.module.scss";
import sample from "../../images/Sample.svg";
import { ThemeContext } from "../../App";
import { useNetwork } from "wagmi";

function Catalogue({ nft, index }) {
  const { chain } = useNetwork();
  let image_url = "";
  if (chain.network === "Godwoken Testnet") {
    image_url = nft.image;
  } else {
    if(nft.media.length!=0){
      image_url = nft.media[0].gateway;
    }
    else{
      image_url=sample
    }
  }

  // console.log("NFT name", nft.title);
  // console.log("Image url", image_url);
  // console.log("NFT description", nft.description);
  // console.log("NFT Token Id", nft.tokenId);
  const themes = useContext(ThemeContext);
  const { theme } = themes;

  const Truncate = (str) => {
    return str.length > 46 ? str.substring(0, 43) + "..." : str;
  };

  return (
    <div className={theme === "light" ? styles.light : styles.dark}>
      <div className={styles.catalogue}>
        <div className={styles.container}>
          <div className={styles.simage}>
            <img
              src={image_url}
              alt="Sample"
              className={styles.sampleimage}
            ></img>
          </div>
          <div className={styles.lowerbox}>
            <div className={styles.lowerboxcontent}>
              <div className={styles.name}>{Truncate(nft.title)}</div>
              {/* <div className={styles.desc}>By Someone</div> */}
              <div className={styles.button}>
                <button className={styles.bttn}>Add to My Collections</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catalogue;
