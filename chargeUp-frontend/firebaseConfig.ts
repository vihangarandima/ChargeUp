// 1. Import the tools we need from the Firebase package we just installed
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// 2. PASTE YOUR REAL FIREBASE KEYS RIGHT HERE:
const firebaseConfig = {
  apiKey: "AIzaSyCo3tytwm_0uGDCPefS_XUJdO30093-j7k",
  authDomain: "chargeup-fcc36.firebaseapp.com",
  projectId: "chargeup-fcc36",
  storageBucket: "chargeup-fcc36.firebasestorage.app",
  messagingSenderId: "795139641919",
  appId: "1:795139641919:web:e8898c460ca2d3bb9c5e8a",
  measurementId: "G-11P6CDSDHX",
};

// 3. Turn on the Firebase App
const app = initializeApp(firebaseConfig);

// 4. Turn on the "Bouncer" (Authentication) and export it so our Login screen can use it!
export const auth = getAuth(app);
