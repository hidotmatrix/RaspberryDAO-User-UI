import React, { useState, useEffect, useContext } from "react";
import styles from "./Homepage.module.scss";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../App";
function Homepage() {
  const themes = useContext(ThemeContext);
  const { theme } = themes;

  const [index, setIndex] = useState(0);
  let l = [
    "https://bafkreiahqr5zuofwyufen57rgjv2edyxo6ivzw3vihbz7tsuk2ysay5y6i.ipfs.nftstorage.link/",
    "https://cdn.pixabay.com/photo/2022/03/01/02/51/galaxy-7040416_960_720.png",
    "https://getwalls.io/webp/large/MjAyMi8wMS8zZC1uZnQtYXJ0LWZyZWUtZG93bmxvYWQtbGFyZ2UtMTYzOTg2MDY3OS5qcGc=.webp",
    "https://getwalls.io/webp/large/MjAyMC8wNy9qYXBhbi1tb3N0LXBvcHVsYXItd2FsbHBhcGVyLWZvci1tb2JpbGUtbGFyZ2UtOTk0NDg3NTgxLmpwZw==.webp",
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
            <span className={styles.explore}>Explore</span> the world of NFT.
          </div>
          <div className={styles.main}>
            <div className={styles.mainimage}>
              <img src={l[index]} alt="Image"></img>
            </div>
            <div className={styles.maincontent}>
              <div className={styles.first}>
                <span className={styles.explore}>Explore</span> the world of
                NFT.
              </div>
              <div>
                NFT stands for “non-fungible token”. In plain English, it’s a
                one-of-a-kind digital asset.
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
