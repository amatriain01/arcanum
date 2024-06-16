import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    loading: false,
    discusiones: [],
    errMess: null
};

export const discusiones = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.DISCUSIONES_LOADING:
            return { ...state, loading: true, errMess: null };
        case ActionTypes.DISCUSIONES_SUCCESS:
            return { ...state, loading: false, discusiones: action.payload, errMess: null };
        case ActionTypes.DISCUSIONES_ERROR:
            return { ...state, loading: false, errMess: action.payload };
        case ActionTypes.ADD_DISCUSION:
            return { ...state, discusiones: [action.payload, ...state.discusiones] };
        default:
            return state;
    }
};