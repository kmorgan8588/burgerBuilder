import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import styles from './ContactData.module.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: this.state.name,
                address: {
                    street: "Test Street 1",
                    zipCode: 12345,
                    country: "USA"
                },
                email: this.state.email
            },
            deliveryMethod: "fastest"
        }
        axios.post("/orders.json", order)
            .then(res => this.setState({
                loading: false,
            }, () => this.props.history.push('/')))
            .catch(err => this.setState({
                loading: false,
            }))
    }

    render() {
        let form = (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Info</h4>
                <form>
                    <input type="text" name="name" placeholder="Your Name" />
                    <input type="email" name="email" placeholder="Your Email" />
                    <input type="text" name="street" placeholder="Your Street" />
                    <input type="text" name="postalCode" placeholder="Your Postal Code" />
                    <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
                </form>
            </div>

        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return form
    }
}

export default ContactData;
