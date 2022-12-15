import React, { useState, useEffect, useContext } from "react";
import styles from "./Homepage.module.scss";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../App";
import raspberrydao_pic_1 from "../../images/Homepage/1.svg";
import raspberrydao_pic_2 from "../../images/Homepage/2.svg";
import raspberrydao_pic_3 from "../../images/Homepage/3.svg";
import raspberrydao_pic_4 from "../../images/Homepage/4.svg";
import raspberrydao_pic_5 from "../../images/Homepage/5.svg";
import raspberrydao_pic_6 from "../../images/Homepage/6.svg";

function Homepage() {
  const themes = useContext(ThemeContext);
  const { theme } = themes;

  const [index, setIndex] = useState(0);
  let first = [raspberrydao_pic_2, raspberrydao_pic_3, raspberrydao_pic_2, raspberrydao_pic_3];
  let second = [raspberrydao_pic_1, raspberrydao_pic_4, raspberrydao_pic_5, raspberrydao_pic_6];
  let third = [raspberrydao_pic_5, raspberrydao_pic_6, raspberrydao_pic_1, raspberrydao_pic_4];
  let fourth = [raspberrydao_pic_3, raspberrydao_pic_2, raspberrydao_pic_3, raspberrydao_pic_2];

  useEffect(() => {
    let intervalId = 0;
    const Changing = () => {
      intervalId = setInterval(() => {
        setIndex((prevIndex) => {
          return prevIndex + 1 < first.length ? prevIndex + 1 : 0;
        });
      }, 4000);
    };
    Changing();
    return () => {
      clearInterval(intervalId);
    };
  }, [first, index]);

  return (
    <>
      <div className={theme === "light" ? styles.light : styles.dark}>
        <div className={styles.homepage}>
          <div className={styles.firsttop}>
            <span className={styles.explore}>Teleport</span> your NFTs to
            Godwoken
          </div>
          <div className={styles.main}>
            <div className={styles.imageslider}>
              <div className={styles.firstrow}>
                <div className={styles.left}>
                  <img src={first[index]} alt="Image"></img>
                </div>
                <div className={styles.right}>
                  <img src={second[index]} alt="Image"></img>
                </div>
              </div>
              <div className={styles.secondrow}>
                <div className={styles.left}>
                  <img src={third[index]} alt="Image"></img>
                </div>
                <div className={styles.right}>
                  <img src={fourth[index]} alt="Image"></img>
                </div>
              </div>
            </div>
            <div className={styles.maincontent}>
              <div className={styles.first}>
                <span className={styles.explore}>Teleport</span> your NFTs to Godwoken!
              </div>
              <div className={styles.innercontent}>
                Raspberry DAO is an easy to use bridge that let’s you swap your NFTs from several chains to Godwoken. A project of the Nervos Foundation, Raspberry DAO aims to bring much needed interoperability to the NFT space. Our bridge from Polygon to Godwoken is live, with options to bridge swap between more chains to come soon.
              </div>
              <div className={styles.buttons}>
                <Link to="/profile">
                  <div className={styles.firstbutton}>
                    <button className={styles.firstbtn}>View NFTs</button>
                  </div>
                </Link>
                <Link to="/marketplace">
                  <div className={styles.secondbutton}>
                    <button className={styles.secondbtn}>Swap NFTs</button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
