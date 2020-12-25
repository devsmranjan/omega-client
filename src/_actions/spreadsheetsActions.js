import apiEndpoints, {
    SPREADSHEETS_ENDPOINT,
    SPREADSHEETS_FROM_API,
    SPREADSHEET_TABS_FROM_API,
    SUBSCRIPTIONS_ENDPOINT,
} from '../utils/apiEndpoints';
import { clearErrors, returnErrors } from './errorActions';
import {
    ADD_SPREADSHEET_FAIL,
    ADD_SPREADSHEET_SUCCESS,
    CLEAR_SPREADSHEET_DATA,
    FETCH_SPREADSHEETS_FROM_API_FAIL,
    FETCH_SPREADSHEETS_FROM_API_SUCCESS,
    FETCH_SPREADSHEET_TABS_FAIL,
    FETCH_SPREADSHEET_TABS_SUCCESS,
    FETCH_SUBSCRIBED_SPREADSHEETS_FROM_API_FAIL,
    FETCH_SUBSCRIBED_SPREADSHEETS_FROM_API_SUCCESS,
    REMOVE_SPREADSHEET_FAIL,
    REMOVE_SPREADSHEET_SUCCESS,
} from './types';
import axios from 'axios';

export const getSheetsFromAPI = (sub) => async (dispatch) => {
    try {
        const auth = {
            access_token: sub.accessToken,
            refresh_token: sub.refreshToken,
            scope: sub.scope,
            token_type: sub.tokenType,
            expiry_date: sub.expiryDate,
        };

        const response = await axios.post(
            SPREADSHEETS_FROM_API,
            auth,
            tokenConfig()
        );

        // console.log(response.data);

        dispatch({
            type: FETCH_SPREADSHEETS_FROM_API_SUCCESS,
            payload: response.data,
        });

        dispatch(clearErrors());
    } catch (error) {
        dispatch(
            returnErrors(
                error.response.data.success,
                error.response.data.message || 'Something went wrong',
                error.response.data.error,
                FETCH_SPREADSHEETS_FROM_API_FAIL
            )
        );
    }
};

export const getSheetTabsFromAPI = (sub, spreadsheetId) => async (dispatch) => {
    try {
        const auth = {
            access_token: sub.accessToken,
            refresh_token: sub.refreshToken,
            scope: sub.scope,
            token_type: sub.tokenType,
            expiry_date: sub.expiryDate,
        };

        const response = await axios.post(
            SPREADSHEET_TABS_FROM_API,
            { ...auth, spreadsheetId: spreadsheetId },
            tokenConfig()
        );

        console.log(response.data);

        dispatch({
            type: FETCH_SPREADSHEET_TABS_SUCCESS,
            payload: response.data,
        });

        dispatch(clearErrors());
    } catch (error) {
        dispatch(
            returnErrors(
                error.response.data.success,
                error.response.data.message || 'Something went wrong',
                error.response.data.error,
                FETCH_SPREADSHEET_TABS_FAIL
            )
        );
    }
};

export const addSubscribedSpreadsheet = (data) => async (dispatch) => {
    try {
        await axios.put(SPREADSHEETS_ENDPOINT, data, tokenConfig());
        // handleCloseModal(true);

        dispatch({
            type: ADD_SPREADSHEET_SUCCESS,
        });

        dispatch(clearErrors());
    } catch (error) {
        dispatch(
            returnErrors(
                error.response.data.success,
                error.response.data.message || 'Something went wrong',
                error.response.data.error,
                ADD_SPREADSHEET_FAIL
            )
        );
    }
};

// remove subscribed spreadsheet
export const removeSubscribedSpreadsheet = (sheetId) => async (dispatch) => {
    try {
        const response = await axios.delete(
            `${apiEndpoints.SPREADSHEETS_ENDPOINT}/${sheetId}`,
            tokenConfig()
        );

        //  setSubscriptionList(response.data.data.subscriptions);
        dispatch({
            type: REMOVE_SPREADSHEET_SUCCESS,
            payload: response.data,
        });

        // window.location.reload();
    } catch (error) {
        dispatch(
            returnErrors(
                error.response.data.success,
                error.response.data.message || 'Something went wrong',
                error.response.data.error,
                REMOVE_SPREADSHEET_FAIL
            )
        );
    }
};

export const getSubscribedSpreadsheetFromAPI = (sheet) => async (dispatch) => {
    try {
        const subResponse = await axios.get(
            `${SUBSCRIPTIONS_ENDPOINT}?uid=${sheet.uid}`,
            tokenConfig()
        );

        const auth = {
            access_token: subResponse.data.data.subscriptions[0].accessToken,
            refresh_token: subResponse.data.data.subscriptions[0].refreshToken,
            scope: subResponse.data.data.subscriptions[0].scope,
            id_token: subResponse.data.data.subscriptions[0].idToken,
            token_type: subResponse.data.data.subscriptions[0].tokenType,
            expiry_date: subResponse.data.data.subscriptions[0].expiryDate,
        };

        const sheetResponse = await axios.post(
            `${SPREADSHEETS_ENDPOINT}/spreadsheetFromAPI`,
            {
                ...auth,
                spreadsheetId: sheet.sheetId,
                tab: sheet.sheetTab,
                spreadsheetTitle: sheet.sheetTitle,
            },
            tokenConfig()
        );

        console.log(sheetResponse.data);

        dispatch({
            type: FETCH_SUBSCRIBED_SPREADSHEETS_FROM_API_SUCCESS,
            payload: sheetResponse.data,
        });

        dispatch(clearErrors());
        dispatch(clearSpreadsheetData());
    } catch (error) {
        dispatch(
            returnErrors(
                error.response.data.success,
                error.response.data.message || 'Something went wrong',
                error.response.data.error,
                FETCH_SUBSCRIBED_SPREADSHEETS_FROM_API_FAIL
            )
        );
    }
};

export const clearSpreadsheetData = () => async (dispatch) => {
    dispatch({
        type: CLEAR_SPREADSHEET_DATA,
    });
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
