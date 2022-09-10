import React from 'react';
import styles from './Backdrop.module.scss';

const Backdrop = (props) => (
    props.show ? <div className={styles.Backdrop} onClick={props.switch}></div> : null
);

export default Backdrop;