// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6qd-MPmVcsv3_wj6HABmQdoVGPWZLi9Q",
  authDomain: "expense-tracker-trial2.firebaseapp.com",
  projectId: "expense-tracker-trial2",
  storageBucket: "expense-tracker-trial2.firebasestorage.app",
  messagingSenderId: "132781801485",
  appId: "1:132781801485:web:f137b5c778b8bef1f85544",
  measurementId: "G-ZT3J6XBN8J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
