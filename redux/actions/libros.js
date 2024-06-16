import * as ActionTypes from './ActionTypes';
import { db } from '../../firebaseConfig';
import { ref, get } from 'firebase/database';

export const librosLoading = () => ({
    type: ActionTypes.LIBROS_LOADING
});

export const librosSuccess = (libros) => ({
    type: ActionTypes.LIBROS_SUCCESS,
    payload: libros
});

export const librosError = (errMess) => ({
    type: ActionTypes.LIBROS_ERROR,
    payload: errMess
});

export const fetchLibros = () => {
    return async (dispatch) => {
        dispatch(librosLoading());

        try {
            const librosRef = ref(db, 'libros');
            const snapshot = await get(librosRef);
            if (snapshot.exists()) {
                const librosData = snapshot.val();
                dispatch(librosSuccess(librosData));
            } else {
                dispatch(librosError("No se encontraron libros en la base de datos"));
            }
        } catch (error) {
            dispatch(librosError(error.message));
        }
    };
};


export const detalleLibroLoading = () => ({
    type: ActionTypes.DETALLE_LIBRO_LOADING
});

export const detalleLibroSuccess = (libro) => ({
    type: ActionTypes.DETALLE_LIBRO_SUCCESS,
    payload: libro
});

export const detalleLibroError = (errMess) => ({
    type: ActionTypes.DETALLE_LIBRO_ERROR,
    payload: errMess
});

export const fetchDetalleLibro = (idLibro) => {
    return async (dispatch) => {
        dispatch(detalleLibroLoading());

        try {
            const libroRef = ref(db, `libros/${idLibro}`);
            const snapshot = await get(libroRef);
            if (snapshot.exists()) {
                const libroData = snapshot.val();
                dispatch(detalleLibroSuccess(libroData));
            } else {
                dispatch(detalleLibroError("No se encontró el id del libro: " + idLibro));
            }
        } catch (error) {
            dispatch(detalleLibroError(error.message));
        }
    };
};