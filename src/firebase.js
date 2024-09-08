// src/firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // Import Firestore for database

// Firebase configuration (Replace with your actual Firebase config details)
const firebaseConfig = {
    apiKey: "AIzaSyC_KrvTt6lg1itLamZggDibNrurXXNzTFQ",
    authDomain: "portfolio-2c20f.firebaseapp.com",
    projectId: "portfolio-2c20f",
    storageBucket: "portfolio-2c20f.appspot.com",
    messagingSenderId: "760716869329",
    appId: "1:760716869329:web:4a01e33e1e1365ccb64ff0",
    measurementId: "G-DPY3BYZK8S"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Firestore database
const firestore = firebase.firestore();
export { firestore };
