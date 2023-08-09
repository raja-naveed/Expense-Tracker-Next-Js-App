// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABxpScM0MPHc-0tF00m1XnEhXxqic393k",
  authDomain: "expense-tracker-4b4b7.firebaseapp.com",
  projectId: "expense-tracker-4b4b7",
  storageBucket: "expense-tracker-4b4b7.appspot.com",
  messagingSenderId: "851483568299",
  appId: "1:851483568299:web:15a9b0dee24776f8c32fee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)