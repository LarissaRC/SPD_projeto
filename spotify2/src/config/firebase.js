
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDLqkTft-7ggyByE20PfMhgG39_kEHhszE",
  authDomain: "trabalho-spd.firebaseapp.com",
  projectId: "trabalho-spd",
  storageBucket: "trabalho-spd.appspot.com",
  messagingSenderId: "846842044606",
  appId: "1:846842044606:web:de1626e32a84a90832beef"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
