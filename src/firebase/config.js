import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBxft9Ipb3sTNeMXQT9ZvJ2zD7eZ11mSVk",
  authDomain: "eshop-da261.firebaseapp.com",
  projectId: "eshop-da261",
  storageBucket: "eshop-da261.appspot.com",
  messagingSenderId: "701075759731",
  appId: "1:701075759731:web:b3ffa21518caa574790006"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
