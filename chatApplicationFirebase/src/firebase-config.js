// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBrUD_3oUlbfRuTGNbOCqv1GYkSFsw8TA",
  authDomain: "chatapplication-cc28e.firebaseapp.com",
  projectId: "chatapplication-cc28e",
  storageBucket: "chatapplication-cc28e.appspot.com",
  messagingSenderId: "973896208579",
  appId: "1:973896208579:web:8a0c66c6d6630261509276",
  measurementId: "G-MCP3CVX70F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);