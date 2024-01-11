import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKH4m63aPq5aR3tyfpPwEVSNwy6cXhM4Y",
  authDomain: "ecommerce-d0d57.firebaseapp.com",
  projectId: "ecommerce-d0d57",
  storageBucket: "ecommerce-d0d57.appspot.com",
  messagingSenderId: "539743927585",
  appId: "1:539743927585:web:627b28b272d236d97dd260"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and GoogleAuthProvider
 export const auth = getAuth(app);

export const googleAuthProvider = new GoogleAuthProvider();
