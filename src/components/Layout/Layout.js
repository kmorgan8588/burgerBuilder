import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false)

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false)
    }

    const handleSideDrawerToggle = () => {
        setShowSideDrawer(prevState => !prevState)
    }

    return (
        <Fragment>
            <SideDrawer
                isAuth={props.isAuthenitcated}
                open={showSideDrawer}
                close={sideDrawerClosedHandler} />
            <Toolbar isAuth={props.isAuthenitcated} toggle={handleSideDrawerToggle} />
            <main className={styles.Content}>
                {props.children}
            </main>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenitcated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout);
