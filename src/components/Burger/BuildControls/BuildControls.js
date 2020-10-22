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
            {controls}
        </div>
    )
}

export default buildControls;
