import React, { Component, Fragment } from 'react';

import Modal from '../../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null
            }
        }

        UNSAFE_componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error })
            })

        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        handleErrorClick = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Fragment>
                    <Modal
                        remove={this.handleErrorClick}
                        show={!!this.state.error}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment >);

        }
    }
}

export default withErrorHandler;
