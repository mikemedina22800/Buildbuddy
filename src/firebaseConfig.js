import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDfJ5w2_fv_Wzv3N7vERhl0quwAF7k8rFM",
  authDomain: "get-in-contract.firebaseapp.com",
  projectId: "get-in-contract",
  storageBucket: "get-in-contract.appspot.com",
  messagingSenderId: "1006244442717",
  appId: "1:1006244442717:web:50ee2609f6f263e6a9d3b4",
  measurementId: "G-SSMRDRYRS1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, app, db, storage };