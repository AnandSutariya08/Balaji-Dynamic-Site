import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCLwn48koGG36jAjS-Ps_YoU4FVVpBj5LA",
  authDomain: "balaji-eng.firebaseapp.com",
  projectId: "balaji-eng",
  storageBucket: "balaji-eng.firebasestorage.app",
  messagingSenderId: "482598975172",
  appId: "1:482598975172:web:1ff5ac7391cd402ed83b91",
  measurementId: "G-TWZ6B6Z5EQ"
};

export const isFirebaseConfigured = (): boolean => {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket
  );
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const storage = getStorage(app);
