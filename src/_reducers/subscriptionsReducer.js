import {
    FETCH_SUBSCRIPTIONS_FAIL,
    FETCH_SUBSCRIPTIONS_SUCCESS,
    UPDATE_SUBSCRIBED_USER_FAIL,
    UPDATE_SUBSCRIBED_USER_SUCCESS,
    REMOVE_SUBSCRIPTION_SUCCESS,
    REMOVE_SUBSCRIPTION_FAIL,
} from '../_actions/types';

const initialState = {
    success: false,
    message: '',
    subscriptions: null,
    isSubProcComplete: false,
    id: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SUBSCRIBED_USER_SUCCESS:
            return {
                ...state,
                isSubProcComplete: true,
                id: UPDATE_SUBSCRIBED_USER_SUCCESS,
            };

        case FETCH_SUBSCRIPTIONS_SUCCESS:
            return {
                ...state,
                success: action.payload.success,
                message: action.payload.message,
                subscriptions: action.payload.data.subscriptions,
                id: FETCH_SUBSCRIPTIONS_SUCCESS,
            };

        case UPDATE_SUBSCRIBED_USER_FAIL:
            return {
                ...state,
                success: false,
                message: '',
                isSubProcComplete: true,
                id: UPDATE_SUBSCRIBED_USER_FAIL,
            };

        case FETCH_SUBSCRIPTIONS_FAIL:
            return initialState;

        case REMOVE_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                success: action.payload.success,
                message: action.payload.message,
                subscriptions: null,
                id: REMOVE_SUBSCRIPTION_SUCCESS,
            };

        case REMOVE_SUBSCRIPTION_FAIL:
            return {
                ...state,
                success: false,
                message: '',
                id: REMOVE_SUBSCRIPTION_FAIL,
            };

        default:
            return state;
    }
};
