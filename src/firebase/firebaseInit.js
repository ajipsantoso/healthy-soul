import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/';
import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const data = firebaseApp.firestore();
// data.settings({timestampsInSnapshots: true})

export const db = data;
export const auth = firebase.auth();
export const authGoogle = new firebase.auth.GoogleAuthProvider();
export const authFacebook = new firebase.auth.FacebookAuthProvider();
export const storage = firebase.storage();
