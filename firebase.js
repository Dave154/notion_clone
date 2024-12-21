import { initializeApp,getApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyAxpUdNHeDecFw_dYI-uQO6vSIwAyME9IU",
    authDomain: "notionclone-e9d78.firebaseapp.com",
    projectId: "notionclone-e9d78",
    storageBucket: "notionclone-e9d78.firebasestorage.app",
    messagingSenderId: "155714744115",
    appId: "1:155714744115:web:72df3ee223f90b27335846",
    measurementId: "G-M7GQ9WHGJR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db =getFirestore(app)

export {db}