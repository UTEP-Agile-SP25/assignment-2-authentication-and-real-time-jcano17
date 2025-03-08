// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrBkSAG9UdGIHsSC_SiCfbN6IuOkw8TJ8",
  authDomain: "sandboxlive-43597.firebaseapp.com",
  projectId: "sandboxlive-43597",
  storageBucket: "sandboxlive-43597.firebasestorage.app",
  messagingSenderId: "912451411127",
  appId: "1:912451411127:web:4af46418e9d78cafe04132",
  measurementId: "G-2R99PGE0RP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app