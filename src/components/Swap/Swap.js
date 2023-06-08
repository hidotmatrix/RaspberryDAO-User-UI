import React, { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import {
  useAccount,
  useNetwork,
  useContract,
  useProvider,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import raspberrydao_pic_1 from "../../images/Homepage/Slider/1.svg";
import raspberrydao_pic_2 from "../../images/Homepage/Slider/4.svg";
import raspberrydao_pic_3 from "../../images/Homepage/Slider/5.svg";
import raspberrydao_pic_4 from "../../images/Homepage/Slider/6.svg";
import styles from "./Swap.module.scss";
import bitcoinimg from "../../images/Swap/blockchain-icon.svg";
import GodwokenImg from "../../images/Swap/godwoken-logo-1.svg";
import daologo from "../../images/Swap/SwapLogoW.svg";
import Popup from "../Popup/Popup";
import { ThemeContext } from "../../App";
import sample from "../../images/Sample.svg";
import ABI from "../../ABIs/BridgeABI.json";
import GodwokenNFTs from "../../ABIs/GodwokenNFTs.json";
import {
  GODWOKEN_NFTS_ADDRESS,
  POLYGON_BRIDGE_ADDRESS,
} from "../../constants/constants";
import LoadingSpinner from "../spinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { BsQuestionCircle } from "react-icons/bs";
import SwapPopup from "./SwapPopup";
import { useLocation } from "react-router-dom";

const POLYGON_TESTNET_EXPLORER_BASE_URL = "https://polygonscan.com/tx/";

const GODWOKEN_RPC_URL = "https://v1.mainnet.godwoken.io/rpc";
const godwokenProvider = new ethers.providers.JsonRpcProvider(GODWOKEN_RPC_URL);

function Swap() {
  const navigate = useNavigate();
  const location = useLocation();
  const nft = location.state != null ? location.state : null;
  const themes = useContext(ThemeContext);
  const { theme } = themes;
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [open, setOpen] = useState(false);
  const [swap, setSwap] = useState(nft != null ? true : false);
  const [selected, setSelected] = useState({
    contract: { address: nft != null ? nft.nftdesc.contract.address : "" },
    balance: nft != null ? nft.nftdesc.balance : "",
    tokenId: nft != null ? nft.nftdesc.tokenId : "",
    tokenUri: { gateway: nft != null ? nft.nftdesc.tokenUri?.gateway : "" },
    hasSelected: nft != null ? true : false,
    title: nft != null ? nft.nftdesc.title : "",
    media: nft != null ? nft.nftdesc.media : [],
    selectedNFT_approve_count: 1,
    selectedNFT_swap_count: 1,
    nftTokenType: nft != null ? nft.nftdesc.tokenType : "",
  });
  console.log("Selected NFT", selected);
  let image_url = "";
  try {
    if (selected.media.length !== 0) {
      image_url = selected.media[0].gateway;
    } else {
      image_url = sample;
    }
  } catch (error) {
    //console.log("Error handle", error);
  }

  const [index, setIndex] = useState("0.0");
  const [isApproved, setApproval] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isApprovaltx, seApprovaltx] = useState(false);
  const [isSwaptx, setSwaptx] = useState(false);

  const [probableGodwokenTitle, setGodwokenProbableTitle] = useState("");

  const [popupOpen, setPopupOpen] = useState(false);
  const [txHash, setTxHash] = useState("");

  const provider = useProvider();
  const contract = useContract({
    addressOrName: selected.contract.address,
    contractInterface: GodwokenNFTs.abi,
    signerOrProvider: provider,
  });

  const godwokenContract = useContract({
    addressOrName: GODWOKEN_NFTS_ADDRESS,
    contractInterface: GodwokenNFTs.abi,
    signerOrProvider: godwokenProvider,
  });

  const [picindex, setPicIndex] = useState(0);
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
        setPicIndex((prevIndex) => {
          return prevIndex + 1 < l.length ? prevIndex + 1 : 0;
        });
      }, 1000);
    };
    Changing();
    return () => {
      clearInterval(intervalId);
    };
  }, [l, picindex]);

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

  //console.log("isApproved", isApproved);

  useEffect(() => {
    async function fetch() {
      const totalSupply = await godwokenContract.totalSupply();
      const tokenId = Number(totalSupply.toString()) + 1;
      console.log("Token Id", tokenId.toString());
      const rawUri = `ipfs://QmbHTmDYrtEJXcuJuzhNvp6m2PJexi9KVNweFDZi8Vfmm2/${tokenId}`;
      const Uri = Promise.resolve(rawUri);
      const owner = address;

      const getUri = Uri.then((value) => {
        let str = value;
        let cleanUri = str.replace(
          "ipfs://",
          "https://indigo-defeated-sailfish-361.mypinata.cloud/ipfs/"
        );
        let metadata = axios.get(cleanUri).catch(function (error) {});
        return metadata;
      });

      try {
        getUri.then((value) => {
          let rawImg = value.data.image;
          var name = value.data.name;
          var desc = value.data.description;

          /*
           * Metadata uri has a error of One negative Token Id in NFT Name , so for fixing that
           * incrementing and appending the updated_name in the name of NFT.
           */
          const correct_num = Number(name.charAt(name.length - 1)) + 1;
          const updated_name = name.replace(
            name.charAt(name.length - 1),
            correct_num.toString()
          );
          let image = rawImg.replace(
            "ipfs://",
            "https://indigo-defeated-sailfish-361.mypinata.cloud/ipfs/"
          );

          Promise.resolve(owner).then((value) => {
            let ownerW = value;
            let meta = {
              title: updated_name,
              image: image,
              tokenId: tokenId.toString(),
              wallet: ownerW,
              description: desc,
              balance: 1,
              contract: { address: GODWOKEN_NFTS_ADDRESS },
              tokenUri: { gateway: "" },
            };
            setGodwokenProbableTitle(updated_name);
          });
        });
        await new Promise((r) => setTimeout(r, 1000));
      } catch (error) {}
    }
    fetch();
  }, [address]);

  const gasFees = "0.001";
  const bridgeFee = "0.01";
  const totalFees = Number(gasFees) + Number(bridgeFee);
  const contractType = selected.nftTokenType === "ERC721" ? 0 : 1;
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
      contractType,
      selected.tokenUri?.gateway,
    ],
    overrides: {
      value: ethers.utils.parseEther(totalFees.toString()),
      gasLimit: "1000000",
      //gasPrice: "15000000000",
    },
    onSuccess(data) {
      // console.log("Success", data);
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
      } catch (error) {
        // console.log("Error catch", error);
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
      gasLimit: "1000000",
    },
    onSuccess(data) {
      // console.log("Success Approval", data);
    },
    onError(error) {
      // console.log("Error", error);
    },
  });
  const approvalWrite = useContractWrite(approveContractWrite.config);
  useEffect(() => {
    async function fetch() {
      seApprovaltx(true);
      setIsLoading(true);
      try {
        const data = await approvalWrite.data.wait();
        setApproval(true);
      } catch (error) {
        // console.log("Error catch", error);
        setIsLoading(false);
        seApprovaltx(false);
      } finally {
        setIsLoading(false);
        seApprovaltx(false);
      }
    }
    fetch();
  }, [approvalWrite.data]);

  const Truncate = (str) => {
    return str.length > 40 ? str.substring(0, 37) + "..." : str;
  };

  useEffect(() => {
    // console.clear();
    if (approvalWrite.data && selected.selectedNFT_approve_count < 2) {
      setPopupOpen(true);
      selected.selectedNFT_approve_count =
        selected.selectedNFT_approve_count + 1;
      setTxHash(
        `${POLYGON_TESTNET_EXPLORER_BASE_URL + approvalWrite.data.hash}`
      );
    }
    if (swapWrite.data && selected.selectedNFT_swap_count < 2) {
      setPopupOpen(true);
      selected.selectedNFT_swap_count = selected.selectedNFT_swap_count + 1;
      setTxHash(`${POLYGON_TESTNET_EXPLORER_BASE_URL + swapWrite.data.hash}`);
    }
  }, [approvalWrite, swapWrite]);

  const change = () => {
    setOpen(false);
  };

  const popupchange = () => {
    setPopupOpen(false);
  };

  return (
    <>
      {popupOpen ? (
        <SwapPopup show={popupOpen} switch={popupchange} txhash={txHash} />
      ) : null}
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
              <div className={styles.heading}>
                Trade In Your NFTs With Raspberry DAO
              </div>
              <div className={styles.subheading}>
                Trades on Raspberry DAO are final. Once the transaction is
                signed, your old NFT will be burned and you will receive an all
                new generative-art NFT!
              </div>
              <div className={styles.swapbox}>
                <div className={styles.upperswapbox}>
                  <div className={styles.leftupper}>
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
                        {/* <option value="" disabled selected hidden>
                        Choose a BlockChain
                      </option> */}
                        {chain ? (
                          <option value="Polygon">{chain.name}</option>
                        ) : (
                          ""
                        )}
                        {/* <option value='Ethereum' onClick={() => switchNetwork?.(1)}>Ethereum</option>
                            <option value='XDAI'>XDAI</option> */}
                      </select>
                    </div>
                  </div>
                  <div className={styles.middleupper}>
                    <img src={daologo}></img>
                  </div>
                  <div className={styles.rightupper}>
                    <div className={styles.to}>To</div>
                    <div className={styles.inputNFT}>
                      <img
                        src={GodwokenImg}
                        alt="Ethereum"
                        className={styles.bitcoinimg}
                      ></img>
                      <input
                        name="tonft"
                        className={styles.input}
                        value="GODWOKEN"
                        disabled
                      ></input>
                    </div>
                  </div>
                </div>
                <div className={styles.middleswapbox}>
                  <div className={styles.leftmiddle}>
                    {swap ? (
                      <div className={styles.cardinfo}>
                        <div className={styles.card}>
                          <div className={styles.simage}>
                            <img
                              src={image_url}
                              alt="Sample"
                              className={styles.leftsampleimage}
                            ></img>
                          </div>
                          <div className={styles.aboutcard}>
                            <div className={styles.cardhead}>
                              {Truncate(selected.title)}
                            </div>
                            <div
                              className={styles.edit}
                              onClick={() => setOpen(true)}
                            >
                              Choose a different NFT
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {!swap ? (
                      <div
                        className={styles.choose}
                        onClick={() => setOpen(true)}
                      >
                        <button className={styles.choosenft}>
                          Choose a NFT
                        </button>
                      </div>
                    ) : null}
                  </div>
                  <div className={styles.rightmiddle}>
                    {swap ? (
                      <div className={styles.cardinfo}>
                        <div className={styles.card}>
                          <div className={styles.simage}>
                            <img
                              src={l[picindex]}
                              alt="Sample"
                              className={styles.sampleimage}
                            ></img>
                            <div className={styles.question}>
                              <BsQuestionCircle
                                fontSize="3.5em"
                                data-tip
                                data-for="registerTip"
                                data-place="top"
                                data-padding="16px"
                                data-class={styles.tooltip}
                                data-border={true}
                                data-multiline={true}
                              />
                            </div>
                            <div className={styles.tooltip}>
                              Your NFT will be Randomly Generated.
                            </div>
                          </div>
                          <div className={styles.aboutcard}>
                            <div className={styles.cardhead}>
                              {probableGodwokenTitle}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className={styles.lowerswapbox}>
                  <div className={styles.leftlower}>
                    <div className={styles.amountandbalance}>
                      {selected.hasSelected ? (
                        <div className={styles.amount}>1</div>
                      ) : (
                        <div className={styles.amount}>0</div>
                      )}
                      <div className={styles.unitandbalance}>
                        <div className={styles.unit}> NFT </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.middlelower}>
                    <div className={styles.swapbutton}>
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
                  </div>
                  <div className={styles.rightlower}>
                    <div className={styles.amountandbalance}>
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
              <div className={styles.mobileswapbox}>
                <div className={styles.mobileupperswapbox}>
                  <div className={styles.topupper}>
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
                        {chain ? (
                          <option value="Polygon">{chain.name}</option>
                        ) : (
                          ""
                        )}
                      </select>
                    </div>
                  </div>
                  <div className={styles.middleupper}>
                    {swap ? (
                      <div className={styles.cardinfo}>
                        <div className={styles.card}>
                          <div className={styles.simage}>
                            <img
                              src={image_url}
                              alt="Sample"
                              className={styles.leftsampleimage}
                            ></img>
                          </div>
                          <div className={styles.aboutcard}>
                            <div className={styles.cardhead}>
                              {Truncate(selected.title)}
                            </div>
                            <div
                              className={styles.edit}
                              onClick={() => setOpen(true)}
                            >
                              Choose a different NFT
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {!swap ? (
                      <div
                        className={styles.choose}
                        onClick={() => setOpen(true)}
                      >
                        <button className={styles.choosenft}>
                          Choose a NFT
                        </button>
                      </div>
                    ) : null}
                  </div>
                  <div className={styles.lowerupper}>
                    <div className={styles.amountandbalance}>
                      {selected.hasSelected ? (
                        <div className={styles.amount}>1</div>
                      ) : (
                        <div className={styles.amount}>0</div>
                      )}
                      <div className={styles.unitandbalance}>
                        <div className={styles.unit}> NFT </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.mobilemiddleswapbox}>
                  <div className={styles.swapbutton}>
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
                </div>
                <div className={styles.mobilelowerswapbox}>
                  <div className={styles.toplower}>
                    <div className={styles.to}>To</div>
                    <div className={styles.inputNFT}>
                      <img
                        src={GodwokenImg}
                        alt="Ethereum"
                        className={styles.bitcoinimg}
                      ></img>
                      <input
                        name="tonft"
                        className={styles.input}
                        value="GODWOKEN"
                        disabled
                      ></input>
                    </div>
                  </div>
                  <div className={styles.middlelower}>
                    {swap ? (
                      <div className={styles.cardinfo}>
                        <div className={styles.card}>
                          <div className={styles.simage}>
                            <img
                              src={l[picindex]}
                              alt="Sample"
                              className={styles.sampleimage}
                            ></img>
                            <div className={styles.question}>
                              <BsQuestionCircle
                                fontSize="3.5em"
                                data-tip
                                data-for="registerTip"
                                data-place="top"
                                data-padding="16px"
                                data-class={styles.tooltip}
                                data-border={true}
                                data-multiline={true}
                              />
                            </div>
                            <div className={styles.tooltip}>
                              Your NFT will be Randomly Generated.
                            </div>
                          </div>
                          <div className={styles.aboutcard}>
                            <div className={styles.cardhead}>
                              {probableGodwokenTitle}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className={styles.lowerlower}>
                    <div className={styles.amountandbalance}>
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
          </div>
        )}
      </div>
    </>
  );
}

export default Swap;
