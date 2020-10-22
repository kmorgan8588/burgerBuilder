import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            lettuce: 1,
            bacon: 2,
            cheese: 2,
            meat: 2
        }
    }

    render() {
        const { ingredients } = this.state;
        return (
            <Fragment>
                <Burger ingredients={ingredients} />
                <div>Build Controls</div>
            </Fragment>
        )
    }
}

export default BurgerBuilder;
