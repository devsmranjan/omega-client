import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import routes from './utils/routes';
import Loader from './components/Loader';

const Root = () => {
    const auth = useSelector((state) => state.auth);

    return (
        <div>
            {!auth.isLoading && auth.isAuthenticated != null ? (
                auth.isAuthenticated && auth.user ? (
                    <Redirect to={routes.DASHBOARD_PAGE} />
                ) : (
                    <Redirect to={routes.LOGIN_PAGE} />
                )
            ) : (
                <div>
                    <Loader/>
                </div>
            )}
        </div>
    );
};

export default Root;
