import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.module.css';
import { auth, setAuthRedirect } from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';


class Auth extends Component {
    state = {
        controls: {
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
        },
        isSignup: true
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirect !== '/') {
            this.props.onSetAuthRedirectPath()
        }
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

    inputChangeHandler = (event, formKey) => {
        const updatedControls = {
            ...this.state.controls
        }
        const updatedFormElement = {
            ...updatedControls[formKey]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.touched = true
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation || {})
        updatedControls[formKey] = updatedFormElement

        this.setState({
            controls: updatedControls,
        })

    }

    onFormSubmit = (event) => {
        event.preventDefault()
        this.props.onAuthSubmit(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => (
            {
                isSignup: !prevState.isSignup
            }
        ))
    }

    render() {
        if (this.props.isAuthed) {
            return <Redirect to={this.props.authRedirect} />
        }

        let inputs = Object.entries(this.state.controls).map(([key, entry]) => {
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

        if (this.props.loading) {
            inputs = <Spinner />
        }
        let errorMessage = null

        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>
        }

        return (
            <div className={styles.Auth}>
                {errorMessage}
                <form onSubmit={this.onFormSubmit}>
                    {inputs}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>{this.state.isSignup ? "Go to Log In" : "Go to Sign Up"}</Button>
            </div>
        );
    }
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
