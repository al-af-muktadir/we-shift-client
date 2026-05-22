// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZPRDmD1wOalxcDrI-BkpGZyQB-LFvzg0",
  authDomain: "weshare-fc36f.firebaseapp.com",
  projectId: "weshare-fc36f",
  storageBucket: "weshare-fc36f.firebasestorage.app",
  messagingSenderId: "258642417204",
  appId: "1:258642417204:web:0d29f83a15f862659f9c61",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
