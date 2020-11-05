import axios from 'axios';
import * as actionTypes from './actionTypes';
import 'dotenv/config';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime)
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart())

        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`;
        if (!isSignup) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`
        }

        axios.post(url, { email, password, returnSecureToken: true })
            .then(res => {
                dispatch(authSuccess(res.data.idToken, res.data.localId))
                dispatch(checkAuthTimeout(res.data.expiresIn * 1000))
            })
            .catch(err => dispatch(authFail(err.response.data.error)))
    }
}
