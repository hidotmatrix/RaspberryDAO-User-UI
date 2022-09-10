import React, { useContext } from "react";
import styles from "./Catalogue.module.scss";
import sample from "../../images/Sample.svg";
import { ThemeContext } from "../../App";

function Catalogue() {
  const themes = useContext(ThemeContext);
  const { theme } = themes;
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
