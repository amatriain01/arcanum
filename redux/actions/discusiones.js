import * as ActionTypes from './ActionTypes';
import { db } from '../../firebaseConfig';
import { ref, get, push } from 'firebase/database';

export const discusionesLoading = () => ({
    type: ActionTypes.DISCUSIONES_LOADING
});

export const discusionesSuccess = (discusiones) => ({
    type: ActionTypes.DISCUSIONES_SUCCESS,
    payload: discusiones
});

export const discusionesError = (errMess) => ({
    type: ActionTypes.DISCUSIONES_ERROR,
    payload: errMess
});

export const fetchDiscusiones = (idLibro) => {
    return async (dispatch) => {
        dispatch(discusionesLoading());

        try {
            const discusionesRef = ref(db, 'discusiones');
            const snapshot = await get(discusionesRef);
            if (snapshot.exists()) {
                const discusionesData = snapshot.val();
                const discusionesList = Object.keys(discusionesData)
                    .map(key => ({ id: key, ...discusionesData[key] }))
                    .filter(discussion => discussion.idLibro === idLibro);

                dispatch(discusionesSuccess(discusionesList));
            } else {
                dispatch(discusionesError("No se encontraron discusiones para este libro"));
            }
        } catch (error) {
            dispatch(discusionesError(error.message));
        }
    };
};


export const addDiscusion = (discusion) => ({
    type: ActionTypes.ADD_DISCUSION,
    payload: discusion
})

export const postDiscusion = (discusion) => {
    return async (dispatch) => {
        try {
            const discusionesRef = ref(db, 'discusiones');
            await push(discusionesRef, discusion);
            dispatch(addDiscusion(discusion));
            dispatch(fetchDiscusiones(discusion.idLibro));
        } catch (error) {
            dispatch(discusionesError(error.message));
        }
    };
};