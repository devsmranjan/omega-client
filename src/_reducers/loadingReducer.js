import { IS_LOADED, IS_LOADING } from '../_actions/types';

const initialState = {
    isLoading: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case IS_LOADING:
            return {
                ...state,
                isLoading: true,
            };

        case IS_LOADED:
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state;
    }
};
