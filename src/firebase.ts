import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmdqJggkLtoz5VxylbqchEfXt2Kivrn5k",
  authDomain: "discord-clone-01-31997.firebaseapp.com",
  projectId: "discord-clone-01-31997",
  storageBucket: "discord-clone-01-31997.appspot.com",
  messagingSenderId: "996813388324",
  appId: "1:996813388324:web:539af78bc661f0371df6b1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };