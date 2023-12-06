import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "get-in-contract.firebaseapp.com",
  projectId: "get-in-contract",
  storageBucket: "get-in-contract.appspot.com",
  messagingSenderId: "1006244442717",
  appId: "1:1006244442717:web:06c3f9cbcaa4611ea9d3b4",
  measurementId: "G-1L37C00V60"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)

export { auth, app, firestore, storage };