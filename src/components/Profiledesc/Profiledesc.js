import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Profiledesc.module.scss";
import sample from "../../images/Sample.svg";
import { FaUserCircle } from "react-icons/fa";
import { ThemeContext } from "../../App";
import { useAccount, useNetwork } from "wagmi";
import LoadingSpinner from "../spinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import { BsBoxArrowUpRight } from "react-icons/bs";

function Profiledesc() {
  const navigate = useNavigate();
  const location = useLocation();
  const [nft, setNft] = useState(location.state.nft);
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [isLoading, setIsLoading] = useState(false);

  const [isApprovaltx, seApprovaltx] = useState(false);
  const [isSwaptx, setSwaptx] = useState(false);

  const Truncate = (str) => {
    return str.length > 40 ? str.substring(0, 37) + "..." : str;
  };

  const BASE_EXPLORER_URL_GODWOKEN =
    "https://gw-mainnet-explorer.nervosdao.community/token/";

  const BASE_EXPLORER_URL_POLYGON = "https://polygonscan.com/token/";
  const NFT_CONTRACT_ADDRESS = nft.contract.address;
  const TOKEN_ID = nft.tokenId.toString();
  const TOKEN_CONCAT_STR_POLYGON = "?a=";
  const TOKEN_CONCAT_STR_GODWOKEN = `/instance/${TOKEN_ID}/token-transfers`;

  let NFT_EXPLORER_URL = "";

  let image_url = "";
  try {
    if (chain.network === "Godwoken") {
      image_url = nft.image;
      NFT_EXPLORER_URL =
        BASE_EXPLORER_URL_GODWOKEN +
        NFT_CONTRACT_ADDRESS +
        TOKEN_CONCAT_STR_GODWOKEN;
    } else {
      NFT_EXPLORER_URL =
        BASE_EXPLORER_URL_POLYGON +
        NFT_CONTRACT_ADDRESS +
        TOKEN_CONCAT_STR_POLYGON +
        TOKEN_ID;
      if (nft.media.length !== 0 && nft.media[0].format !== "mp4") {
        image_url = nft.media[0].gateway;
      } else {
        image_url = sample;
      }
    }
  } catch (error) {
    // console.log("Error handle", error);
  }

  const themes = useContext(ThemeContext);
  const { theme, toggleTheme } = themes;
  window.scroll(0, 0);

  useEffect(() => {
    if (chain.network != location.state.chain) {
      navigate("/profile");
    }
  }, [chain.network]);

  return (
    <div className={theme === "light" ? styles.light : styles.dark}>
      {isLoading ? (
        <LoadingSpinner
          isApprovaltx={isApprovaltx}
          isSwaptx={isSwaptx}
          theme={theme}
        />
      ) : (
        <div className={styles.descmain}>
          <Link to="/profile">
            <div className={styles.back}>
              <div>
                <IoChevronBackOutline />
              </div>
              <div style={{ marginTop: "-5px" }}>Back</div>
            </div>
          </Link>
          <div className={styles.descpage}>
            <div className={styles.imgDiv}>
              <img
                className={styles.sampleProduct}
                src={image_url}
                alt="NFT Image"
              />
            </div>
            <div className={styles.details}>
              <div className={styles.title}>{nft.title}</div>
              <div className={styles.prodid}>
                Token Id : {Truncate(nft.tokenId)}
              </div>
              <a href={NFT_EXPLORER_URL} target="_blank">
                <div className={styles.viewonexplorer}>
                  View NFT on Explorer <BsBoxArrowUpRight />
                </div>
              </a>
              <div className={styles.profdetails}>
                <FaUserCircle className={styles.user} />
                <div className={styles.profile}>
                  <div className={styles.name}>{address}</div>
                </div>
              </div>
              <div className={styles.nftdesc}>{nft.description}</div>
              {chain.network === "Godwoken" ? (
                ""
              ) : (
                <div className={styles.swap}>
                  <div className={styles.note}>
                    To swap this NFT, click below button
                  </div>
                  <Link to="/swap" state={{ nftdesc: nft }}>
                    <div className={styles.secondbutton}>
                      <button className={styles.secondbtn}>Swap NFT</button>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profiledesc;
