import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { Link, useLocation } from "react-router-dom";
import { CButton, CSpinner } from "@coreui/react";
import styles from "./Profiledesc.module.scss";
import sampleProduct from "../../images/Sample.svg";
import Catalogue from "../Catalogue/Catalogue";
import { FaUserCircle } from "react-icons/fa";
import { ThemeContext } from "../../App";
import {
  useAccount,
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useProvider,
  useContract,
} from "wagmi";
import ABI from "../../ABIs/BridgeABI.json";
import GodwokenNFTs from "../../ABIs/GodwokenNFTs.json";
import {
  GODWOKEN_NFTS_ADDRESS,
  POLYGON_BRIDGE_ADDRESS,
} from "../../constants/constants";
import LoadingSpinner from "../spinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";

function Profiledesc() {
  const navigate = useNavigate();

  const location = useLocation();
  const [nft, setNft] = useState(location.state.nft);

  const [isApproved, setApproval] = useState(false);

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isApprovaltx, seApprovaltx] = useState(false);
  const [isSwaptx, setSwaptx] = useState(false);

  const provider = useProvider();
  const contract = useContract({
    addressOrName: nft.contract.address,
    contractInterface: GodwokenNFTs.abi,
    signerOrProvider: provider,
  });

  useEffect(() => {
    async function fetch() {
      const approveFlag = await contract.isApprovedForAll(
        address,
        POLYGON_BRIDGE_ADDRESS
      );
      setApproval(approveFlag);
    }
    fetch();
  }, []);
  const gasFees = "0.001";
  const bridgeFee = "0.01";
  const totalFees = Number(gasFees) + Number(bridgeFee);
  const { config, error } = usePrepareContractWrite({
    addressOrName: POLYGON_BRIDGE_ADDRESS,
    contractInterface: ABI.abi,
    functionName: "deposit",
    args: [
      nft.contract.address,
      nft.balance,
      ethers.utils.parseEther(gasFees),
      "71401",
      nft.tokenId,
      nft.tokenUri.gateway,
    ],
    overrides: {
      value: ethers.utils.parseEther(totalFees.toString()),
      gasLimit: "100000",
    },
    onSuccess(data) {
      console.log("Success", data);
    },
    onError(error) {
      console.log("Error", error);
    },
  });
  const swapWrite = useContractWrite(config);

  useEffect(() => {
    async function fetch() {
      setSwaptx(true);
      setIsLoading(true);
      try {
        const data = await swapWrite.data.wait();
        const timerId = setTimeout(() => {
          navigate("/profile");
          clearTimeout(timerId);
        }, 1000);
        console.log("Data inner", data);
      } catch (error) {
        console.log("Error catch", error);
        setIsLoading(false);
        setSwaptx(false);
      } finally {
        setIsLoading(false);
        setSwaptx(false);
      }
    }
    fetch();
  }, [swapWrite.data]);

  const approveContractWrite = usePrepareContractWrite({
    addressOrName: nft.contract.address,
    contractInterface: GodwokenNFTs.abi,
    functionName: "setApprovalForAll",
    args: [POLYGON_BRIDGE_ADDRESS, true],
    onSuccess(data) {
      console.log("Success Approval", data);
    },
    onError(error) {
      console.log("Error", error);
    },
  });
  const approvalWrite = useContractWrite(approveContractWrite.config);

  useEffect(() => {
    async function fetch() {
      seApprovaltx(true);
      setIsLoading(true);
      try {
        const data = await approvalWrite.data.wait();
        console.log("Data inner", data);
      } catch (error) {
        console.log("Error catch", error);
        setIsLoading(false);
        seApprovaltx(false);
      } finally {
        setIsLoading(false);
        seApprovaltx(false);
      }
    }
    fetch();
  }, [approvalWrite.data]);

  const handleGetRequest = async () => {
    const response = await fetch("https://raspberrydaobridge.herokuapp.com/");
    if (response.status) {
      swapWrite.write?.();
    }
  };

  const Truncate = (str) => {
    return str.length > 40 ? str.substring(0, 37) + "..." : str;
  };

  let image_url = "";

  try {
    if (chain.network === "Godwoken Testnet") {
      image_url = nft.image;
    } else {
      image_url = nft.media[0].gateway;
    }
  } catch (error) {
    image_url = sampleProduct;
  }

  const themes = useContext(ThemeContext);
  const { theme, toggleTheme } = themes;
  window.scroll(0, 0);

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
              {chain.network === "Godwoken Testnet" ? (
                ""
              ) : (
                // <div className={styles.swapbox}>
                //   <div className={styles.leftswapbox}>
                //     <div className={styles.from}>FROM</div>
                //     <div className={styles.selectNFT}>
                //       <select
                //         name="choosefrom"
                //         id="dropdown"
                //         className={styles.select}
                //         defaultValue={"DEFAULT"}
                //         // onChange={event => setReason(event.target.value)}
                //         required
                //       >
                //         <option value="" disabled selected hidden>
                //           {" "}
                //           Choose a BlockChain
                //         </option>
                //         <option value="Polygon">{chain.name}</option>
                //         {/* <option value="Polygon">Polygon</option>
                //     <option value="XDAI">XDAI</option> */}
                //       </select>
                //     </div>
                //     <div className={styles.amountandbalance}>
                //       <div className={styles.amount}>1</div>
                //       <div className={styles.unitandbalance}>
                //         <div className={styles.unit}> NFT </div>
                //         {/* <div className={styles.balance}>Balance - </div> */}
                //       </div>
                //     </div>
                //   </div>
                //   <div className={styles.swapbutton}>
                //     {swapWrite.write && isApproved && !isLoading ? (
                //       <button
                //         className={styles.buttonswap}
                //         disabled={!swapWrite.write}
                //         onClick={() => {
                //           handleGetRequest();
                //         }}
                //       >
                //         SWAP
                //       </button>
                //     ) : (
                //       ""
                //     )}
                //     {approvalWrite.write && !isApproved ? (
                //       <button
                //         className={styles.buttonswap}
                //         disabled={!approvalWrite.write}
                //         onClick={() => approvalWrite.write?.()}
                //       >
                //         Approve
                //       </button>
                //     ) : (
                //       ""
                //     )}
                //     {/* {error && ( <div>An error occurred preparing the transaction: {error.message}</div> )} */}
                //   </div>
                //   <div className={styles.rightswapbox}>
                //     <div className={styles.to}>TO</div>
                //     <div className={styles.inputNFT}>
                //       <input
                //         name="tonft"
                //         className={styles.input}
                //         value="GODWOKEN"
                //         disabled
                //       ></input>
                //     </div>
                //     <div className={styles.amountandbalance}>
                //       <div className={styles.amount}>1</div>
                //       <div className={styles.unitandbalance}>
                //         <div className={styles.unit}> NFT </div>
                //         {/* <div className={styles.balance}>Balance - </div> */}
                //       </div>
                //     </div>
                //   </div>
                // </div>
                <div></div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profiledesc;
