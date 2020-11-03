import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

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
        loading: false,
        error: false
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    componentDidMount() {
        // axios.get("/ingredients.json")
        //     .then(res => res.data)
        //     .then(data => this.setState({
        //         ingredients: data
        //     }))
        //     .catch(err => this.setState({ error: true }))
    }

    handleRemoveModal = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
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

        let burger = this.state.error ? <p>Ingredients could not be loaded!</p> : <Spinner />

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
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdd: (ing) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ing }),
        onIngredientRemove: (ing) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ing })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
