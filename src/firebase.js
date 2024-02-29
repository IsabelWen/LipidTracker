import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "lipidtracker.firebaseapp.com",
  projectId: "lipidtracker",
  storageBucket: "lipidtracker.appspot.com",
  messagingSenderId: "525783394348",
  appId: "1:525783394348:web:ee5d544809b9b31a7b8989"
};

// Initialize Firebase and Cloud Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth()