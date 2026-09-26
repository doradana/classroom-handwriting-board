import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCmtnC-0L4vKnvlGaHhg4io7sy0dS7sLhY",
  authDomain: "handwritten-bulletin.firebaseapp.com",
  projectId: "handwritten-bulletin",
  storageBucket: "handwritten-bulletin.firebasestorage.app",
  messagingSenderId: "1033028353807",
  appId: "1:1033028353807:web:ed8a655e8344e56e71487a",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

window.classroomFirebase = {
  async signIn() {
    const credential = await signInWithPopup(auth, googleProvider);
    return credential.user;
  },
  async signOut() {
    await signOut(auth);
  },
};

window.dispatchEvent(new CustomEvent("classroom-firebase-ready"));
