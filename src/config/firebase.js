
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_NAME}.firebaseapp.com`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_NAME}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECT_NAME}.appspot.com`,
  messagingSenderId: "26706184399",
  appId: "1:26706184399:web:967bc1ef9ba77589374fba"
};

const app = initializeApp(firebaseConfig);
const projectFirestore = getFirestore(app);

export {  projectFirestore }