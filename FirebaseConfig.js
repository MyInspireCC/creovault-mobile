// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOMW5ylydbxA0P0UCfVpm2Reaa8frSoFY",
  authDomain: "creovault-app.firebaseapp.com",
  projectId: "creovault-app",
  storageBucket: "creovault-app.firebasestorage.app",
  messagingSenderId: "772801099448",
  appId: "1:772801099448:web:4aae356d5c2b6790a7664d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
