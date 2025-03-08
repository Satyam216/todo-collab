// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp} from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7ZkJOYHV8iRdcbeBuqw4iIMYFYM0AtLc",
  authDomain: "todo-collab-5cce7.firebaseapp.com",
  projectId: "todo-collab-5cce7",
  storageBucket: "todo-collab-5cce7.firebasestorage.com",
  messagingSenderId: "214084995190",
  appId: "1:214084995190:web:c754347bfa9ee5053c7757",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export {auth, googleProvider, signInWithPopup, signOut, database , db};