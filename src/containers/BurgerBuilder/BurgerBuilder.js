import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import INGREDIENT_PRICES from '../../constants/IngredientPrices';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            lettuce: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasing: false
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    addIngredientHandler = (type) => {
        const value = this.state.ingredients[type] + 1;
        const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;
        this.setState({
            ingredients: {
                ...this.state.ingredients,
                [type]: value
            },
            totalPrice: newPrice
        })
    }

    removeIngredientHandler = (type) => {
        const value = this.state.ingredients[type] - 1;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        if (value < 0) {
            return
        }

        this.setState({
            ingredients: {
                ...this.state.ingredients,
                [type]: value
            },
            totalPrice: newPrice
        })

    }

    handleRemoveModal = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        alert("Continue")
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        const disableOrder = Object.keys(disabledInfo).every(el => !!disabledInfo[el])

        const { ingredients } = this.state;

        return (
            <Fragment>
                <Modal remove={this.handleRemoveModal} show={this.state.purchasing}>
                    <OrderSummary
                        price={this.state.totalPrice}
                        continue={this.purchaseContinueHandler}
                        cancel={this.handleRemoveModal}
                        ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={ingredients} />
                <BuildControls
                    price={this.state.totalPrice}
                    disabled={disabledInfo}
                    add={this.addIngredientHandler}
                    del={this.removeIngredientHandler}
                    controls={ingredients}
                    disableOrder={disableOrder}
                    ordered={this.purchaseHandler} />
            </Fragment>
        )
    }
}

export default BurgerBuilder;
