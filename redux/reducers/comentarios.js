import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    loading: false,
    comentarios: [],
    errMess: null,
    valoracionesMedias: {}
};

export const comentarios = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.COMENTARIOS_LOADING:
            return { ...state, loading: true, errMess: null };
        case ActionTypes.COMENTARIOS_SUCCESS:
            return { ...state, loading: false, comentarios: action.payload, errMess: null };
        case ActionTypes.COMENTARIOS_ERROR:
            return { ...state, loading: false, errMess: action.payload };
        case ActionTypes.ADD_COMENTARIO:
            return { ...state, comentarios: [action.payload, ...state.comentarios] };
        case ActionTypes.COMENTARIOS_VALORACION_MEDIA:
            return { ...state, loading: false, valoracionesMedias: { ...state.valoracionesMedias, [action.payload.idLibro]: action.payload.valoracionMedia, } };
        default:
            return state;
    }
}