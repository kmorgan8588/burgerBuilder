import React, { Component, Fragment } from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import PropTypes from 'prop-types';


class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <Fragment>
                <Backdrop remove={this.props.remove} show={this.props.show} />
                <div
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh',
                        opacity: this.props.show ? '1' : '0'
                    }}
                    className={styles.Modal}>
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
}

Modal.propTypes = {
    show: PropTypes.bool,
    remove: PropTypes.func
}

export default Modal;
