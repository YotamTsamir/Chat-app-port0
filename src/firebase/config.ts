// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBATwFKQBxdEwJlW5ri10tW2ZkCli9EQrA",
  authDomain: "port0-5da3c.firebaseapp.com",
  projectId: "port0-5da3c",
  storageBucket: "port0-5da3c.firebasestorage.app",
  messagingSenderId: "687113062459",
  appId: "1:687113062459:web:430b3a6c82b26a9178741e",
  measurementId: "G-WSWG65KK2M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)
// const analytics = getAnalytics(app);
