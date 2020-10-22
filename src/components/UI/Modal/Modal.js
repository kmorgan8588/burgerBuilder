import React from 'react';
import styles from './Modal.module.css';

const modal = (props) => {
    return (
        <div
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh',
                opacity: props.show ? '1' : '0'
            }}
            className={styles.Modal}>
            {props.children}
        </div>
    );
}

export default modal;
