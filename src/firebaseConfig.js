import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDKPgfk0MJJxnjYXR1oLgJ3DarBLhciogU",
  authDomain: "vis-al.firebaseapp.com",
  projectId: "vis-al",
  storageBucket: "vis-al.appspot.com",
  messagingSenderId: "88331100132",
  appId: "1:88331100132:web:188f57a09b18176fdcf1f1",
  measurementId: "G-MQMQ1N2L60",
};

export const firebase_app = firebase.initializeApp(firebaseConfig);
