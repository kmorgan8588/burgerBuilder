import React from 'react';
import styles from './Backdrop.module.css';
import PropTypes from 'prop-types';


const backdrop = (props) => {
    return props.show ? <div className={styles.Backdrop} onClick={props.remove}></div> : null
}

backdrop.proptTypes = {
    show: PropTypes.bool.isRequired,
    remove: PropTypes.func.isRequired
}

export default backdrop;
