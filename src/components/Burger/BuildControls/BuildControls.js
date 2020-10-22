import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import PropTypes from 'prop-types';

const buildControls = (props) => {
    const controls = Object.keys(props.controls).map(label => (
        <BuildControl
            disabled={props.disabled[label]}
            key={label}
            clickMore={props.add}
            clickLess={props.del}
            type={label}
            label={label.charAt(0).toUpperCase() + label.substring(1)} />))
    return (
        <div className={styles.BuildControls}>
            <p>Total Price: <strong>${props.price.toFixed(2)}</strong></p>
            {controls}
            <button
                disabled={props.disableOrder}
                className={styles.OrderButton}
                onClick={props.ordered}>ORDER NOW</button>
        </div>
    )
}

buildControls.propTypes = {
    controls: PropTypes.objectOf(PropTypes.number),
    disableOrder: PropTypes.bool,
    ordered: PropTypes.func,
    add: PropTypes.func,
    del: PropTypes.func
}

export default buildControls;
