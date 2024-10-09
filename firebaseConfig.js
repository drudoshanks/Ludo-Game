// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBd0LZYBy_Ur1uSrvh8D2uzor9ClOJm0lc",
    authDomain: "ludo-game-db9db.firebaseapp.com",
    projectId: "ludo-game-db9db",
    storageBucket: "ludo-game-db9db.appspot.com",
    messagingSenderId: "100357792215",
    appId: "1:100357792215:web:fdf4adc0bddc4cfe92eb92",
    measurementId: "G-R0NSF81P65"
  };

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const firestore = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);

export const db = app.firestore();