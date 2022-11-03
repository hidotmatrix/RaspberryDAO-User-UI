import React, { useState, useEffect, useContext } from "react";
import styles from "./Homepage.module.scss";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../App";
import raspberrydao_pic_1 from "../../images/raspberrydao_pic_1.jpg";
import raspberrydao_pic_2 from "../../images/raspberrydao_pic_2.jpg";
import raspberrydao_pic_3 from "../../images/raspberrydao_pic_3.jpg";
import raspberrydao_pic_4 from "../../images/raspberrydao_pic_4.jpg";
function Homepage() {
  const themes = useContext(ThemeContext);
  const { theme } = themes;

  const [index, setIndex] = useState(0);
  let l = [
    raspberrydao_pic_1,
    raspberrydao_pic_2,
    raspberrydao_pic_3,
    raspberrydao_pic_4,
  ];

  useEffect(() => {
    let intervalId = 0;
    const Changing = () => {
      intervalId = setInterval(() => {
        setIndex((prevIndex) => {
          return prevIndex + 1 < l.length ? prevIndex + 1 : 0;
        });
      }, 5000);
    };
    Changing();
    return () => {
      clearInterval(intervalId);
    };
  }, [l, index]);

  return (
    <>
      <div className={theme === "light" ? styles.light : styles.dark}>
        <div className={styles.homepage}>
          <div className={styles.firsttop}>
            <span className={styles.explore}>Explore</span> the world of
            Bridging.
          </div>
          <div className={styles.main}>
            <div className={styles.mainimage}>
              <img src={l[index]} alt="Image"></img>
            </div>
            <div className={styles.maincontent}>
              <div className={styles.first}>
                <span className={styles.explore}>Explore</span> the world of
                Bridging.
              </div>
              <div>
                Bridging of NFT means moving your NFT from one chain to another
                chain
              </div>
              <Link to="/profile">
                <div className={styles.button}>
                  <button className={styles.btn}>Explore More &#8594;</button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
