import React, { Fragment } from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import PropTypes from 'prop-types';


const Modal = (props) => {
    return (
        <Fragment>
            <Backdrop remove={props.remove} show={props.show} />
            <div
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
                className={styles.Modal}>
                {props.children}
            </div>
        </Fragment>
    )
}

Modal.propTypes = {
    show: PropTypes.bool,
    remove: PropTypes.func
}

export default React.memo(Modal, (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children);
