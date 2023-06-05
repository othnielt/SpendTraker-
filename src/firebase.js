
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from "firebase/firestore";



// reaplace by your own firebase configuration 
const app = firebase.initializeApp({

});


export const auth = app.auth()
export const db = getFirestore(app);
export default app;



