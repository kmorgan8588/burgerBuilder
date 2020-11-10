import React, { useState, useEffect, Fragment } from 'react';

import Modal from '../../../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, setError] = useState(null);

        const resInterceptor = axios.interceptors.response.use(res => res, err => {
            setError(err)
            throw err
        })

        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null)
            return req;
        })

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.request.eject(resInterceptor);
            }
        }, [reqInterceptor, resInterceptor])

        useEffect(() => {
            console.log('Error updated', error)
        }, [error])

        const handleErrorClick = () => {
            setError(null)
        }

        return (
            <Fragment>
                <Modal
                    remove={handleErrorClick}
                    show={!!error}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );
    }
}


export default withErrorHandler;
