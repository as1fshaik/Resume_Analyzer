import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if critical environment configuration parameters are missing
const isFirebaseConfigMissing = !firebaseConfig.apiKey || !firebaseConfig.projectId;

if (isFirebaseConfigMissing) {
  console.warn(
    "Firebase Environment Configuration is missing! " +
    "Please populate the VITE_FIREBASE_* variables in your root .env file to enable Authentication and Database functionality."
  );
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// Enable popup prompting to select account on every sign-in
googleProvider.setCustomParameters({ prompt: "select_account" });

// Initialize and export Firestore Database
export const db = getFirestore(app);
export { GoogleAuthProvider };
