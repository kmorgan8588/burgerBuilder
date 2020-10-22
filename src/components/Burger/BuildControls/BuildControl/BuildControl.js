import React from 'react';
import styles from './BuildControl.module.css';
import PropTypes from 'prop-types';

const buildControl = (props) => {
    return (
        <div className={styles.BuildControl}>
            <div className={styles.Label}>{props.label}</div>
            <button
                disabled={props.disabled}
                className={styles.Less}
                onClick={() => props.clickLess(props.type)}>Less</button>
            <button
                className={styles.More}
                onClick={() => props.clickMore(props.type)}>More</button>
        </div>
    )
}

buildControl.propTypes = {
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    clickLess: PropTypes.func.isRequired,
    clickMore: PropTypes.func.isRequired
}

export default buildControl;
