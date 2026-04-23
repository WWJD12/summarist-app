import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyB_UwWeyT35u9Zgr6a9XvFl_QwwyTs9sKI",
  authDomain: "book-app-1af80.firebaseapp.com",
  projectId: "book-app-1af80",
  storageBucket: "book-app-1af80.firebasestorage.app",
  messagingSenderId: "895723637599",
  appId: "1:895723637599:web:4fb5fcd512cdaad40184ea",
  measurementId: "G-5DVC03R7S8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)