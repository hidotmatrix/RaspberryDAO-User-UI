import React, { useContext } from "react";
import styles from "./SwapCatalogue.module.scss";
import sample from "../../images/Sample.svg";
import { ThemeContext } from "../../App";

function SwapCatalogue(props) {
  const themes = useContext(ThemeContext);
  const { theme } = themes;

  const swapAction = () => {
    console.log("Props",props)
    props.setOpen(false);
    props.setSwap(true);
    props.setSelected(props.nft);
    props.setIndex(props.index + 1)
}
  const image_url = props.nft.media[0].gateway;

  const Truncate = (str) => {
    return str.length > 46 ? str.substring(0, 43) + "..." : str;
  }

  return (
    <div className={theme === "light" ? styles.light : styles.dark}>
      <div className={styles.catalogue}>
        <div className={styles.container}>
          <div className={styles.simage}>
            <img src={image_url} alt="Sample" className={styles.sampleimage}></img>
          </div>
          <div className={styles.lowerbox}>
            <div className={styles.lowerboxcontent}>
              <div className={styles.name}>{Truncate(props.nft.title)}</div>
              {/* <div className={styles.desc}>By Someone</div> */}
              <div className={styles.button} onClick={swapAction}>
                <button className={styles.bttn}>Swap</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwapCatalogue