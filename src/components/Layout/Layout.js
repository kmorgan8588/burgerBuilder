import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    handleSideDrawerToggle = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        })
    }
    render() {

        return (
            <Fragment>
                <SideDrawer
                    isAuth={this.props.isAuthenitcated}
                    open={this.state.showSideDrawer}
                    close={this.sideDrawerClosedHandler} />
                <Toolbar isAuth={this.props.isAuthenitcated} toggle={this.handleSideDrawerToggle} />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenitcated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout);
