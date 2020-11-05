import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../../components/UI/Input/Input';
import styles from './ContactData.module.css';
import * as actionCreators from '../../../store/actions/index'

class ContactData extends Component {
    state = {
        orderForm: {
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
        },
        formIsValid: false,
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        })
        const formData = Object.keys(this.state.orderForm).reduce((accum, key) => {
            return {
                ...accum,
                [key]: this.state.orderForm[key].value
            }
        }, {})

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            userId: this.props.userId,
            orderDetails: formData
        }
        this.props.onOrderBurger(order, this.props.token)
    }

    inputChangeHandler = (event, formKey) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[formKey]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.touched = true
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation || {})
        updatedOrderForm[formKey] = updatedFormElement


        let formIsValid = Object.values(this.state.orderForm).every(entry => {
            return entry.valid
        })

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })

    }
    render() {
        let inputs = Object.entries(this.state.orderForm).map(([key, entry]) => {
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
                    handleChange={(event) => this.inputChangeHandler(event, key)} />
            )
        })

        let form = (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Info</h4>
                <form onSubmit={this.orderHandler}>
                    {inputs}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
                </form>
            </div>

        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return form
    }
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
