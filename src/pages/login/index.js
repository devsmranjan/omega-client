import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import styles from './login.module.css';
import BG1 from '../../assets/background/asset-4.svg';
import LoginComponent from '../../components/Auth/Login';
import { Redirect } from 'react-router-dom';
import routes from '../../utils/routes';

const LoginPage = () => {
    const auth = useSelector((state) => state.auth);

    return (
        <div className={styles.body}>
            {!auth.isLoading && auth.isAuthenticated != null ? (
                auth.isAuthenticated && auth.user ? (
                    <Redirect to={routes.DASHBOARD_PAGE} />
                ) : (
                    <Row>
                        <Col
                            lg="5"
                            className={`${styles.col} ml-4 mr-4 pl-5 pr-5`}
                        >
                            <LoginComponent />
                        </Col>
                        <Col
                            className={`${styles.col} d-none d-lg-block`}
                            style={{
                                backgroundColor: '#f1c40f7a',
                            }}
                        >
                            <div className={styles.bgImgContainer}>
                                <img
                                    src={BG1}
                                    alt=""
                                    style={{ height: '300px' }}
                                />
                            </div>
                        </Col>
                    </Row>
                )
            ) : null}
        </div>
    );
};

export default LoginPage;
