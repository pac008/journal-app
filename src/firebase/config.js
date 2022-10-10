// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmRST9aVXG9fInDJIxKjNkwkf2xa5Tf6M",
  authDomain: "react-calendar-5b155.firebaseapp.com",
  projectId: "react-calendar-5b155",
  storageBucket: "react-calendar-5b155.appspot.com",
  messagingSenderId: "507293466974",
  appId: "1:507293466974:web:a30643708332b24093cfcf"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp )
export const FirebaseDB = getFirestore( FirebaseApp )