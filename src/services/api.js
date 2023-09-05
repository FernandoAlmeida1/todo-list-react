import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBq64Ewa4h3_7PxerZ12xNiWIhZBW0NinI",
  authDomain: "todolistdb-3f8f1.firebaseapp.com",
  projectId: "todolistdb-3f8f1",
  storageBucket: "todolistdb-3f8f1.appspot.com",
  messagingSenderId: "757261460199",
  appId: "1:757261460199:web:ee9f41a29dd7f222c7f842",
  measurementId: "G-EW8WWZETCC",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { auth, db };
