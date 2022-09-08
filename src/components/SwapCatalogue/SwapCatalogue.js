import React, { useContext } from "react";
import styles from "./SwapCatalogue.module.scss";
import sample from "../../images/Sample.svg";
import { ThemeContext } from "../../App";

function SwapCatalogue(props) {
    const themes = useContext(ThemeContext);
    const { theme } = themes;

    const swapAction = () => (
        props.setOpen(false),
        props.setSwap(true)
    )

    return (
      <div className={theme === "light" ? styles.light : styles.dark}>
        <div className={styles.catalogue}>
          <div className={styles.container}>
            <div clasName={styles.simage}>
              <img src={sample} alt="Sample" className={styles.sampleimage}></img>
            </div>
            <div className={styles.lowerbox}>
              <div className={styles.lowerboxcontent}>
                <div className={styles.name}>The Demon</div>
                <div className={styles.desc}>By Someone</div>
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