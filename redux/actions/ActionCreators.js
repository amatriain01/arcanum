import * as ActionTypes from './ActionTypes';
import 'firebase/auth';

export const fetchComentarios = () => (dispatch) => {

    dispatch(comentariosLoading());

    return fetch(baseDatosUrl + 'comentarios')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(comentarios => dispatch(addComentarios(comentarios)))
        .catch(error => dispatch(comentariosFailed(error.message)));
};

export const comentariosLoading = () => ({
    type: ActionTypes.COMENTARIOS_LOADING
});

export const comentariosFailed = (errmess) => ({
    type: ActionTypes.COMENTARIOS_FAILED,
    payload: errmess
});

export const addComentarios = (comentarios) => ({
    type: ActionTypes.ADD_COMENTARIOS,
    payload: comentarios
});


export const fetchDiscusiones = () => (dispatch) => {

    dispatch(discusionesLoading());

    return fetch(baseDatosUrl + 'discusiones')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(discusiones => dispatch(addDiscusiones(discusiones)))
        .catch(error => dispatch(discusionesFailed(error.message)));
};

export const discusionesLoading = () => ({
    type: ActionTypes.DISCUSIONES_LOADING
});

export const discusionesFailed = (errmess) => ({
    type: ActionTypes.DISCUSIONES_FAILED,
    payload: errmess
});

export const addDiscusiones = (discusiones) => ({
    type: ActionTypes.ADD_DISCUSIONES,
    payload: discusiones
});


export const fetchEventos = () => (dispatch) => {

    dispatch(eventosLoading());

    return fetch(baseDatosUrl + 'eventos')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(eventos => dispatch(addEventos(eventos)))
        .catch(error => dispatch(eventosFailed(error.message)));
};

export const eventosLoading = () => ({
    type: ActionTypes.EVENTOS_LOADING
});

export const eventosFailed = (errmess) => ({
    type: ActionTypes.EVENTOS_FAILED,
    payload: errmess
});

export const addEventos = (eventos) => ({
    type: ActionTypes.ADD_EVENTOS,
    payload: eventos
});


export const addToPendiente = (idLibro, estado) => ({
    type: ActionTypes.ADD_TO_PENDIENTE,
    payload: idLibro, estado,
});

export const moveToPendiente = (idLibro) => ({
    type: ActionTypes.MOVE_TO_PENDIENTE,
    payload: idLibro,
});

export const addToLeyendo = (idLibro) => ({
    type: ActionTypes.ADD_TO_LEYENDO,
    payload: idLibro,
});

export const moveToLeyendo = (idLibro) => ({
    type: ActionTypes.MOVE_TO_LEYENDO,
    payload: idLibro,
});

export const addToCompletado = (idLibro) => ({
    type: ActionTypes.ADD_TO_COMPLETADO,
    payload: idLibro,
});

export const moveToCompletado = (idLibro) => ({
    type: ActionTypes.MOVE_TO_COMPLETADO,
    payload: idLibro,
});