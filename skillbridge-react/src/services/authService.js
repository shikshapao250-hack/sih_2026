import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../config/firebase";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const ROLE_TO_BACKEND_ROLE = {
  student: "STUDENT",
  college: "COLLEGE",
  organization: "ORGANISATION",
};

const BACKEND_ROLE_TO_ROLE = Object.fromEntries(
  Object.entries(ROLE_TO_BACKEND_ROLE).map(([role, backendRole]) => [
    backendRole,
    role,
  ])
);

function getBackendRole(role) {
  const backendRole = ROLE_TO_BACKEND_ROLE[role];

  if (!backendRole) {
    throw new Error("Please select a valid account role.");
  }

  return backendRole;
}

async function syncUserWithBackend(user, profile) {
  const body = {
    uid: user.uid,
    name: String(profile.name || user.displayName || user.email || "").trim(),
    email: user.email,
    role: getBackendRole(profile.role),
  };

  console.info("[auth] Syncing user with backend", {
    endpoint: `${API_URL}/auth/user`,
    uid: body.uid,
    email: body.email,
    role: body.role,
  });

  let response;
  try {
    response = await fetch(`${API_URL}/auth/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error("[auth] Backend sync request failed", {
      endpoint: `${API_URL}/auth/user`,
      uid: body.uid,
      message: error.message,
    });
    throw error;
  }

  let responseBody;
  try {
    responseBody = await response.json();
  } catch {
    responseBody = { error: "The server returned an invalid response." };
  }

  console.info("[auth] Backend sync response", {
    status: response.status,
    uid: body.uid,
    responseBody,
  });

  if (!response.ok) {
    throw new Error(responseBody.error || "Unable to sync the user profile.");
  }

  const responseMatchesRequest =
    responseBody &&
    Object.keys(body).every((key) => responseBody[key] === body[key]);

  if (!responseMatchesRequest) {
    console.error("[auth] Backend returned an unexpected user profile", {
      uid: body.uid,
      expected: body,
      actual: responseBody,
      mismatchedFields: Object.keys(body).filter(
        (key) => responseBody?.[key] !== body[key]
      ),
    });
    throw new Error("The server returned an unexpected user profile.");
  }

  return {
    ...responseBody,
    role: BACKEND_ROLE_TO_ROLE[responseBody.role],
  };
}

async function getUserRole(uid) {
  const endpoint = `${API_URL}/auth/user/${uid}`;
  console.info("[auth] Checking existing user role", { endpoint, uid });

  let response;
  try {
    response = await fetch(endpoint);
  } catch (error) {
    console.error("[auth] Existing role request failed", {
      endpoint,
      uid,
      message: error.message,
    });
    throw error;
  }

  if (response.status === 404) {
    console.info("[auth] No existing role found", { uid, status: 404 });
    return null;
  }

  let responseBody;
  try {
    responseBody = await response.json();
  } catch {
    responseBody = { error: "The server returned an invalid response." };
  }

  console.info("[auth] Existing role response", {
    status: response.status,
    uid,
    responseBody,
  });

  if (!response.ok) {
    throw new Error(responseBody.error || "Unable to check the user role.");
  }

  return BACKEND_ROLE_TO_ROLE[responseBody.role];
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
  console.info("[auth] Firebase account created", { uid: user.uid, email: user.email });

  const existingRole = await getUserRole(user.uid);
  if (existingRole) {
    console.warn("[auth] Signup blocked because a role already exists", {
      uid: user.uid,
      existingRole,
      requestedRole: role,
    });
    throw new Error("A role is already provided on this email.");
  }

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
