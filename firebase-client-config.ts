import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyC4sxZlT-McTildwtxa8LV1lj7ZQhzOrs0',
    authDomain: 'training-team-253916.firebaseapp.com',
    projectId: 'training-team-253916',
    storageBucket: 'training-team-253916.appspot.com',
    messagingSenderId: '492701958610',
    appId: '1:492701958610:web:4a30a1be93803701d3480b',
    measurementId: 'G-DP6XDH9DTW'
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
