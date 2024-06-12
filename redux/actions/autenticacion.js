import * as ActionTypes from './ActionTypes';
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const extractUserData = (user) => ({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
});

export const registerUser = (email, password) => {
    return async (dispatch) => {
        dispatch({ type: ActionTypes.REGISTER_LOADING });
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userData = extractUserData(userCredential.user);
            dispatch({ type: ActionTypes.REGISTER_SUCCESS, payload: userData });
        } catch (error) {
            dispatch({ type: ActionTypes.REGISTER_ERROR, payload: error.message });
        }
    };
};

export const loginUser = (email, password) => {
    return async (dispatch) => {
        dispatch({ type: ActionTypes.LOGIN_LOADING });
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userData = extractUserData(userCredential.user);
            dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: userData });
        } catch (error) {
            dispatch({ type: ActionTypes.LOGIN_ERROR, payload: error.message });
        }
    };
};

export const logoutUser = () => {
    return async (dispatch) => {
        dispatch({ type: ActionTypes.LOGOUT_LOADING });
        try {
            await signOut(auth);
            dispatch({ type: ActionTypes.LOGOUT_SUCCESS });
        } catch (error) {
            dispatch({ type: ActionTypes.LOGOUT_ERROR, payload: error.message });
        }
    };
};

export const checkAuthState = () => {
    return async (dispatch) => {
        dispatch({ type: ActionTypes.CHECK_AUTH_STATE_LOADING });
        try {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    dispatch({ type: ActionTypes.CHECK_AUTH_STATE_SUCCESS, payload: user });
                } else {
                    dispatch({ type: ActionTypes.CHECK_AUTH_STATE_SUCCESS, payload: null });
                }
            });
        } catch (error) {
            dispatch({ type: ActionTypes.CHECK_AUTH_STATE_ERROR, payload: error.message });
        }
    };
};