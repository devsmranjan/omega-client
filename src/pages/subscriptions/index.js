import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import routes from '../../utils/routes';
import {
    updateSubscribedUser,
    fetchSubscriptions,
} from '../../_actions/subscriptionsAction';
import {
    FETCH_SUBSCRIPTIONS_FAIL,
    REMOVE_SUBSCRIPTION_SUCCESS,
    UPDATE_SUBSCRIBED_USER_FAIL,
    UPDATE_SUBSCRIBED_USER_SUCCESS,
} from '../../_actions/types';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { clearErrors } from '../../_actions/errorActions';
import SubscribedComponent from '../../components/Subscribed';
import styles from './subscriptions.module.css';
import RaisedButton from '../../components/RaisedButton';
import axios from 'axios';
import AddDataImg from '../../assets/add_data.svg';
import { ADD_SUBSCRIPTION } from '../../utils/apiEndpoints';

const SubscriptionsPage = (props) => {
    const params = queryString.parse(props.location.search);
    const auth = useSelector((state) => state.auth);
    const error = useSelector((state) => state.error);
    const subscriptions = useSelector((state) => state.subscriptions);

    const dispatch = useDispatch();

    // message
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (
            error.id === UPDATE_SUBSCRIBED_USER_FAIL ||
            error.id === FETCH_SUBSCRIPTIONS_FAIL
        ) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('');
        }

        if (!subscriptions.isSubProcComplete) {
            if (
                params.uid &&
                params.email &&
                params.accessToken &&
                params.refreshToken &&
                params.idToken
            ) {
                dispatch(updateSubscribedUser(params));
            }
        }

        if (
            !subscriptions.isSubProcComplete ||
            subscriptions.id === UPDATE_SUBSCRIBED_USER_SUCCESS
        ) {
            dispatch(fetchSubscriptions());
        }
    }, [error]);

    const handleAlertClose = () => {
        dispatch(clearErrors());
    };

    const handleSubscribe = async () => {
        try {
            const response = await axios.get(ADD_SUBSCRIPTION, tokenConfig());

            if (response.data.data.authURL) {
                window.location.href = response.data.data.authURL;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const tokenConfig = () => {
        // Get token from local storage
        const token = localStorage.getItem('token');

        // Headers
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // if token then add to header
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    };

    return (
        <Container className={styles.body}>
            {!auth.isLoading && auth.isAuthenticated != null ? (
                !auth.isAuthenticated ? (
                    <Redirect to={routes.LOGIN_PAGE} />
                ) : (
                    <div>
                        {errorMessage ? (
                            <Alert
                                variant="danger"
                                onClose={handleAlertClose}
                                dismissible
                            >
                                {errorMessage}
                            </Alert>
                        ) : null}

                        {subscriptions.subscriptions != null ? (
                            subscriptions.subscriptions.length > 0 ? (
                                <div className={styles.totalSubContainer}>
                                    <Row>
                                        <Col md={8}>
                                            <h6
                                                className="mt-2 heading-title"
                                                style={{
                                                    color:
                                                        'var(--color-primary)',
                                                }}
                                            >
                                                You have{' '}
                                                {
                                                    subscriptions.subscriptions
                                                        .length
                                                }{' '}
                                                {subscriptions.subscriptions
                                                    .length > 1
                                                    ? 'subscriptions'
                                                    : 'subscription'}
                                                .
                                            </h6>
                                        </Col>
                                        <Col md={4}>
                                            <div
                                                style={{
                                                    textAlign: 'right',
                                                    marginTop: '8px',
                                                }}
                                            >
                                                <RaisedButton
                                                    isInverse={true}
                                                    title="Add subscription"
                                                    onClick={handleSubscribe}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            ) : null
                        ) : null}

                        {subscriptions.subscriptions != null ? (
                            subscriptions.subscriptions.length > 0 ? (
                                subscriptions.subscriptions.map((sub, i) => (
                                    <SubscribedComponent key={i} sub={sub} />
                                ))
                            ) : (
                                <div
                                    style={{
                                        height: 'calc(100vh - 180px)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div style={{ textAlign: 'center' }}>
                                        <img
                                            src={AddDataImg}
                                            className={styles.addDataImg}
                                            alt="Add data"
                                        />
                                        <br />
                                        <RaisedButton
                                            title="Add subscription"
                                            onClick={handleSubscribe}
                                        />
                                    </div>
                                </div>
                            )
                        ) : null}
                    </div>
                )
            ) : null}
        </Container>
    );
};

export default withRouter(SubscriptionsPage);
