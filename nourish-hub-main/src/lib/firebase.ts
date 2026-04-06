import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = { apiKey: "AIzaSyA0FHvbPZUeEPwCcda9uY4jcdI63NOc7xY",
     authDomain: "nutricart-353b7.firebaseapp.com", 
     projectId: "nutricart-353b7", 
     storageBucket: "nutricart-353b7.firebasestorage.app", 
     messagingSenderId: "417795267576", 
     appId: "1:417795267576:web:22a8ab8e978a61dc4c540d", 
     measurementId: "G-TJZ3BT75ZM" };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);