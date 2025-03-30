// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgmUBrMkPO_qzNDqisQxohUo85r7tvqBs",
  authDomain: "boda-alvarojersy.firebaseapp.com",
  databaseURL: "https://boda-alvarojersy-default-rtdb.firebaseio.com",
  projectId: "boda-alvarojersy",
  storageBucket: "boda-alvarojersy.firebasestorage.app",
  messagingSenderId: "608123696000",
  appId: "1:608123696000:web:58e76a8cdfbd186ca64765",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
