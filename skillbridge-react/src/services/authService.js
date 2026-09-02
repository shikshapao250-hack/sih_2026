import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../config/firebase";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function syncUserWithBackend(user, profile) {
  const body = {
    uid: user.uid,
    name: String(profile.name || user.displayName || user.email || "").trim(),
    email: user.email,
    role: profile.role,
  };

  const response = await fetch(`${API_URL}/auth/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  let responseBody;
  try {
    responseBody = await response.json();
  } catch {
    responseBody = { error: "The server returned an invalid response." };
  }

  if (!response.ok) {
    throw new Error(responseBody.error || "Unable to sync the user profile.");
  }

  const responseMatchesRequest =
    responseBody &&
    Object.keys(body).every((key) => responseBody[key] === body[key]) &&
    Object.keys(responseBody).length === Object.keys(body).length;

  if (!responseMatchesRequest) {
    throw new Error("The server returned an unexpected user profile.");
  }

  return responseBody;
}

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

export async function loginAndSyncUser(email, password, role) {
  const user = await loginWithEmailAndPassword(email, password);
  const savedUser = localStorage.getItem("skillbridge_user");
  let profile = {};

  if (savedUser) {
    try {
      profile = JSON.parse(savedUser) || {};
    } catch {
      profile = {};
    }
  }

  return syncUserWithBackend(user, {
    name: profile.email?.toLowerCase() === user.email?.toLowerCase()
      ? profile.name
      : user.displayName,
    role,
  });
}

export async function registerAndSyncUser(email, password, name, role) {
  const user = await registerWithEmailAndPassword(email, password);
  await updateProfile(user, { displayName: String(name || "").trim() });
  return syncUserWithBackend(user, { name, role });
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
