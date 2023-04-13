import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCwoV62C42VV33Vxwg3pHHKFCCBxTaGTZ0",
  authDomain: "fe22-js2-slutprojekt.firebaseapp.com",
  databaseURL: "https://fe22-js2-slutprojekt-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fe22-js2-slutprojekt",
  storageBucket: "fe22-js2-slutprojekt.appspot.com",
  messagingSenderId: "1002291684559",
  appId: "1:1002291684559:web:b380a94a0581fd134403ba",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
