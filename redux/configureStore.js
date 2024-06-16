import { configureStore } from '@reduxjs/toolkit'
import { autenticacion } from './reducers/autenticacion';
import { libros } from './reducers/libros';
import { comentarios } from './reducers/comentarios'
import { discusiones } from './reducers/discusiones'

export const ConfigureStore = () => {
    const store = configureStore({
        reducer: {
            autenticacion: autenticacion,
            libros: libros,
            comentarios: comentarios,
            discusiones: discusiones
        }
    });

    return store;
}