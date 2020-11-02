import React from 'react';
import styles from './Order.module.css';

const order = (props) => {
    return (
        <div className={styles.Order}>
            <p>Ingredients: Lettuce (1)</p>
            <p> Price: <strong>USD 5.45</strong></p>
        </div>
    );
}

export default order;
