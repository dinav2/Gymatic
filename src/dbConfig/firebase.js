// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrHJSqarwnDFGuKVSDEDKi3QUMo2M1BEs",
  authDomain: "proyecto-iot-a3b0d.firebaseapp.com",
  databaseURL: "https://proyecto-iot-a3b0d-default-rtdb.firebaseio.com",
  projectId: "proyecto-iot-a3b0d",
  storageBucket: "proyecto-iot-a3b0d.appspot.com",
  messagingSenderId: "166956550297",
  appId: "1:166956550297:web:42b550fae054c8c2e65008",
  measurementId: "G-5EWFHBD5SC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const rtdb = getDatabase(app);  
export const auth = getAuth(app);  