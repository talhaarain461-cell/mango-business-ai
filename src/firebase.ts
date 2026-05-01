import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "YOUR_REAL_API_KEY",
  authDomain: "YOUR_REAL_AUTH_DOMAIN",
  projectId: "review-system-184e0",
  storageBucket: "YOUR_REAL_STORAGE_BUCKET",
  messagingSenderId: "YOUR_REAL_SENDER_ID",
  appId: "YOUR_REAL_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);