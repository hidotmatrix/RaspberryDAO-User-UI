import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Profiledesc.module.scss";
import sampleProduct from "../../images/sampleProduct.svg";
import Catalogue from "../Catalogue/Catalogue";
import { FaUserCircle } from "react-icons/fa";
import { ThemeContext } from "../../App";

function Profiledesc() {
  const themes = useContext(ThemeContext);
  const { theme, toggleTheme } = themes;

  let num = [1, 2, 3, 4, 5, 6, 7,8];
  window.scroll(0, 0);
  return (
    <div className={theme === "light" ? styles.light : styles.dark}>
      <div className={styles.descmain}>
        <div className={styles.descpage}>
          <div className={styles.imgDiv}>
            <img
              className={styles.sampleProduct}
              src={sampleProduct}
              alt="sampleProduct"
            />
          </div>
          <div className={styles.details}>
            <div className={styles.title}>The Skull</div>
            <div className={styles.prodid}>Product Id: 2576890</div>
            <div className={styles.profdetails}>
              <FaUserCircle className={styles.user} />
              <div className={styles.profile}>
                <div className={styles.name}>Business</div>
                <div className={styles.userdesc}>From India</div>
              </div>
            </div>
            <div className={styles.nftdesc}>
              An NFT is an image in the form of a digital token. These tokens
              are then sold online. An NFT can be anything in digital form. For
              example, artwork, photographs, and animations can be converted
              into an NFT and sold online.
            </div>
            <div className={styles.swapbox}>
              <div className={styles.leftswapbox}>
                <div className={styles.from}>FROM</div>
                <div className={styles.selectNFT}>
                  <select
                    name="choosefrom"
                    id="dropdown"
                    className={styles.select}
                    // onChange={event => setReason(event.target.value)}
                    required
                  >
                    <option value="" disabled selected hidden>
                      {" "}
                      Choose a BlockChain
                    </option>
                    <option value="Ethereum">Ethereum</option>
                    <option value="Polygon">Polygon</option>
                    <option value="XDAI">XDAI</option>
                  </select>
                </div>
                <div className={styles.amountandbalance}>
                  <div className={styles.amount}>0.0</div>
                  <div className={styles.unitandbalance}>
                    <div className={styles.unit}> NFT </div>
                    <div className={styles.balance}>Balance - </div>
                  </div>
                </div>
              </div>
              <div className={styles.swapbutton}>
                <button className={styles.buttonswap}>SWAP</button>
              </div>
              <div className={styles.rightswapbox}>
                <div className={styles.to}>TO</div>
                <div className={styles.inputNFT}>
                  <input
                    name="tonft"
                    className={styles.input}
                    value="GODWOKEN"
                    disabled
                  ></input>
                </div>
                <div className={styles.amountandbalance}>
                  <div className={styles.amount}>0.0</div>
                  <div className={styles.unitandbalance}>
                    <div className={styles.unit}> NFT </div>
                    <div className={styles.balance}>Balance - </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.assets}>
          <div className={styles.categorybar}>
            <div className={styles.categories}>
              <div className={`${styles.category} ${styles.headcategory}`}>All</div>
              <div className={styles.category}>Favourites</div>
              <div className={styles.category}>Category 1</div>
              <div className={styles.category}>Category 2</div>
              {/* <div className={styles.category}>
                            Category 3
                        </div> */}
            </div>
            {/* <div className={styles.searchbar}>
                        <FaSearch />
                        <input className={styles.search} type='text' placeholder='Search' />
                    </div> */}
          </div>
          <div className={styles.nfts}>
            {num.map(() => {
              return (
                <Link to="/profile/iuebfibsdivdissdibv">
                  <Catalogue />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profiledesc;
