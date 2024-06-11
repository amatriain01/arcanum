import { configureStore } from '@reduxjs/toolkit'
import { sesion } from './sesion';
import { libros } from './libros';
import { comentarios } from './comentarios';
import { discusiones } from './discusiones';
import { eventos } from './eventos';
import { estados } from './estados';

export const ConfigureStore = () => {
    const store = configureStore({
        reducer: {
            sesion: sesion,
            libros: libros,
            comentarios: comentarios,
            discusiones: discusiones,
            eventos: eventos,
            estados: estados
        },
    });

    return store;
}