import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            lettuce: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }

    render() {
        const { ingredients } = this.state;
        return (
            <Fragment>
                <Burger ingredients={ingredients} />
                <BuildControls controls={ingredients} />
            </Fragment>
        )
    }
}

export default BurgerBuilder;
