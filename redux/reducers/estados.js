import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    Leyendo: [],
    Leido: [],
    Pendiente: [],
    loading: false,
    errMess: null
};

export const estados = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_LIBRO_ESTADOS_LOADING:
        case ActionTypes.REMOVE_LIBRO_ESTADOS_LOADING:
        case ActionTypes.MOVE_LIBRO_ESTADOS_LOADING:
        case ActionTypes.FETCH_LIBROS_ESTADOS_LOADING:
            return {
                ...state,
                loading: true,
                errMess: null
            };

        case ActionTypes.ADD_LIBRO_ESTADOS_SUCCESS:
            return {
                ...state,
                loading: false,
                [action.payload.listName]: [...state[action.payload.listName], action.payload.idLibro]
            };

        case ActionTypes.REMOVE_LIBRO_ESTADOS_SUCCESS:
            return {
                ...state,
                loading: false,
                [action.payload.listName]: state[action.payload.listName].filter(id => id !== action.payload.idLibro)
            };

        case ActionTypes.MOVE_LIBRO_ESTADOS_SUCCESS:
            return {
                ...state,
                loading: false,
                [action.payload.fromList]: state[action.payload.fromList].filter(id => id !== action.payload.idLibro),
                [action.payload.toList]: [...state[action.payload.toList], action.payload.idLibro]
            };

        case ActionTypes.FETCH_LIBROS_ESTADOS_SUCCESS_LEIDO:
            return {
                ...state,
                loading: false,
                Leido: action.payload.Leido,
            };

        case ActionTypes.FETCH_LIBROS_ESTADOS_SUCCESS_LEYENDO:
            return {
                ...state,
                loading: false,
                Leyendo: action.payload.Leyendo,
            };

        case ActionTypes.FETCH_LIBROS_ESTADOS_SUCCESS_PENDIENTE:
            return {
                ...state,
                loading: false,
                Pendiente: action.payload.Pendiente,
            };

        case ActionTypes.ADD_LIBRO_ESTADOS_ERROR:
        case ActionTypes.REMOVE_LIBRO_ESTADOS_ERROR:
        case ActionTypes.MOVE_LIBRO_ESTADOS_ERROR:
        case ActionTypes.FETCH_LIBROS_ESTADOS_ERROR:
            return {
                ...state,
                loading: false,
                errMess: action.payload
            };

        default:
            return state;
    }
};