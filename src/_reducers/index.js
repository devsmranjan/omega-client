import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import loadingReducer from './loadingReducer';
import subscriptionsReducer from './subscriptionsReducer';
import spreadsheetsReducer from './spreadsheetsReducer';

const allReducers = combineReducers({
    error: errorReducer,
    auth: authReducer,
    userProfile: userReducer,
    loading: loadingReducer,
    subscriptions: subscriptionsReducer,
    spreadsheets: spreadsheetsReducer
});

export default allReducers;
