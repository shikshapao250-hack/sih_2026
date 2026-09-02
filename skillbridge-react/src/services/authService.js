import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../../config/firebase";

export async function registerWithEmailAndPassword(email, password) {
  const trimmedEmail = String(email || "").trim();
  const trimmedPassword = String(password || "");

  if (!trimmedEmail || !trimmedPassword) {
    throw new Error("Email and password are required.");
  }

  if (trimmedPassword.length < 6) {
    throw new Error("Password must contain at least 6 characters.");
  }

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    trimmedEmail,
    trimmedPassword
  );

  return userCredential.user;
}

export async function loginWithEmailAndPassword(email, password) {
  const trimmedEmail = String(email || "").trim();
  const trimmedPassword = String(password || "");

  if (!trimmedEmail || !trimmedPassword) {
    throw new Error("Email and password are required.");
  }

  const userCredential = await signInWithEmailAndPassword(
    auth,
    trimmedEmail,
    trimmedPassword
  );

  return userCredential.user;
}

export async function logoutUser() {
  await signOut(auth);
}

export function getCurrentUser() {
  return auth.currentUser;
}

export function watchAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}
