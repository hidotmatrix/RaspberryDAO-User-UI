import React from 'react'
import styles from './Footer.module.scss';
import nervos from '../../images/Footer/nervos.svg';
import logo from '../../images/logo.svg';
import logo1 from '../../images/Footer/1.svg';
import logo2 from '../../images/Footer/2.svg';
import logo3 from '../../images/Footer/3.svg';
import logo4 from '../../images/Footer/4.svg';

function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.upperfooter}>
                <div className={styles.upperleft}>
                    <div className={styles.nervos}>
                        <img src={nervos} alt="Nervos"></img>
                    </div>
                    <div className={styles.rasp}>
                        <img src={logo} alt="Raspberry"></img>
                    </div>
                </div>
                <div className={styles.upperright}>
                    <div className={styles.heading}>Wallet and Payment Options</div>
                    <div className={styles.logoimages}>
                        <div className={styles.logos}>
                            <img src={logo1} alt="Logos"></img>
                        </div>
                        <div className={styles.logos}>
                            <img src={logo2} alt="Logos"></img>
                        </div>
                        <div className={styles.logos}>
                            <img src={logo3} alt="Logos"></img>
                        </div>
                        <div className={styles.logoslast}>
                            <img src={logo4} alt="Logos"></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.lowerfooter}>
                <div className={styles.lowerleft}>
                    <div className={styles.copyright}>
                        © Raspberry DAO is a project of the Nervos Foundation. All rights reserved.
                    </div>
                </div>
                <div className={styles.lowerright}>
                    <span className={styles.privacy}>Privacy Policy </span> 
                    <span style={{marginLeft:"10px",marginRight:"10px"}}>|</span>
                    <span className={styles.terms}>Terms and Conditions</span>
                </div>
            </div>
        </div>
    )
}

export default Footer