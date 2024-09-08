// src/firebaseService.js
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const fetchFirebaseDocument = async (collectionName, documentId) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document from Firebase:", error);
    throw error;
  }
};

export { fetchFirebaseDocument };
