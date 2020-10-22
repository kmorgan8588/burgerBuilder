import React from 'react';
import styles from './Button.module.css';
import PropTypes from 'prop-types';

const button = (props) => {
    return (
        <button onClick={props.clicked} className={[styles.Button, styles[props.btnType]].join(' ')}>
            {props.children}
        </button>
    )
}

button.propTypes = {
    clicked: PropTypes.func,
    btnType: PropTypes.string
}

export default button;
