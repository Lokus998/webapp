// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDT0hyHEvtGuQyaNfnHPN0V8wFyD3ODSJk",
  authDomain: "game-c35f1.firebaseapp.com",
  databaseURL: "https://game-c35f1-default-rtdb.firebaseio.com",
  projectId: "game-c35f1",
  storageBucket: "game-c35f1.appspot.com",
  messagingSenderId: "542398804390",
  appId: "1:542398804390:web:1a7a24baaa700d751c1f67",
  measurementId: "G-MDK5395BJ6"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);