import React, { useState, useContext } from 'react'
import styles from './Swap.module.scss'
import bitcoinimg from '../../images/blockchain.svg';
import Popup from '../Popup/Popup';
import { ThemeContext } from "../../App";
import Catalogue from '../Catalogue/Catalogue';
import sample from "../../images/Sample.svg";

function Swap() {
    const themes = useContext(ThemeContext);
    const { theme } = themes;

    const [open, setOpen] = useState(false);
    const [swap, setSwap] = useState(false);
    const change = () => {
        setOpen(false);
    };

    return (
        <div className={theme === "light" ? styles.light : styles.dark}>
            {open ? <Popup show={open} switch={change} swap={swap} setSwap={setSwap} setOpen={setOpen} /> : null}
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
                                // onChange={event => setReason(event.target.value)}
                                required
                            >
                                <option value='' disabled selected hidden> Choose a BlockChain</option>
                                <option value='Ethereum'>Ethereum</option>
                                <option value='Polygon'>Polygon</option>
                                <option value='XDAI'>XDAI</option>
                            </select>
                        </div>
                        {
                            swap ?
                                <div className={styles.cardinfo}>
                                    <div className={styles.card}>
                                        <div className={styles.simage}>
                                            <img src={sample} alt="Sample" className={styles.sampleimage}></img>
                                        </div>
                                        <div className={styles.aboutcard}>
                                            <div className={styles.cardhead}> MS DHONI </div>
                                            <div className={styles.carddesc}> From INDIA </div>
                                        </div>
                                    </div>
                                </div> : null
                        }
                        <div className={styles.choose} onClick={() => setOpen(true)}>
                            <button className={styles.choosenft}>{swap ? 'Edit' : 'Choose A NFT'}</button>
                        </div>
                        <div className={styles.amountandbalance}>
                            <div className={styles.amount}>0.0</div>
                            <div className={styles.unitandbalance}>
                                <div className={styles.unit}> NFT </div>
                                <div className={styles.balance}>Balance - </div>
                            </div>
                        </div>
                    </div>
                    <div className={swap ? styles.swapbuttonopen : styles.swapbutton}>
                        <button className={styles.buttonswap}>Swap</button>
                    </div>
                    <div className={styles.rightswapbox}>
                        <div className={styles.to}>To</div>
                        <div className={styles.inputNFT}>
                            <img src={bitcoinimg} alt="Bitcoin" className={styles.bitcoinimg}></img>
                            <input
                                name="tonft"
                                className={styles.input}
                                value='GODWOKEN'
                                disabled>
                            </input>
                        </div>
                        <div className={swap ? styles.amountandbalancerightopen : styles.amountandbalanceright}>
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
    )
}

export default Swap