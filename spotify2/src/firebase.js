import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuglCPqIKkqNcQl4ok9cBUHEBt4gBHFxc",
  authDomain: "spdfy-b51b6.firebaseapp.com",
  projectId: "spdfy-b51b6",
  storageBucket: "spdfy-b51b6.appspot.com",
  messagingSenderId: "134220000202",
  appId: "1:134220000202:web:149e144c7aaccabaf43d33"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()