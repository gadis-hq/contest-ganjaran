
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDAGrKodo7O4GlfUCz4v09SinVd_Y6HECM",
  authDomain: "gadisqs-hq.firebaseapp.com",
  projectId: "gadisqs-hq",
  storageBucket: "gadisqs-hq.firebasestorage.app",
  messagingSenderId: "273308299702",
  appId: "1:273308299702:web:2a74b41c7701f285f6d117",
  measurementId: "G-6TT7H81TH5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
