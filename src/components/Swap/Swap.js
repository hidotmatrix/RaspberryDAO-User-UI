import React, { useState, useContext } from 'react'
import { useAccount, useNetwork, useContract, useProvider, useSwitchNetwork, usePrepareContractWrite, useContractWrite } from "wagmi";
import styles from './Swap.module.scss'
import bitcoinimg from '../../images/blockchain-icon.svg';
import Popup from '../Popup/Popup';
import { ThemeContext } from "../../App";
import Catalogue from '../Catalogue/Catalogue';
import sample from "../../images/Sample.svg";
import ABI from "../../ABIs/BridgeABI.json"
import { POLYGON_BRIDGE_ADDRESS } from '../../constants/constants';

function Swap() {
    const themes = useContext(ThemeContext);
    const { theme } = themes;
    const { chain } = useNetwork();
    const { chains, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
    const GodwokenUrl = 'https://www.nervos.org/wp-content/uploads/2021/11/godwokenlive-810x456.png';
    const [open, setOpen] = useState(false);
    const [swap, setSwap] = useState(false);
    const [selected, setSelected] = useState({contract: {address :""},balance:"",tokenId:"",tokenUri:{gateway:""}});
    const [index,setIndex] = useState("0.0");

    const change = () => {
        setOpen(false);
    };
    const gasFees = "1000"; 
    const { config, error, isError } = usePrepareContractWrite({
        addressOrName: POLYGON_BRIDGE_ADDRESS,
        contractInterface: ABI.abi,
        functionName: 'deposit',
        args: [selected.contract.address,selected.balance,gasFees,"71401",selected.tokenId,selected.tokenUri.gateway],
        onSuccess(data) {
          console.log("Success", data)
        },
      })
      const { data, write } = useContractWrite(config)

    return (
        <div className={theme === "light" ? styles.light : styles.dark}>
            {open ? <Popup show={open} switch={change} swap={swap} setSwap={setSwap} setOpen={setOpen} selected={selected} setSelected={setSelected} setIndex={setIndex}/> : null}
            <div className={styles.swappage}>
                <div className={styles.heading}>Swap</div>
                <div className={styles.swapbox}>
                    <div className={styles.leftswapbox}>
                        <div className={styles.from}>From</div>
                        <div className={styles.selectNFT}>
                            <img src={bitcoinimg} alt="Bitcoin" className={styles.bitcoinimg}></img>
                            <select
                                name='choosefrom'
                                id='dropdown'
                                className={styles.select}
                                defaultValue={'DEFAULT'} 
                                // onChange={event => setBlockChain(event.target.value)}
                                required
                            >
                                <option value='' disabled selected hidden> Choose a BlockChain</option>
                               { chain ? <option value='Polygon'>{chain.name}</option>:""}
                                {/* <option value='Ethereum' onClick={() => switchNetwork?.(1)}>Ethereum</option>
                                <option value='XDAI'>XDAI</option> */}
                            </select>
                        </div>
                        {
                            swap ?
                                <div className={styles.cardinfo}>
                                    <div className={styles.card}>
                                        <div className={styles.simage}>
                                            <img src={selected.media[0].gateway} alt="Sample" className={styles.sampleimage}></img>
                                        </div>
                                        <div className={styles.aboutcard}>
                                            <div className={styles.cardhead}> {selected.title} </div>
                                            {/* <div className={styles.carddesc}> From INDIA </div> */}
                                            <div className={styles.edit} onClick={() => setOpen(true)}>
                                                Edit
                                            </div>
                                        </div>
                                    </div>
                                </div> : null
                        }
                        {!swap ?
                            <div className={styles.choose} onClick={() => setOpen(true)}>
                                <button className={styles.choosenft}>Choose A NFT</button>
                            </div> : null}
                        <div className={styles.amountandbalance}>
                        {selected?<div className={styles.amount}>1</div>:<div className={styles.amount}>0</div>}
                            <div className={styles.unitandbalance}>
                                <div className={styles.unit}> NFT </div>
                                {/* <div className={styles.balance}>Balance - 12.32</div> */}
                            </div>
                        </div>
                    </div>
                    <div className={swap ? styles.swapbuttonopen : styles.swapbutton}>
                        <button className={styles.buttonswap} disabled={!write} onClick={() => write?.()}>SWAP</button>
                    </div>
                    <div className={styles.rightswapbox}>
                        <div className={styles.to}>To</div>
                        <div className={styles.inputNFT}>
                            <img src={GodwokenUrl} alt="Bitcoin" className={styles.bitcoinimg}></img>
                            <input
                                name="tonft"
                                className={styles.input}
                                value='GODWOKEN'
                                disabled>
                            </input>
                        </div>
                        <div className={swap ? styles.amountandbalancerightopen : styles.amountandbalanceright}>
                            {selected?<div className={styles.amount}>1</div>:<div className={styles.amount}>0</div>}
                            <div className={styles.unitandbalance}>
                                <div className={styles.unit}> NFT </div>
                                {/* <div className={styles.balance}>Balance - 10.72</div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Swap