import React, { Fragment } from 'react';
import useHttpErrorHandler from '../../../hooks/http-error-handler';
import Modal from '../../../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, handleErrorClick] = useHttpErrorHandler(axios)

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
