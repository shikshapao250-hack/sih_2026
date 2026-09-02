import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../config/firebase";

function withTimestamps(data = {}) {
  return {
    ...data,
    createdAt: data.createdAt ?? serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}

export async function createDocument(collectionName, data, id = null) {
  const collectionRef = collection(db, collectionName);

  if (id) {
    const documentRef = doc(collectionRef, id);
    await setDoc(documentRef, withTimestamps(data));
    return { id: documentRef.id, ...data };
  }

  const documentRef = await addDoc(collectionRef, withTimestamps(data));
  return { id: documentRef.id, ...data };
}

export async function getAllDocuments(collectionName, constraints = []) {
  const collectionRef = collection(db, collectionName);
  const dataQuery = constraints.length ? query(collectionRef, ...constraints) : collectionRef;
  const snapshot = await getDocs(dataQuery);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
}

export async function getDocumentById(collectionName, id) {
  const documentRef = doc(db, collectionName, id);
  const snapshot = await getDoc(documentRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

export async function updateDocument(collectionName, id, data) {
  const documentRef = doc(db, collectionName, id);

  await updateDoc(documentRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });

  return { id, ...data };
}

export async function deleteDocument(collectionName, id) {
  const documentRef = doc(db, collectionName, id);
  await deleteDoc(documentRef);
  return true;
}

export function subscribeToCollection(collectionName, callback, constraints = []) {
  const collectionRef = collection(db, collectionName);
  const dataQuery = constraints.length ? query(collectionRef, ...constraints) : collectionRef;

  return onSnapshot(dataQuery, (snapshot) => {
    const items = snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    callback(items);
  });
}

export function subscribeToDocument(collectionName, id, callback) {
  const documentRef = doc(db, collectionName, id);

  return onSnapshot(documentRef, (snapshot) => {
    if (!snapshot.exists()) {
      callback(null);
      return;
    }

    callback({
      id: snapshot.id,
      ...snapshot.data(),
    });
  });
}

export { where, orderBy };
