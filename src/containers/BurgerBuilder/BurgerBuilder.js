import React, { Component, Fragment } from 'react';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import INGREDIENT_PRICES from '../../constants/IngredientPrices';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
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
        axios.get("/ingredients.json")
            .then(res => res.data)
            .then(data => this.setState({
                ingredients: data
            }))
            .catch(err => this.setState({ error: true }))
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
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })

        // alert("Continue")
        // this.setState({
        //     loading: true
        // })
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: "Test Kyle",
        //         address: {
        //             street: "Test Street 1",
        //             zipCode: 12345,
        //             country: "USA"
        //         },
        //         email: "test@test.com"
        //     },
        //     deliveryMethod: "fastest"
        // }
        // axios.post("/orders.json", order)
        //     .then(res => this.setState({
        //         loading: false,
        //         purchasing: false
        //     }))
        //     .catch(err => this.setState({
        //         loading: false,
        //         purchasing: false
        //     }))
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

        let orderSummary = (<OrderSummary
            price={this.state.totalPrice}
            continue={this.purchaseContinueHandler}
            cancel={this.handleRemoveModal}
            ingredients={this.state.ingredients ? this.state.ingredients : {}} />)

        if (this.state.loading) {
            orderSummary = (<Spinner />)
        }

        let burger = this.state.error ? <p>Ingredients could not be loaded!</p> : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Fragment>
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

export default withErrorHandler(BurgerBuilder, axios);
