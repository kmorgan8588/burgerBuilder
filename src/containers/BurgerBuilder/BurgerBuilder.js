import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Fragment>
                <Burger />
                <div>Build Controls</div>
            </Fragment>
        )
    }
}

export default BurgerBuilder;
