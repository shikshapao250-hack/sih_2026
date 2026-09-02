import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxMv01QLUsv3gPdAjHUqYhBKNXsv-msrE",
  authDomain: "sih2026-e161b.firebaseapp.com",
  projectId: "sih2026-e161b",
  storageBucket: "sih2026-e161b.firebasestorage.app",
  messagingSenderId: "697906511251",
  appId: "1:697906511251:web:22f8d670db27fd5150bc66"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);