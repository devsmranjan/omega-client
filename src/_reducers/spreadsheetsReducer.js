import {
    ADD_SPREADSHEET_SUCCESS,
    CLEAR_SPREADSHEET_DATA,
    FETCH_SPREADSHEETS_FROM_API_SUCCESS,
    FETCH_SPREADSHEET_TABS_SUCCESS,
    FETCH_SUBSCRIBED_SPREADSHEETS_FROM_API_SUCCESS,
    REMOVE_SPREADSHEET_FAIL,
    REMOVE_SPREADSHEET_SUCCESS,
} from '../_actions/types';

const initialState = {
    success: false,
    message: '',
    allSpreadsheets: null,
    allTabs: null,
    subscribedSpreadsheets: null,
    id: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SPREADSHEETS_FROM_API_SUCCESS:
            return {
                ...state,
                success: action.payload.success,
                message: action.payload.message,
                allSpreadsheets: action.payload.data.spreadsheets,
                id: FETCH_SPREADSHEETS_FROM_API_SUCCESS,
            };

        case FETCH_SPREADSHEET_TABS_SUCCESS:
            return {
                ...state,
                success: action.payload.success,
                message: action.payload.message,
                allTabs: action.payload.data.spreadsheetTabs,
                id: FETCH_SPREADSHEET_TABS_SUCCESS,
            };

        case ADD_SPREADSHEET_SUCCESS:
            return {
                ...state,
                id: ADD_SPREADSHEET_SUCCESS,
            };

        case FETCH_SUBSCRIBED_SPREADSHEETS_FROM_API_SUCCESS:
            return {
                ...state,
                success: action.payload.success,
                message: action.payload.message,
                subscribedSpreadsheets: action.payload.data,
                id: FETCH_SUBSCRIBED_SPREADSHEETS_FROM_API_SUCCESS,
            };

        case REMOVE_SPREADSHEET_SUCCESS:
            return {
                ...state,
                success: action.payload.success,
                message: action.payload.message,
                id: REMOVE_SPREADSHEET_SUCCESS,
            };

        case REMOVE_SPREADSHEET_FAIL:
            return {
                ...state,
                success: false,
                message: '',
                id: REMOVE_SPREADSHEET_FAIL,
            };

        case CLEAR_SPREADSHEET_DATA:
            return initialState;

        default:
            return state;
    }
};
