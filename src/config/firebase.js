
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_NAME}.firebaseapp.com`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_NAME}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECT_NAME}.appspot.com`,
  messagingSenderId: "92382283673",
  appId: "1:92382283673:web:930a960cf386a9c3fc3508",
  measurementId: "G-Y7T9HPDLPF"
};

const app = initializeApp(firebaseConfig);
const projectFirestore = getFirestore(app);
const projectStorage = getStorage(app);

export { projectStorage, projectFirestore }