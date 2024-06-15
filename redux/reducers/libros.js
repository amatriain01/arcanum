import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    loading: false,
    errMess: null,
    libros: [],
    libro: null
};

export const libros = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LIBROS_LOADING:
        case ActionTypes.DETALLE_LIBRO_LOADING:
            return {
                ...state,
                loading: true,
                errMess: null
            };
        case ActionTypes.LIBROS_SUCCESS:
            return {
                ...state,
                loading: false,
                errMess: null,
                libros: action.payload
            };
        case ActionTypes.LIBROS_ERROR:
        case ActionTypes.DETALLE_LIBRO_ERROR:
            return {
                ...state,
                loading: false,
                errMess: action.payload
            };
        case ActionTypes.DETALLE_LIBRO_SUCCESS:
            return {
                ...state,
                loading: false,
                errMess: null,
                libro: action.payload
            };
        default:
            return state;
    }
}