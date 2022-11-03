import React, { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import {
  useAccount,
  useNetwork,
  useContract,
  useProvider,
  useSwitchNetwork,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import styles from "./Swap.module.scss";
import bitcoinimg from "../../images/blockchain-icon.svg";
import Popup from "../Popup/Popup";
import { ThemeContext } from "../../App";
import Catalogue from "../Catalogue/Catalogue";
import sample from "../../images/Sample.svg";
import ABI from "../../ABIs/BridgeABI.json";
import GodwokenNFTs from "../../ABIs/GodwokenNFTs.json";
import { POLYGON_BRIDGE_ADDRESS } from "../../constants/constants";
import LoadingSpinner from "../spinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";

function Swap() {
  const navigate = useNavigate();
  const themes = useContext(ThemeContext);
  const { theme } = themes;
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { chains, pendingChainId, switchNetwork } = useSwitchNetwork();
  const GodwokenUrl =
    "https://www.nervos.org/wp-content/uploads/2021/11/godwokenlive-810x456.png";
  const [open, setOpen] = useState(false);
  const [swap, setSwap] = useState(false);
  const [selected, setSelected] = useState({
    contract: { address: "" },
    balance: "",
    tokenId: "",
    tokenUri: { gateway: "" },
    hasSelected: false,
  });
  const [index, setIndex] = useState("0.0");
  const [isApproved, setApproval] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isApprovaltx, seApprovaltx] = useState(false);
  const [isSwaptx, setSwaptx] = useState(false);

  const change = () => {
    setOpen(false);
  };

  const provider = useProvider();
  const contract = useContract({
    addressOrName: selected.contract.address,
    contractInterface: GodwokenNFTs.abi,
    signerOrProvider: provider,
  });

  useEffect(() => {
    async function fetch() {
      const approveFlag = await contract.isApprovedForAll(
        address,
        POLYGON_BRIDGE_ADDRESS
      );
      console.log("Apprval flag", approveFlag);
      setApproval(approveFlag);
    }
    fetch();
  }, [selected, isApproved]);

  const gasFees = "0.001";
  const bridgeFee = "0.01";
  const totalFees = Number(gasFees) + Number(bridgeFee);
  const { config, error, isError } = usePrepareContractWrite({
    addressOrName: POLYGON_BRIDGE_ADDRESS,
    contractInterface: ABI.abi,
    functionName: "deposit",
    args: [
      selected.contract.address,
      selected.balance,
      ethers.utils.parseEther(gasFees),
      "71401",
      selected.tokenId,
      selected.tokenUri.gateway,
    ],
    overrides: {
      value: ethers.utils.parseEther(totalFees.toString()),
      gasLimit: "100000",
    },
    onSuccess(data) {
      console.log("Success", data);
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
    addressOrName:
      selected.contract.address.length === 0
        ? "0x1097adc4251fd08Ac79c2a4f6D8E757268749F25"
        : selected.contract.address,
    contractInterface: GodwokenNFTs.abi,
    functionName: "setApprovalForAll",
    args: [POLYGON_BRIDGE_ADDRESS, true],
    overrides: {
      gasLimit: "100000",
    },
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
        // window.location.reload(false);
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

  return (
    <div className={theme === "light" ? styles.light : styles.dark}>
      {isLoading ? (
        <LoadingSpinner
          isApprovaltx={isApprovaltx}
          isSwaptx={isSwaptx}
          theme={theme}
        />
      ) : (
        <div>
          {open ? (
            <Popup
              show={open}
              switch={change}
              swap={swap}
              setSwap={setSwap}
              setOpen={setOpen}
              selected={selected}
              setSelected={setSelected}
              setIndex={setIndex}
            />
          ) : null}
          <div className={styles.swappage}>
            <div className={styles.heading}>Swap</div>
            <div className={styles.swapbox}>
              <div className={styles.leftswapbox}>
                <div className={styles.from}>From</div>
                <div className={styles.selectNFT}>
                  <img
                    src={bitcoinimg}
                    alt="Bitcoin"
                    className={styles.bitcoinimg}
                  ></img>
                  <select
                    name="choosefrom"
                    id="dropdown"
                    className={styles.select}
                    defaultValue={"DEFAULT"}
                    // onChange={event => setBlockChain(event.target.value)}
                    required
                  >
                    <option value="" disabled selected hidden>
                      {" "}
                      Choose a BlockChain
                    </option>
                    {chain ? <option value="Polygon">{chain.name}</option> : ""}
                    {/* <option value='Ethereum' onClick={() => switchNetwork?.(1)}>Ethereum</option>
                            <option value='XDAI'>XDAI</option> */}
                  </select>
                </div>
                {swap ? (
                  <div className={styles.cardinfo}>
                    <div className={styles.card}>
                      <div className={styles.simage}>
                        <img
                          src={selected.media[0].gateway}
                          alt="Sample"
                          className={styles.sampleimage}
                        ></img>
                      </div>
                      <div className={styles.aboutcard}>
                        <div className={styles.cardhead}>
                          {" "}
                          {selected.title}{" "}
                        </div>
                        {/* <div className={styles.carddesc}> From INDIA </div> */}
                        <div
                          className={styles.edit}
                          onClick={() => setOpen(true)}
                        >
                          Edit
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {!swap ? (
                  <div className={styles.choose} onClick={() => setOpen(true)}>
                    <button className={styles.choosenft}>Choose A NFT</button>
                  </div>
                ) : null}
                <div className={styles.amountandbalance}>
                  {selected.hasSelected ? (
                    <div className={styles.amount}>1</div>
                  ) : (
                    <div className={styles.amount}>0</div>
                  )}
                  <div className={styles.unitandbalance}>
                    <div className={styles.unit}> NFT </div>
                    {/* <div className={styles.balance}>Balance - 12.32</div> */}
                  </div>
                </div>
              </div>
              <div className={swap ? styles.swapbuttonopen : styles.swapbutton}>
                {swapWrite.write && isApproved ? (
                  <button
                    className={styles.buttonswap}
                    disabled={!swapWrite.write}
                    onClick={() => swapWrite.write?.()}
                  >
                    Swap
                  </button>
                ) : (
                  ""
                )}
                {approvalWrite.write && !isApproved ? (
                  <button
                    className={styles.buttonswap}
                    disabled={!approvalWrite.write}
                    onClick={() => approvalWrite.write?.()}
                  >
                    Approve
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className={styles.rightswapbox}>
                <div className={styles.to}>To</div>
                <div className={styles.inputNFT}>
                  <img
                    src={GodwokenUrl}
                    alt="Bitcoin"
                    className={styles.bitcoinimg}
                  ></img>
                  <input
                    name="tonft"
                    className={styles.input}
                    value="GODWOKEN"
                    disabled
                  ></input>
                </div>
                <div
                  className={
                    swap
                      ? styles.amountandbalancerightopen
                      : styles.amountandbalanceright
                  }
                >
                  {selected.hasSelected ? (
                    <div className={styles.amount}>1</div>
                  ) : (
                    <div className={styles.amount}>0</div>
                  )}
                  <div className={styles.unitandbalance}>
                    <div className={styles.unit}> NFT </div>
                    {/* <div className={styles.balance}>Balance - 10.72</div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Swap;
