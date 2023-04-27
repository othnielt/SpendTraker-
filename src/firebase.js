
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from "firebase/firestore";




const app = firebase.initializeApp({
  apiKey: "AIzaSyDl6KGyq_WBEsMO0mwfrTe8-Go1ILekLOM",
  authDomain: "csi4900-dev.firebaseapp.com",
  projectId: "csi4900-dev",
  storageBucket: "csi4900-dev.appspot.com",
  messagingSenderId: "1015760265111",
  appId: "1:1015760265111:web:bc347c308b93d669d0aed2",
  measurementId: "G-72GKTBP4ZS"
});


export const auth = app.auth()
export const db = getFirestore(app);
export default app;



