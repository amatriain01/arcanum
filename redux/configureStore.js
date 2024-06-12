import { configureStore } from '@reduxjs/toolkit'
import { autenticacion } from './reducers/autenticacion';

export const ConfigureStore = () => {
    const store = configureStore({
        reducer: {
            autenticacion: autenticacion,
        }
    });

    return store;
}