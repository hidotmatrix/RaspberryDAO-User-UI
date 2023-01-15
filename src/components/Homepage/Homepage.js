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
import nft1 from "../../images/Homepage/NFTs/1.svg";
import nft2 from "../../images/Homepage/NFTs/2.svg";
import nft3 from "../../images/Homepage/NFTs/3.svg";
import nft4 from "../../images/Homepage/NFTs/4.svg";
import symbol from '../../images/Homepage/Polygon.svg';
import symbolwhite from '../../images/Homepage/PolygonWhite.svg'
import open from "../../images/Homepage/open.svg";
import close from "../../images/Homepage/close.svg";

function Homepage() {
  const themes = useContext(ThemeContext);
  const { theme } = themes;

  const [index, setIndex] = useState(0);
  const [firstQuestion, setFirstQuestion] = useState(false);
  const [secondQuestion, setSecondQuestion] = useState(false);
  const [thirdQuestion, setThirdQuestion] = useState(false);

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
          <div className={styles.upperhome}>
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
          <div className={styles.daodesc}>
            <div className={styles.daocontent}>
              <div className={styles.firstcontent}>Raspberry DAO NFTs are not ordinary NFTs !</div>
              <div className={styles.secondcontent}>They're upgradeable!</div>
            </div>
            <div className={styles.daosummary}>
              Raspberry DAO will support multiple rounds of new limited-edition NFTs. Simply trade in one of your old NFTs to get started and join the current round. Each round has completely different art than the previous. Once a round is sold out, it's gone forever. Unless... you upgrade a Raspberry DAO NFT from an older round. Keep in mind, that when you trade your old NFTs in using Raspberry DAO, and when you upgrade your Raspberry DAO NFT,  the old NFTS are burned!
            </div>
            <div className={styles.upgradenfts}>
              <img src={nft1} className={styles.nftimage} alt="NFT Image 1"></img>
              <div className={styles.nftarrow}>
                {theme==='light' ? <img src={symbol} alt="Arrow"></img> : <img src={symbolwhite} alt="Arrow"></img>}
                <div className={styles.number}>+ 1 UP</div>
              </div>
              <img src={nft2} className={styles.nftimage} alt="NFT Image 2"></img>
              <div className={styles.nftarrow}>
                {theme==='light' ? <img src={symbol} alt="Arrow"></img> : <img src={symbolwhite} alt="Arrow"></img>}
                <div className={styles.number}>+ 2 UP</div>
              </div>
              <img src={nft3} className={styles.nftimage} alt="NFT Image 3"></img>
              <div className={styles.nftarrow}>
                {theme==='light' ? <img src={symbol} alt="Arrow"></img> : <img src={symbolwhite} alt="Arrow"></img>}
                <div className={styles.number}>+ 3 UP</div>
              </div>
              <img src={nft4} className={styles.nftimage} alt="NFT Image 4"></img>
            </div>
          </div>
          <div className={styles.faq}>
            <div className={styles.firstquestion}>
              <div className={styles.question}>
                <div className={styles.mainquestion}>How it works ?</div>
                {
                  firstQuestion ?
                    <div className={styles.arrow} onClick={() => setFirstQuestion(false)}>
                      <img src={open} alt="Open Arrow"></img>
                    </div> :
                    <div className={styles.arrow} onClick={() => setFirstQuestion(true)}>
                      <img src={close} alt="Close Arrow"></img>
                    </div>
                }
              </div>
              {
                firstQuestion ?
                  <div className={styles.answer}>
                    With Raspberry DAO you can trade in your old or unwanted NFTs and redeem them for a brand-new generative-art NFT. Raspberry DAO NFTs are upgradeable, and you can trade in Raspberry DAO NFTs for NFTs released in future collections featured in rounds on Raspberry DAO, even if the round is closed. As a project of the Nervos Foundation, Raspberry DAO aims to bring much-needed interoperability to the NFT space. Our bridge from Polygon to Godwoken is live, with options to bridge swap between more chains to come soon.
                  </div> : null
              }
            </div>
            <div className={styles.secondquestion}>
              <div className={styles.question}>
                <div className={styles.mainquestion}>About the NFT collection rounds</div>
                {
                  secondQuestion ?
                    <div className={styles.arrow} onClick={() => setSecondQuestion(false)}>
                      <img src={open} alt="Open Arrow"></img>
                    </div> :
                    <div className={styles.arrow} onClick={() => setSecondQuestion(true)}>
                      <img src={close} alt="Close Arrow"></img>
                    </div>
                }
              </div>
              {
                secondQuestion ?
                  <div className={styles.answer}>
                    Raspberry DAO Rounds are like levels in a gamified NFT release, with each round featuring brand new generative-art NFTs. You can choose to hold on to your NFT from a previous round, or upgrade them to the latest collection. Once NFTs are upgraded, the old NFTs are burned which makes NFTs from previous rounds even more scarce.
                  </div> : null
              }
            </div>
            <div className={styles.thirdquestion}>
              <div className={styles.question}>
                <div className={styles.mainquestion}>Why trade in your NFTs ?</div>
                {
                  thirdQuestion ?
                    <div className={styles.arrow} onClick={() => setThirdQuestion(false)}>
                      <img src={open} alt="Open Arrow"></img>
                    </div> :
                    <div className={styles.arrow} onClick={() => setThirdQuestion(true)}>
                      <img src={close} alt="Close Arrow"></img>
                    </div>
                }
              </div>
              {
                thirdQuestion ?
                  <div className={styles.answer}>
                    Why not trade in your old or unwanted NFTs? Raspberry DAO NFTs are upgradable for new limited edition NFTs in the future, and we aim to enable  various utilities for Raspberry DAO NFTs on platforms and projects with the Nervos ecosystem.
                  </div> : null
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
