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
  appId: "1:1006244442717:web:2ef0c77de3504a4da9d3b4",
  measurementId: "G-W7L44Q3WJY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, app, db, storage };