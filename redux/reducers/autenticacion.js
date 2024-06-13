import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

export const autenticacion = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.REGISTER_LOADING:
        case ActionTypes.LOGIN_LOADING:
        case ActionTypes.LOGOUT_LOADING:
        case ActionTypes.CHECK_AUTH_STATE_LOADING:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.REGISTER_SUCCESS:
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false,
                error: null,
            };
        case ActionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                loading: false,
                error: null,
            };
        case ActionTypes.REGISTER_ERROR:
        case ActionTypes.LOGIN_ERROR:
        case ActionTypes.LOGOUT_ERROR:
        case ActionTypes.CHECK_AUTH_STATE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ActionTypes.CHECK_AUTH_STATE_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: action.payload !== null,
                loading: false,
                error: null,
            };
        case ActionTypes.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};