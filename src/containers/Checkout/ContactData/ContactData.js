import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../../components/UI/Input/Input';
import styles from './ContactData.module.css';
import * as actionCreators from '../../../store/actions/index'
import { updateObject, checkValidity } from '../../../utilities/utility';

const ContactData = (props) => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street Address'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                option: [
                    { value: 'fastest', display: 'Fastest' },
                    { value: 'cheapest', display: 'Cheapest' }]
            },
            value: 'fastest',
            valid: true
        }
    })
    const [validForm, setValidForm] = useState(false)

    const orderHandler = (event) => {
        event.preventDefault();

        const formData = Object.keys(orderForm).reduce((accum, key) => {
            return {
                ...accum,
                [key]: orderForm[key].value
            }
        }, {})

        const order = {
            ingredients: props.ingredients,
            price: props.price,
            userId: props.userId,
            orderDetails: formData
        }
        props.onOrderBurger(order, props.token)

    }

    const inputChangeHandler = (event, formKey) => {
        const updatedOrderForm = updateObject(orderForm, {
            [formKey]: updateObject(orderForm[formKey], {
                value: event.target.value,
                touched: true,
                valid: checkValidity(event.target.value, orderForm[formKey].validation || {})
            })
        })

        let formIsValid = Object.values(updatedOrderForm).every(entry => {
            return entry.valid
        })

        setOrderForm(updatedOrderForm)
        setValidForm(formIsValid)
    }

    let inputs = Object.entries(orderForm).map(([key, entry]) => {
        return (
            <Input
                label={key}
                elementType={entry.elementType}
                elementConfig={entry.elementConfig}
                value={entry.value}
                key={key}
                touched={entry.touched}
                invalid={!entry.valid}
                shouldValidate={entry.validation}
                handleChange={(event) => inputChangeHandler(event, key)} />
        )
    })

    let form = (
        <div className={styles.ContactData}>
            <h4>Enter your Contact Info</h4>
            <form onSubmit={orderHandler}>
                {inputs}
                <Button btnType="Success" disabled={!validForm}>Order</Button>
            </form>
        </div>

    );
    if (props.loading) {
        form = <Spinner />
    }
    return form
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients,
        price: state.burger.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (order, token) => dispatch(actionCreators.purchaseBurger(order, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
