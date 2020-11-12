import { useState, useEffect } from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

    const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
        setError(err)
        throw err
    })

    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setError(null)
        return req;
    })

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        }
    }, [reqInterceptor, resInterceptor, httpClient.interceptors])

    const handleErrorClick = () => {
        setError(null)
    }

    return [error, handleErrorClick]
}