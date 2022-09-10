import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import Backdrop from '../Backdrop/Backdrop';
import styles from './Popup.module.css';
import cross from '../../images/Cross.svg';
import Catalogue from '../SwapCatalogue/SwapCatalogue';

function Popup(props) {
    const num = [1, 2, 4, 5, 66, 7, 343, 43];
    return (
        <>
            <Backdrop show={props.show} switch={props.switch} />
            <div className={styles.popup}>
                <div className={styles.cross}>
                    <img src={cross} alt="" onClick={props.switch}></img>
                </div>
                <div className={styles.catalogues}>
                    <div className={styles.nfts}>
                        {num.map(() => {
                            return (
                                <Catalogue setSwap = {props.setSwap} setOpen = {props.setOpen}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Popup