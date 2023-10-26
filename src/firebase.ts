// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from '@firebase/firestore';

const {
  VITE_APP_APIKEY,
  VITE_APP_AUTHDOMAIN,
  VITE_APP_PROJECTID,
  VITE_APP_STORAGEBUCKET,
  VITE_APP_MESSAGINGSENDERID,
  VITE_APP_FIREBASEAPPID,
  VITE_APP_MEASUREMENTID,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_APP_APIKEY,
  authDomain: VITE_APP_AUTHDOMAIN,
  projectId: VITE_APP_PROJECTID,
  storageBucket: VITE_APP_STORAGEBUCKET,
  messagingSenderId: VITE_APP_MESSAGINGSENDERID,
  appId: VITE_APP_FIREBASEAPPID,
  measurementId: VITE_APP_MEASUREMENTID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
