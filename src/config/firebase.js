// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(); // get DB instance and use it in app
const auth = getAuth(); // get auth manager instance of the project to use in app

export const anonymousAuth = async () => {
  if (auth.currentUser) {
    return auth.currentUser;
  }

  const credential = await signInAnonymously(auth);
  return credential.user;
};

// need to import the fns
// // Register new user
// export const registerWithEmail = async (email, password) => {
//   const credential = await createUserWithEmailAndPassword(auth, email, password);
//   return credential.user;
// };

// // Sign in existing user
// export const loginWithEmail = async (email, password) => {
//   const credential = await signInWithEmailAndPassword(auth, email, password);
//   return credential.user;
// };

// // Sign out
// export const logout = async () => {
//   await signOut(auth);
// };

export { app, auth, db };
