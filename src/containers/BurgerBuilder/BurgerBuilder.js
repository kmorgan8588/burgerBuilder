import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';

const BurgerBuilder = (props) => {
    const [purchasing, setPurchasing] = useState(false)
    const { onInitIngredients } = props;
    const purchaseHandler = () => {
        if (props.isAuthed) {
            setPurchasing(true)
        } else {
            props.onSetRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }

    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients])

    const handleRemoveModal = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        props.onPurchaseInit();
        props.history.push('/checkout')
    }

    const disabledInfo = {
        ...props.ingredients
    }
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    const disableOrder = Object.keys(disabledInfo).every(el => !!disabledInfo[el])



    let orderSummary = (<OrderSummary
        price={props.price}
        continue={purchaseContinueHandler}
        cancel={handleRemoveModal}
        ingredients={props.ingredients ? props.ingredients : {}} />)

    let burger = props.error ? <p>Ingredients could not be loaded!</p> : <Spinner />

    if (props.ingredients) {
        burger = (
            <Fragment>
                <Burger ingredients={props.ingredients} />
                <BuildControls
                    isAuth={props.isAuthed}
                    price={props.price}
                    disabled={disabledInfo}
                    add={props.onIngredientAdd}
                    del={props.onIngredientRemove}
                    controls={props.ingredients}
                    disableOrder={disableOrder}
                    ordered={purchaseHandler} />
            </Fragment>
        )
    }
    return (
        <Fragment>
            {purchasing ? (<Modal remove={handleRemoveModal} show={purchasing}>{orderSummary}
            </Modal>) : null}
            {burger}
        </Fragment>
    )

}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients,
        price: state.burger.totalPrice,
        error: state.burger.error,
        isAuthed: !!state.auth.token,
        redirectPath: state.auth.redirectPath
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdd: (ingName) => dispatch(actionCreators.addIngredient(ingName)),
        onIngredientRemove: (ingName) => dispatch(actionCreators.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actionCreators.initIngredients()),
        onPurchaseInit: () => dispatch(actionCreators.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(actionCreators.setAuthRedirect(path))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
