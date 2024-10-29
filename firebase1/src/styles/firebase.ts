// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyByRmQKCJl6e2XGTi4ILE9HZnir6JMEi-A",
  authDomain: "fir-demo-f3f0e.firebaseapp.com",
  projectId: "fir-demo-f3f0e",
  storageBucket: "fir-demo-f3f0e.appspot.com",
  messagingSenderId: "504918774140",
  appId: "1:504918774140:web:9985c2de119bc516b814f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {app, auth,db};