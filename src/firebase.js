// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyAcjc6Rpazxth48h41qL7G2kKb55VAYD10",

  authDomain: "taaza-database.firebaseapp.com",

  projectId: "taaza-database",

  storageBucket: "taaza-database.firebasestorage.app",

  messagingSenderId: "360207037873",

  appId: "1:360207037873:web:f2ba5d51fc6a89889c7990",

  measurementId: "G-2WJJM1VLK8"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };