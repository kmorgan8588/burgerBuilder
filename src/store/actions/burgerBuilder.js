import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_ING_FAILED
    }
}

const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get("/ingredients.json")
            .then(res => res.data)
            .then(data => dispatch(setIngredients(data)))
            .catch(err => dispatch(fetchIngredientsFailed()))
    }
}