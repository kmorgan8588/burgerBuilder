import React from 'react';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';
import styles from './Burger.module.css';


const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(ingredient => {
        return [...Array(props.ingredients[ingredient]).fill('').map((_, i) =>
            (<BurgerIngredient key={ingredient + i} type={ingredient} />))]
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, [])

    if (transformedIngredients.length === 0) {
        transformedIngredients = (<p>Please begin adding ingredients!</p>)
    }

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />

        </div>
    );
}

export default burger;
