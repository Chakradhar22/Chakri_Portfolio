// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC_KrvTt6lg1itLamZggDibNrurXXNzTFQ",
    authDomain: "portfolio-2c20f.firebaseapp.com",
    projectId: "portfolio-2c20f",
    storageBucket: "portfolio-2c20f.appspot.com",
    messagingSenderId: "760716869329",
    appId: "1:760716869329:web:4a01e33e1e1365ccb64ff0",
    measurementId: "G-DPY3BYZK8S"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
