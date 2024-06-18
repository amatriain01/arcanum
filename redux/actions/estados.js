import * as ActionTypes from './ActionTypes';
import { db } from '../../firebaseConfig';
import { ref, get, push, remove, set } from 'firebase/database';

export const librosEstadosLoading = () => ({
    type: ActionTypes.FETCH_LIBROS_ESTADOS_LOADING
});

export const librosEstadosError = (errMess) => ({
    type: ActionTypes.FETCH_LIBROS_ESTADOS_ERROR,
    payload: errMess
});

export const librosEstadosSuccess = (Leyendo, Leido, Pendiente) => ({
    type: ActionTypes.FETCH_LIBROS_ESTADOS_SUCCESS,
    payload: { Leyendo, Leido, Pendiente }
});

export const fetchLibrosEstados = (idUsuario) => {
    return async (dispatch) => {
        dispatch(librosEstadosLoading());

        try {
            const leyendoRef = ref(db, `estados/${idUsuario}/Leyendo`);
            const leyendoSnap = await get(leyendoRef);
            const idsLeyendo = [];
            leyendoSnap.forEach((child) => {
                idsLeyendo.push(child.key);
            });
            const leidoRef = ref(db, `estados/${idUsuario}/Leido`);
            const leidoSnap = await get(leidoRef);
            const idsLeido = [];
            leidoSnap.forEach((child) => {
                idsLeido.push(child.key);
            });
            const pendienteRef = ref(db, `estados/${idUsuario}/Pendiente`);
            const pendienteSnap = await get(pendienteRef);
            const idsPendiente = [];
            pendienteSnap.forEach((child) => {
                idsPendiente.push(child.key);
            });
            dispatch(librosEstadosSuccess(idsLeyendo, idsLeido, idsPendiente));
        } catch (error) {
            dispatch(librosEstadosError(error.message));
        }
    }
}


export const addLibroEstadosLoading = () => ({
    type: ActionTypes.ADD_LIBRO_ESTADOS_LOADING
});

export const addLibroEstadosSuccess = (listName, idLibro) => ({
    type: ActionTypes.ADD_LIBRO_ESTADOS_SUCCESS,
    payload: { listName, idLibro }
});

export const addLibroEstadosError = (errMess) => ({
    type: ActionTypes.ADD_LIBRO_ESTADOS_ERROR,
    payload: errMess
});

export const addLibroEstados = (idUsuario, listName, idlibro) => {
    return async (dispatch) => {
        dispatch(addLibroEstadosLoading());

        try {
            const newLibroRef = ref(db, `estados/${idUsuario}/${listName}/${idlibro}`);
            await set(newLibroRef, idlibro);
            dispatch(addLibroEstadosSuccess(listName, idlibro));
        } catch (error) {
            dispatch(addLibroEstadosError(error.message));
        }
    };
}


export const removeLibroEstadosLoading = () => ({
    type: ActionTypes.REMOVE_LIBRO_ESTADOS_LOADING
});

export const removeLibroEstadosSuccess = (listName, idLibro) => ({
    type: ActionTypes.REMOVE_LIBRO_ESTADOS_SUCCESS,
    payload: { listName, idLibro }
});

export const removeLibroEstadosError = (errMess) => ({
    type: ActionTypes.REMOVE_LIBRO_ESTADOS_ERROR,
    payload: errMess
});

export const removeLibroEstados = (idUsuario, listName, idLibro) => {
    return async (dispatch) => {
        dispatch(removeLibroEstadosLoading());

        try {
            const libroRef = ref(db, `estados/${idUsuario}/${listName}/${idLibro}`);
            await remove(libroRef);
            dispatch(removeLibroEstadosSuccess(listName, idLibro));
        } catch (error) {
            dispatch(removeLibroEstadosError(error.message));
        }
    }
}

export const moveLibroEstadosLoading = () => ({
    type: ActionTypes.MOVE_LIBRO_ESTADOS_LOADING
});

export const moveLibroEstadosSuccess = (fromList, toList, idLibro) => ({
    type: ActionTypes.MOVE_LIBRO_ESTADOS_SUCCESS,
    payload: { fromList, toList, idLibro }
});

export const moveLibroEstadosError = (errMess) => ({
    type: ActionTypes.MOVE_LIBRO_ESTADOS_ERROR,
    payload: errMess
});

export const moveLibroEstados = (idUsuario, fromList, toList, idLibro) => {
    return async (dispatch) => {
        dispatch(moveLibroEstadosLoading());

        try {
            const fromRef = ref(db, `estados/${idUsuario}/${fromList}/${idLibro}`);
            const toRef = ref(db, `estados/${idUsuario}/${toList}/${idLibro}`);
            await remove(fromRef);
            await set(toRef, idLibro);
            dispatch(moveLibroEstadosSuccess(fromList, toList, idLibro));
        } catch (error) {
            dispatch(moveLibroEstadosError(error.message));
        }
    }
}
