// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJVdA_3RrXlVhYBe2BTS8VltoZsKwbMi8",
  authDomain: "writing-fellow.firebaseapp.com",
  projectId: "writing-fellow",
  storageBucket: "writing-fellow.appspot.com",
  messagingSenderId: "93130071094",
  appId: "1:93130071094:web:137a6a6d4defd98e898c97",
  measurementId: "G-C45TTXCC59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);