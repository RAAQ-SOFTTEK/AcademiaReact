import firebaseAcademia from './firebase';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  addDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';

const db = getFirestore(firebaseAcademia);

// Función para leer datos de Firestore basados en una condición específica
export const readDataFirestore = async (path, child, value) => {
  const q = query(collection(db, path), where(child, '==', value));
  const querySnapshot = await getDocs(q);
  return querySnapshot;
};

// Función para leer todos los documentos de una colección específica
export const readAllDataFirestore = async (collectionName) => {
  const q = query(collection(db, collectionName));
  const querySnapshot = await getDocs(q);
  return querySnapshot;
};

// Función para agregar un nuevo documento a una colección en Firestore
export const writeDataFirestore = async (collectionName, data) => {
  const docRef = await addDoc(collection(db, collectionName), data);
  return docRef;
};

// Función para eliminar un documento de una colección en Firestore
export const deleteDataFirestore = async (collectionName, docId) => {
  await deleteDoc(doc(db, collectionName, docId));
};