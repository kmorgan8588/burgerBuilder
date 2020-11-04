import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
// import INGREDIENT_PRICES from '../../constants/IngredientPrices';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    componentDidMount() {
        this.props.onInitIngredients()
    }

    handleRemoveModal = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        const disableOrder = Object.keys(disabledInfo).every(el => !!disabledInfo[el])

        const { ingredients } = this.props;

        let orderSummary = (<OrderSummary
            price={this.props.price}
            continue={this.purchaseContinueHandler}
            cancel={this.handleRemoveModal}
            ingredients={this.props.ingredients ? this.props.ingredients : {}} />)

        if (this.state.loading) {
            orderSummary = (<Spinner />)
        }

        let burger = this.props.error ? <p>Ingredients could not be loaded!</p> : <Spinner />

        if (this.props.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={ingredients} />
                    <BuildControls
                        price={this.props.price}
                        disabled={disabledInfo}
                        add={this.props.onIngredientAdd}
                        del={this.props.onIngredientRemove}
                        controls={ingredients}
                        disableOrder={disableOrder}
                        ordered={this.purchaseHandler} />
                </Fragment>
            )
        }
        return (
            <Fragment>
                <Modal remove={this.handleRemoveModal} show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients,
        price: state.burger.totalPrice,
        error: state.burger.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdd: (ingName) => dispatch(actionCreators.addIngredient(ingName)),
        onIngredientRemove: (ingName) => dispatch(actionCreators.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actionCreators.initIngredients()),
        onPurchaseInit: () => dispatch(actionCreators.purchaseInit())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
