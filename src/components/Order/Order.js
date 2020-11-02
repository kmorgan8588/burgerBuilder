import React from 'react';
import styles from './Order.module.css';

const order = (props) => {
    const ingredients = Object.entries(props.ingredients)

    const ingredientOutput = ingredients.map(pair => {
        return (
            <span style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
                key={pair[0]}>{pair[0]} ({pair[1]})</span>
        )
    })
    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p> Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default order;
