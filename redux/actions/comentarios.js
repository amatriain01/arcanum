import * as ActionTypes from './ActionTypes';
import { db } from '../../firebaseConfig';
import { ref, get, push } from 'firebase/database';

export const comentariosLoading = () => ({
    type: ActionTypes.COMENTARIOS_LOADING
});

export const comentariosSuccess = (comentarios) => ({
    type: ActionTypes.COMENTARIOS_SUCCESS,
    payload: comentarios
});

export const comentariosError = (errMess) => ({
    type: ActionTypes.COMENTARIOS_ERROR,
    payload: errMess
});

export const fetchComentarios = (idLibro) => {
    return async (dispatch) => {
        dispatch(comentariosLoading());

        try {
            const comentariosRef = ref(db, 'comentarios');
            const snapshot = await get(comentariosRef);
            if (snapshot.exists()) {
                const comentariosData = snapshot.val();
                const comentariosList = Object.keys(comentariosData)
                    .map(key => ({ id: key, ...comentariosData[key] }))
                    .filter(comment => comment.idLibro === idLibro);

                dispatch(comentariosSuccess(comentariosList));
            } else {
                dispatch(comentariosError("No se encontraron comentarios para este libro"));
            }
        } catch (error) {
            dispatch(comentariosError(error.message));
        }
    };
};


export const addComentario = (comentario) => ({
    type: ActionTypes.ADD_COMENTARIO,
    payload: comentario
})

export const postComentario = (comentario) => {
    return async (dispatch) => {
        try {
            const comentariosRef = ref(db, 'comentarios');
            await push(comentariosRef, comentario);
            dispatch(addComentario(comentario));
            dispatch(fetchComentarios(comentario.idLibro));
        } catch (error) {
            dispatch(comentariosError(error.message));
        }
    };
};