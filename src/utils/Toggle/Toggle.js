import React , {useContext} from 'react'
import styles from './Toggle.module.css'
import {BsFillSunFill , BsFillMoonStarsFill} from 'react-icons/bs'

import { ThemeContext } from "../../App";
function Toggle({ status, setStatus }) {
    const themes = useContext(ThemeContext);
const { theme } = themes;
    return (
        <label className={styles.switch}>
            {status === "light" ? 
            <input className={styles.switchinput} type="checkbox" onClick={() => setStatus(!status)} checked/> :
            <input className={styles.switchinput} type="checkbox" onClick={() => setStatus(!status)} />}
            <span className={styles.switchlabel} data-on="" data-off=""></span>
            <span className={styles.switchhandle}>
                {theme == 'light' ? <BsFillSunFill  className={styles.icon} fontSize="16px"/> : <BsFillMoonStarsFill  className={styles.icon} fontSize="14px"/>}
            </span>
        </label>
    )
}

export default Toggle