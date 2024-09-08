import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

// Function to fetch a specific document from Firestore
export const fetchHomeData = async () => {
  const docRef = doc(db, "Name", "home");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};
export const fetchAboutData = async () => {
    const docRef = doc(db, "Name", "about"); // Assuming "about" is the document ID
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
};
export const fetchGlobalData = async () => {
  const docRef = doc(db, "Name", "Global");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};
export const fetchProjectsData = async () => {
  const docRef = doc(db, "Name", "Projects");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};
export const fetchSkillsData = async () => {
  const docRef = doc(db, "Name", "skills");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};
export const fetchCertificationsData = async () => {
  const docRef = doc(db, "Name", "certifications");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};
export const fetchProfilesData = async () => {
  const docRef = doc(db, "Name", "profiles");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};
export const fetchExperiencesData = async () => {
  const docRef = doc(db, "Name", "experiences");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};
export const fetchContactsData = async () => {
  const docRef = doc(db, "Name", "contacts");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};