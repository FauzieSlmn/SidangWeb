// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBleL-UgNMZR4uEh5G1HAKzdUJ_adZ11hk",
  authDomain: "testing-2ab23.firebaseapp.com",
  projectId: "testing-2ab23",
  storageBucket: "testing-2ab23.firebasestorage.app",
  messagingSenderId: "970313497052",
  appId: "1:970313497052:web:583e9aefdeea5c84dc3719",
  measurementId: "G-72QCFV2DXY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };