import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAXpmgzggkBQMLdWY0i0cx8GTZ7udBDEfY",
  authDomain: "uber-425a4.firebaseapp.com",
  projectId: "uber-425a4",
  storageBucket: "uber-425a4.appspot.com",
  messagingSenderId: "800955603427",
  appId: "1:800955603427:web:52293973972cd7a64ea8d6",
  measurementId: "G-RNK8XNCN66"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);