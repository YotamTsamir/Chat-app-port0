import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
export const auth = getAuth(app);
export const storage = getStorage(app);
