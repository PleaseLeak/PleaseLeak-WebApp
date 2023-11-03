// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDd6hApRpWDIOdcwfg3dTOV1QYdxLjC3kk",
  authDomain: "please-leak.firebaseapp.com",
  projectId: "please-leak",
  storageBucket: "please-leak.appspot.com",
  messagingSenderId: "719851645222",
  appId: "1:719851645222:web:7ed944ded4441c14ee39e7",
  measurementId: "G-LF7RB7ND56",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
const analytics = getAnalytics(app);
analytics.app.automaticDataCollectionEnabled = true;
logEvent(analytics, "notification_received");
