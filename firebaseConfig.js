import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDRejd3Wp9Gf1e_X74Kk_TndFLm9go8xaE",
    authDomain: "arcanum-reactnative-dsm-2024.firebaseapp.com",
    databaseURL: "https://arcanum-reactnative-dsm-2024-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "arcanum-reactnative-dsm-2024",
    storageBucket: "arcanum-reactnative-dsm-2024.appspot.com",
    messagingSenderId: "330396026299",
    appId: "1:330396026299:web:8dd9d797a06150ba0cb09e"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getDatabase(app);

export { db, auth };