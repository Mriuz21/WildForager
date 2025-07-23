// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBftOKg0O9N1kBv1OvuQmu1qnWFh6vcmgw",
  authDomain: "wildforager.firebaseapp.com",
  projectId: "wildforager",
  storageBucket: "wildforager.appspot.com",
  messagingSenderId: "698871409048",
  appId: "1:698871409048:web:d948c226de59c21f29a3ed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);