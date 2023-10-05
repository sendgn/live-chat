import { initializeApp } from 'firebase/app';
import {
  getFirestore, serverTimestamp
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBQ3xx-0xxeQnPwyIe_KGFqVICsJfL_Puc",
  authDomain: "vue-firebase-sites-86455.firebaseapp.com",
  projectId: "vue-firebase-sites-86455",
  storageBucket: "vue-firebase-sites-86455.appspot.com",
  messagingSenderId: "648359853076",
  appId: "1:648359853076:web:dc1ac1409af1547a00bb01"
};

// init firebase
initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const timestamp = serverTimestamp();

export { auth, db, timestamp };
