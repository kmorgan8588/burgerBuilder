import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {},
        price: 0
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price;
        for (let param of query) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({
            ingredients: ingredients,
            price: price
        })
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutConfirmedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutConfirmed={this.checkoutConfirmedHandler} />
                <Route path={this.props.match.path + '/contact-data'} render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />} />
            </div>
        )
    }
}

export default Checkout;
