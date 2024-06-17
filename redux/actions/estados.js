import * as ActionTypes from './ActionTypes';
import { db } from '../../firebaseConfig';
import { ref, get, push, remove, set } from 'firebase/database';

export const librosEstadosLoading = () => ({
    type: ActionTypes.FETCH_LIBROS_ESTADOS_LOADING
});

export const librosEstadosSuccess = (idsLibros) => ({
    type: ActionTypes.FETCH_LIBROS_ESTADOS_SUCCESS,
    payload: idsLibros
});

export const librosEstadosError = (errMess) => ({
    type: ActionTypes.FETCH_LIBROS_ESTADOS_ERROR,
    payload: errMess
});

export const fetchLibrosEstados = (idUsuario, listName) => {
    return async (dispatch) => {
        dispatch(librosEstadosLoading());

        try {
            const librosRef = ref(db, `estados/${idUsuario}/${listName}`);
            const snapshot = await get(librosRef);
            if (snapshot.exists()) {
                const librosData = snapshot.val();
                const idsLibros = Object.keys(librosData);
                dispatch(librosEstadosSuccess(idsLibros));
            } else {
                createEstadosDefault(idUsuario);
                dispatch(librosEstadosSuccess([]));
            }
        }
        catch (error) {
            dispatch(librosEstadosError(error.message));
        }
    }
}

const createEstadosDefault = async (idUsuario) => {
    const estadosRef = ref(db, `estados/${idUsuario}`);
    await set(estadosRef, {
        Leido: { "1": 1 },
        Leyendo: { "1": 1 },
        Pendiente: { "1": 1 }
    });
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
