import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {
    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutConfirmedHandler = () => {
        props.history.replace('/checkout/contact-data')
    }

    let summary = <Redirect to="/" />
    if (props.ingredients) {
        const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
        summary = (<div>
            {purchasedRedirect}
            <CheckoutSummary ingredients={props.ingredients}
                checkoutCancelled={checkoutCancelledHandler}
                checkoutConfirmed={checkoutConfirmedHandler} />
            <Route path={props.match.path + '/contact-data'} component={ContactData} />
        </div>)
    }
    return summary;

}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);
