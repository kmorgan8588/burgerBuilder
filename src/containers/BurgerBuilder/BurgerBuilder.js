import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import INGREDIENT_PRICES from '../../constants/IngredientPrices';


class BurgerBuilder extends Component {
    state = {
        ingredients: {
            lettuce: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        console.log(type)
        const value = this.state.ingredients[type] + 1;
        console.log('new value', value)
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

    render() {
        const { ingredients } = this.state;
        return (
            <Fragment>
                <Burger ingredients={ingredients} />
                <BuildControls add={this.addIngredientHandler} del={this.removeIngredientHandler} controls={ingredients} />
            </Fragment>
        )
    }
}

export default BurgerBuilder;
