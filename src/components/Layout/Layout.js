import React, { Fragment } from 'react';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) => {
    return (
        <Fragment>
            <SideDrawer />
            <Toolbar />
            <main className={styles.Content}>
                {props.children}
            </main>
        </Fragment>
    )
}

export default layout;
