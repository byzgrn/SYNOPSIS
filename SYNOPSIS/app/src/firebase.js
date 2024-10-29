// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhFkeqsi--68mHvM7MxFQjcilLzZWb4E4",
  authDomain: "synopsis-2785a.firebaseapp.com",
  projectId: "synopsis-2785a",
  storageBucket: "synopsis-2785a.appspot.com",
  messagingSenderId: "892022352403",
  appId: "1:892022352403:web:982a679806e9ec0be66de6",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
