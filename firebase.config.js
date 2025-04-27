import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getDatabase, set, ref, get, remove, update } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js'


const firebaseConfig = {
  apiKey: "AIzaSyDM2gfFEV1vlSw7twEYS6ffhG0XHf_vfDk",
  authDomain: "minihackaton-81430.firebaseapp.com",
  projectId: "minihackaton-81430",
  storageBucket: "minihackaton-81430.firebasestorage.app",
  messagingSenderId: "1048717455886",
  appId: "1:1048717455886:web:d65ed78e3bd6f229b8825f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);


export { auth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, db, getDatabase, set, ref, get, remove, update }
