 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogging-website-9ab23.firebaseapp.com",
  projectId: "blogging-website-9ab23",
  storageBucket: "blogging-website-9ab23.appspot.com",
  messagingSenderId: "404031655249",
  appId: "1:404031655249:web:8ea8065b2c5bc42417d770"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);