import * as ActionTypes from './ActionTypes';
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';

const extractUserData = (user) => ({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
});


export const registerLoading = () => ({
    type: ActionTypes.REGISTER_LOADING
});

export const registerSuccess = (userData) => ({
    type: ActionTypes.REGISTER_SUCCESS,
    payload: userData
});

export const registerError = (errMess) => ({
    type: ActionTypes.REGISTER_ERROR,
    payload: errMess
});

export const registerUser = (nombre, apellido, email, password) => {
    return async (dispatch) => {
        dispatch(registerLoading());
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: `${nombre} ${apellido}`
            });
            const userData = extractUserData(userCredential.user);
            dispatch(registerSuccess(userData));
        } catch (error) {
            dispatch(registerError(error.message));
        }
    };
};


export const loginLoading = () => ({
    type: ActionTypes.LOGIN_LOADING
});

export const loginSuccess = (userData) => ({
    type: ActionTypes.LOGIN_SUCCESS,
    payload: userData
});

export const loginError = (errMess) => ({
    type: ActionTypes.LOGIN_ERROR,
    payload: errMess
});

export const loginUser = (email, password) => {
    return async (dispatch) => {
        dispatch(loginLoading());
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userData = extractUserData(userCredential.user);
            dispatch(loginSuccess(userData));
        } catch (error) {
            dispatch(loginError(error.message));
        }
    };
};


export const logoutLoading = () => ({
    type: ActionTypes.LOGOUT_LOADING
});

export const logoutSuccess = () => ({
    type: ActionTypes.LOGOUT_SUCCESS
});

export const logoutError = (errMess) => ({
    type: ActionTypes.LOGOUT_ERROR,
    payload: errMess
});

export const logoutUser = () => {
    return async (dispatch) => {
        dispatch(logoutLoading());
        try {
            await signOut(auth);
            dispatch(logoutSuccess());
        } catch (error) {
            dispatch(logoutError(error.message));
        }
    };
};


export const checkAuthStateLoading = () => ({
    type: ActionTypes.CHECK_AUTH_STATE_LOADING
});

export const checkAuthStateSuccess = (userData) => ({
    type: ActionTypes.CHECK_AUTH_STATE_SUCCESS,
    payload: userData
});

export const checkAuthStateError = (errMess) => ({
    type: ActionTypes.CHECK_AUTH_STATE_ERROR,
    payload: errMess
});

export const checkAuthState = () => {
    return (dispatch) => {
        dispatch(checkAuthStateLoading());
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userData = extractUserData(user);
                dispatch(checkAuthStateSuccess(userData));
            } else {
                dispatch(checkAuthStateSuccess(null));
            }
        }, (error) => {
            dispatch(checkAuthStateError(error.message));
        });

        return unsubscribe;
    };
};

export const clearError = () => ({
    type: ActionTypes.CLEAR_ERROR
});
