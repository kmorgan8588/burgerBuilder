import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import PropTypes from 'prop-types';


const toolbar = (props) => {
    return (
        <header className={styles.Toolbar}>
            <DrawerToggle toggle={props.toggle} />
            <div className={styles.Logo}>
                <Logo />
            </div>
            <nav className={styles.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}

toolbar.propTypes = {
    toggle: PropTypes.func.isRequired
}

export default toolbar;
