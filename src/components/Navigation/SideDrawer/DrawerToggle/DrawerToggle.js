import React from 'react';
import styles from './DrawerToggle.module.css';
import PropTypes from 'prop-types';

const drawerToggle = (props) => {
    return (
        <div className={styles.DrawerToggle} onClick={props.toggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

drawerToggle.propTypes = {
    toggle: PropTypes.func
}

export default drawerToggle;
