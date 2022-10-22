import React, { useContext, useState } from "react";
import { ethers } from "ethers";
import { Link, useLocation } from "react-router-dom";
import styles from "./Profiledesc.module.scss";
import sampleProduct from "../../images/sampleProduct.svg";
import Catalogue from "../Catalogue/Catalogue";
import { FaUserCircle } from "react-icons/fa";
import { ThemeContext } from "../../App";
import { useAccount, useNetwork,usePrepareContractWrite, useContractWrite } from "wagmi";
import ABI from "../../ABIs/BridgeABI.json"
import {POLYGON_BRIDGE_ADDRESS} from "../../constants/constants"

function Profiledesc() {

  const location = useLocation();
  const [nft, setNft] = useState(location.state.nft);
  console.log("NFTs",nft)
  const gasFees = "0.01"
  const { config, error, isError } = usePrepareContractWrite({
    addressOrName: POLYGON_BRIDGE_ADDRESS,
    contractInterface: ABI.abi,
    functionName: 'deposit',
    args: [nft.contract.address,nft.balance,ethers.utils.parseEther(gasFees),"71401",nft.tokenId,nft.tokenUri.gateway],
    overrides: {
      value: ethers.utils.parseEther(gasFees),
    },
    onSuccess(data) {
      console.log("Success", data)
    },
  })
  const { data, write } = useContractWrite(config)

  const Truncate = (str) => {
    return str.length > 40 ? str.substring(0, 37) + "..." : str;
  };

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  let image_url = "";

  try {
    if (chain.network === "Godwoken Testnet") {
      image_url = nft.image;
    } else {
      image_url = nft.media[0].gateway;
    }
  } catch (error) {
    console.log("Error handle",error)
  }

  const themes = useContext(ThemeContext);
  const { theme, toggleTheme } = themes;
  window.scroll(0, 0);

  return (
    <div className={theme === "light" ? styles.light : styles.dark}>
      <div className={styles.descmain}>
        <div className={styles.descpage}>
          <div className={styles.imgDiv}>
            <img
              className={styles.sampleProduct}
              src={image_url}
              alt="sampleProduct"
            />
          </div>
          <div className={styles.details}>
            <div className={styles.title}>{nft.title}</div>
            <div className={styles.prodid}>
              Token Id : {Truncate(nft.tokenId)}
            </div>
            <div className={styles.profdetails}>
              <FaUserCircle className={styles.user} />
              <div className={styles.profile}>
                <div className={styles.name}>{address}</div>
                {/* <div className={styles.userdesc}>From India</div> */}
              </div>
            </div>
            <div className={styles.nftdesc}>{nft.description}</div>
            {chain.network === "Godwoken Testnet"?"":<div className={styles.swapbox}>
              <div className={styles.leftswapbox}>
                <div className={styles.from}>FROM</div>
                <div className={styles.selectNFT}>
                  <select
                    name="choosefrom"
                    id="dropdown"
                    className={styles.select}
                    defaultValue={'DEFAULT'}
                    // onChange={event => setReason(event.target.value)}
                    required
                  >
                    <option value="" disabled selected hidden>
                      {" "}
                      Choose a BlockChain
                    </option>
                    <option value="Polygon">{chain.name}</option>
                    {/* <option value="Polygon">Polygon</option>
                    <option value="XDAI">XDAI</option> */}
                  </select>
                </div>
                <div className={styles.amountandbalance}>
                  <div className={styles.amount}>1</div>
                  <div className={styles.unitandbalance}>
                    <div className={styles.unit}> NFT </div>
                    {/* <div className={styles.balance}>Balance - </div> */}
                  </div>
                </div>
              </div>
              <div className={styles.swapbutton}>
                <button className={styles.buttonswap} disabled={!write} onClick={() => write?.()}>SWAP</button>
                {error && ( <div>An error occurred preparing the transaction: {error.message}</div> )}
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
                  <div className={styles.amount}>1</div>
                  <div className={styles.unitandbalance}>
                    <div className={styles.unit}> NFT </div>
                    {/* <div className={styles.balance}>Balance - </div> */}
                  </div>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profiledesc;
