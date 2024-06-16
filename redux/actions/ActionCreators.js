import * as ActionTypes from './ActionTypes';
import 'firebase/auth';

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