import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AllSpreadsheets from '../../components/Dashboard/AllSpreadsheets';
import routes from '../../utils/routes';

const DashboardPage = () => {
    const auth = useSelector((state) => state.auth);

    return (
        <Container fluid className="">
            {!auth.isLoading && auth.isAuthenticated != null ? (
                !auth.isAuthenticated ? (
                    <Redirect to={routes.LOGIN_PAGE} />
                ) : (
                    <div>
                        <AllSpreadsheets />
                    </div>
                )
            ) : null}
        </Container>
    );
};

export default DashboardPage;
