import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBlkEG3QeTVFAjZg5_S4pKP3p2XdB0f3hw",
  authDomain: "fireship-next-js-b42c6.firebaseapp.com",
  projectId: "fireship-next-js-b42c6",
  storageBucket: "fireship-next-js-b42c6.appspot.com",
  messagingSenderId: "748027436583",
  appId: "1:748027436583:web:b743e89a550b87a9a23802",
  measurementId: "G-CW26D7RDDP",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
