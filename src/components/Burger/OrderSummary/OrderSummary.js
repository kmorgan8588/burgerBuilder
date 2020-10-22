import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(key => (
            <li key={key}>
                <span style={{ textTransform: 'capitalize' }}>{key}</span>
                : {props.ingredients[key]}</li>
        ))
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button btnType={"Danger"}>CANCEL</Button>
            <Button btnType={"Success"}>CONTINUE</Button>
        </Fragment>
    )
}

export default orderSummary;
