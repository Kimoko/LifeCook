import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


//import { seedDatabase } from '../seed';
const config = {
    apiKey: "AIzaSyBmUqE2rW5x6HyseteyuByLffh_PzNC3TQ",
    authDomain: "lifecook-re.firebaseapp.com",
    projectId: "lifecook-re",
    storageBucket: "lifecook-re.appspot.com",
    messagingSenderId: "963501906826",
    appId: "1:963501906826:web:1f4d61ff951011130c0673"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
//seedDatabase(firebase);

export { firebase, FieldValue};
export const firestore = firebase.firestore();