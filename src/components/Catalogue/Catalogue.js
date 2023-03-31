import React, { useContext } from "react";
import styles from "./Catalogue.module.scss";
import sample from "../../images/Sample.svg";
import { ThemeContext } from "../../App";
import { useNetwork } from "wagmi";
import Godwokenlogo from "../../images/godwoken-logo-2.svg";
import polygonlogo from "../../images/polygon.png";

function Catalogue({ nft, index }) {
  const { chain } = useNetwork();
  const themes = useContext(ThemeContext);
  const { theme } = themes;

  const Truncate = (str) => {
    return str.length > 23 ? str.substring(0, 20) + "..." : str;
  };

  let image_url = "";

  try {
    if (chain.network === "Godwoken") {
      image_url = nft.image;
    } else {
      if (nft.media.length !== 0 && nft.media[0].format !== "mp4") {
        image_url = nft.media[0].gateway;
      } else {
        image_url = sample;
      }
    }
  } catch (error) {}

  return (
    <>
      <div className={theme === "light" ? styles.light : styles.dark}>
        <div className={styles.catalogue}>
          <div className={styles.container}>
            <div className={styles.simage}>
              <img src={image_url} alt="" className={styles.sampleimage}></img>
            </div>
            <div className={styles.lowerbox}>
              <div className={styles.lowerboxcontent}>
                <div className={styles.nameandlogo}>
                  <div className={styles.name}>{Truncate(nft.title)}</div>
                  <div className={styles.logo}>
                    {chain.network === "Godwoken" ? (
                      <img src={Godwokenlogo}></img>
                    ) : (
                      <img src={polygonlogo}></img>
                    )}
                  </div>
                </div>
                <div className={styles.button}>
                  <button className={styles.bttn}>View &#8594;</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Catalogue;
