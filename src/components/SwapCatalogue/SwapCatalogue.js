import React, { useContext } from "react";
import styles from "./SwapCatalogue.module.scss";
import sample from "../../images/Sample.svg";
import { ThemeContext } from "../../App";
import { useNetwork } from "wagmi";

function SwapCatalogue(props) {
  const themes = useContext(ThemeContext);
  const { theme } = themes;

  const swapAction = () => {
    props.setOpen(false);
    props.setSwap(true);
    const nft = props.nft;
    nft.hasSelected = true;
    nft.selectedNFT_approve_count = 1;
    nft.selectedNFT_swap_count = 1;
    props.setSelected(nft);
    props.setIndex(props.index + 1);
  };
  const { chain } = useNetwork();
  let image_url = "";

  try {
    if (chain.network === "Godwoken") {
      image_url = props.nft.image;
    } else {
      if (props.nft.media.length !== 0 && props.nft.media[0].format !== "mp4") {
        image_url = props.nft.media[0].gateway;
      } else {
        image_url = sample;
      }
    }
  } catch (error) {
    // console.log("Error handle", error);
  }

  const Truncate = (str) => {
    return str.length > 23 ? str.substring(0, 20) + "..." : str;
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
              <div className={styles.name}>{Truncate(props.nft.title)}</div>
              <div className={styles.button} onClick={swapAction}>
                <button className={styles.bttn}>Select</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwapCatalogue;
