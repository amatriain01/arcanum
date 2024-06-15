import { configureStore } from '@reduxjs/toolkit'
import { autenticacion } from './reducers/autenticacion';
import { libros } from './reducers/libros';

export const ConfigureStore = () => {
    const store = configureStore({
        reducer: {
            autenticacion: autenticacion,
            libros: libros
        }
    });

    return store;
}