import React, { Fragment } from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import styles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClasses = [styles.SideDrawer, styles.Close].join(' ');
    if (props.open) {
        attachedClasses = [styles.SideDrawer, styles.Open].join(' ');
    }
    return (
        <Fragment>
            <Backdrop show={props.open} remove={props.close} />
            <div className={attachedClasses}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>
    );
}

export default sideDrawer;
