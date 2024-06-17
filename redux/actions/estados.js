import * as ActionTypes from './ActionTypes';
import { db } from '../../firebaseConfig';
import { ref, get, push, remove, set } from 'firebase/database';

export const librosEstadosLoading = () => ({
    type: ActionTypes.FETCH_LIBROS_ESTADOS_LOADING
});

export const librosEstadosSuccess = (libros) => ({
    type: ActionTypes.FETCH_LIBROS_ESTADOS_SUCCESS,
    payload: libros
});

export const librosEstadosError = (errMess) => ({
    type: ActionTypes.FETCH_LIBROS_ESTADOS_ERROR,
    payload: errMess
});

export const fetchLibrosEstados = (idUsuario) => {
    return async (dispatch) => {
        dispatch(librosEstadosLoading());

        try {
            const librosRef = ref(db, `estados/${idUsuario}`);
            const snapshot = await get(librosRef);
            if (snapshot.exists()) {
                const librosData = snapshot.val();
                dispatch(librosEstadosSuccess(librosData));
            } else {
                dispatch(librosEstadosError("No se encontraron libros en la base de datos"));
            }
        } catch (error) {
            dispatch(librosEstadosError(error.message));
        }
    };
};

export const addLibroEstadosLoading = () => ({
    type: ActionTypes.ADD_LIBRO_ESTADOS_LOADING
});

export const addLibroEstadosSuccess = (listName, libro) => ({
    type: ActionTypes.ADD_LIBRO_ESTADOS_SUCCESS,
    payload: { listName, libro }
});

export const addLibroEstadosError = (errMess) => ({
    type: ActionTypes.ADD_LIBRO_ESTADOS_ERROR,
    payload: errMess
});

export const addLibroEstados = (idUsuario, listName, libro) => {
    return async (dispatch) => {
        dispatch(addLibroEstadosLoading());

        try {
            const librosRef = ref(db, `estados/${idUsuario}/${listName}`);
            const newLibroRef = push(librosRef);
            await set(newLibroRef, libro);
            dispatch(addLibroEstadosSuccess(listName, { ...libro, idLibro: newLibroRef.key }));
        } catch (error) {
            dispatch(addLibroEstadosError(error.message));
        }
    };
};

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
    };
};

export const moveLibroEstadosLoading = () => ({
    type: ActionTypes.MOVE_LIBRO_ESTADOS_LOADING
});

export const moveLibroEstadosSuccess = (fromList, toList, libro) => ({
    type: ActionTypes.MOVE_LIBRO_ESTADOS_SUCCESS,
    payload: { fromList, toList, libro }
});

export const moveLibroEstadosError = (errMess) => ({
    type: ActionTypes.MOVE_LIBRO_ESTADOS_ERROR,
    payload: errMess
});

export const moveLibroEstados = (idUsuario, fromList, toList, idLibro) => {
    return async (dispatch) => {
        dispatch(moveLibroEstadosLoading());

        try {
            const libroRef = ref(db, `estados/${idUsuario}/${fromList}/${idLibro}`);
            const libroSnapshot = await get(libroRef);
            if (libroSnapshot.exists()) {
                const libro = libroSnapshot.val();
                const newLibroRef = ref(db, `estados/${idUsuario}/${toList}/${idLibro}`);
                await set(newLibroRef, libro);
                await remove(libroRef);
                dispatch(moveLibroEstadosSuccess(fromList, toList, { ...libro, idLibro: idLibro }));
            } else {
                dispatch(moveLibroEstadosError("El libro no existe en la lista de origen"));
            }
        } catch (error) {
            dispatch(moveLibroEstadosError(error.message));
        }
    };
};
