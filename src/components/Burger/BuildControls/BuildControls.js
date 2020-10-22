import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';


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
            <button disabled={props.disableOrder} className={styles.OrderButton}>ORDER NOW</button>
        </div>
    )
}

export default buildControls;
