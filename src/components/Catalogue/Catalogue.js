import React, { useContext } from "react";
import styles from "./Catalogue.module.scss";
import sample from "../../images/Sample.svg";
import { ThemeContext } from "../../App";
import { useNetwork } from "wagmi";

function Catalogue({ nft, index }) {
  const { chain } = useNetwork();

  let image_url = "";

  try {
    if (chain.network === "Godwoken Testnet") {
      image_url = nft.image;
    } else {
      if (nft.media.length != 0) {
        image_url = nft.media[0].gateway;
      } else {
        image_url = sample;
      }
    }
  } catch (error) {
    console.log("Error handle", error);
  }

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
                <button className={styles.bttn}>Swap this NFT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catalogue;
