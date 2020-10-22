import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';
import PropTypes from 'prop-types';

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
            <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType={"Danger"} clicked={props.cancel}>CANCEL</Button>
            <Button btnType={"Success"} clicked={props.continue}>CONTINUE</Button>
        </Fragment>
    )
}

orderSummary.propTypes = {
    ingredients: PropTypes.objectOf(PropTypes.number),
    price: PropTypes.number,
    cancel: PropTypes.func,
    continue: PropTypes.func
}

export default orderSummary;
