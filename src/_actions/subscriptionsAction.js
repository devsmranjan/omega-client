import axios from 'axios';
import apiEndpoints from '../utils/apiEndpoints';
import { clearErrors, returnErrors } from './errorActions';
import {
    UPDATE_SUBSCRIBED_USER_FAIL,
    FETCH_SUBSCRIPTIONS_SUCCESS,
    FETCH_SUBSCRIPTIONS_FAIL,
    UPDATE_SUBSCRIBED_USER_SUCCESS,
    REMOVE_SUBSCRIPTION_SUCCESS,
    REMOVE_SUBSCRIPTION_FAIL,
} from './types';

// update newly subscribed in database
export const updateSubscribedUser = (params) => async (dispatch) => {
    try {
        await axios.put(
            apiEndpoints.SUBSCRIPTIONS_ENDPOINT,
            params,
            tokenConfig()
        );

        dispatch({
            type: UPDATE_SUBSCRIBED_USER_SUCCESS,
        });

        dispatch(clearErrors());
    } catch (error) {
        dispatch(
            returnErrors(
                error.response.data.success,
                error.response.data.message || 'Something went wrong',
                error.response.data.error,
                UPDATE_SUBSCRIBED_USER_FAIL
            )
        );

        dispatch({
            type: UPDATE_SUBSCRIBED_USER_FAIL,
        });
    }

    // window.location.href = '/subscriptions';
};

// fetch all subscriptions
export const fetchSubscriptions = () => async (dispatch) => {
    try {
        const response = await axios.get(
            apiEndpoints.SUBSCRIPTIONS_ENDPOINT,
            tokenConfig()
        );
        dispatch({
            type: FETCH_SUBSCRIPTIONS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch(
            returnErrors(
                error.response.data.success,
                error.response.data.message || 'Something went wrong',
                error.response.data.error,
                FETCH_SUBSCRIPTIONS_FAIL
            )
        );
    }
};

// fetch all subscriptions
export const fetchSubscriptionByUID = (uid) => async (dispatch) => {
    try {
        const response = await axios.get(
            `${apiEndpoints.SUBSCRIPTIONS_ENDPOINT}?uid=${uid}`,
            tokenConfig()
        );

        //  setSubscriptionList(response.data.data.subscriptions);
        dispatch({
            type: FETCH_SUBSCRIPTIONS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch(
            returnErrors(
                error.response.data.success,
                error.response.data.message || 'Something went wrong',
                error.response.data.error,
                FETCH_SUBSCRIPTIONS_FAIL
            )
        );
    }
};

// remove subscription
export const removeSubscription = (uid) => async (dispatch) => {
    try {
        const response = await axios.delete(
            `${apiEndpoints.SUBSCRIPTIONS_ENDPOINT}/${uid}`,
            tokenConfig()
        );

        //  setSubscriptionList(response.data.data.subscriptions);
        dispatch({
            type: REMOVE_SUBSCRIPTION_SUCCESS,
            payload: response.data,
        });

        window.location.reload();
    } catch (error) {
        dispatch(
            returnErrors(
                error.response.data.success,
                error.response.data.message || 'Something went wrong',
                error.response.data.error,
                REMOVE_SUBSCRIPTION_FAIL
            )
        );
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
