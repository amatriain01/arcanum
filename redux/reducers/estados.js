import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    leyendo: [],
    leido: [],
    pendiente: [],
    loading: false,
    errMess: null
};

export const bookReducer = (state = initialState, action) => {
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
                [action.payload.listName]: [...state[action.payload.listName], action.payload.libro]
            };

        case ActionTypes.REMOVE_LIBRO_ESTADOS_SUCCESS:
            return {
                ...state,
                loading: false,
                [action.payload.listName]: state[action.payload.listName].filter(libro => libro.id !== action.payload.libroId)
            };

        case ActionTypes.MOVE_LIBRO_ESTADOS_SUCCESS:
            const { fromList, toList, libro } = action.payload;
            return {
                ...state,
                loading: false,
                [fromList]: state[fromList].filter(b => b.id !== libro.id),
                [toList]: [...state[toList], libro]
            };

        case ActionTypes.FETCH_LIBROS_ESTADOS_SUCCESS:
            return {
                ...state,
                loading: false,
                ...action.payload
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