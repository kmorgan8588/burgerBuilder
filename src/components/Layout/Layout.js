import React, { Component, Fragment } from 'react';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: true
    }
    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }
    render() {

        return (
            <Fragment>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    close={this.sideDrawerClosedHandler} />
                <Toolbar />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        )
    }
}

export default Layout;
