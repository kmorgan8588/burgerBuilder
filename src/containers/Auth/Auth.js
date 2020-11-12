import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.module.css';
import { auth, setAuthRedirect } from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../utilities/utility';


const Auth = (props) => {
    const [loginForm, setLoginForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    })
    const [isSignup, setIsSignup] = useState(true)
    const { buildingBurger, authRedirect, onSetAuthRedirectPath } = props;

    useEffect(() => {
        if (!buildingBurger && authRedirect !== '/') {
            onSetAuthRedirectPath()
        }
    }, [buildingBurger, authRedirect, onSetAuthRedirectPath])

    const inputChangeHandler = (event, formKey) => {
        const updatedControls = updateObject(loginForm, {
            [formKey]: updateObject(loginForm[formKey], {
                value: event.target.value,
                touched: true,
                valid: checkValidity(event.target.value, loginForm[formKey].validation || {})
            })
        })

        setLoginForm(updatedControls)

    }

    const onFormSubmit = (event) => {
        event.preventDefault()
        props.onAuthSubmit(loginForm.email.value, loginForm.password.value, isSignup)
    }

    const switchAuthModeHandler = () => {
        setIsSignup(prevState => !prevState)
    }

    if (props.isAuthed) {
        return <Redirect to={props.authRedirect} />
    }

    let inputs = Object.entries(loginForm).map(([key, entry]) => {
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

    if (props.loading) {
        inputs = <Spinner />
    }
    let errorMessage = null

    if (props.error) {
        errorMessage = <p>{props.error.message}</p>
    }

    return (
        <div className={styles.Auth}>
            {errorMessage}
            <form onSubmit={onFormSubmit}>
                {inputs}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button btnType="Danger" clicked={switchAuthModeHandler}>{isSignup ? "Go to Log In" : "Go to Sign Up"}</Button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthed: !!state.auth.token,
        buildingBurger: state.burger.building,
        authRedirect: state.auth.redirectPath
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthSubmit: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(setAuthRedirect('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
