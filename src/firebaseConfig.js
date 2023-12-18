import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDWS1bvw2lr9VT0yUHMIf6T5PcOjNDe1e4",
  authDomain: "buildbuddy-bd582.firebaseapp.com",
  projectId: "buildbuddy-bd582",
  storageBucket: "buildbuddy-bd582.appspot.com",
  messagingSenderId: "167309840961",
  appId: "1:167309840961:web:0e7d0fae7466c344622cc0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, app, db, storage };