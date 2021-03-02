import { auth } from '../firebase-client-config';
import firebase from 'firebase/app';

export default function login (email: string, password: string) {
    auth.signInWithEmailAndPassword(email, password).then((res)=>{
        console.log('i logged In');
        console.log('store should include user info if state monitor is working');
    }).catch(err=>{
        console.error(err);
    })
}

export function sendPasswordResetEmail(email: string, successMsg: string) {
    firebase.auth().sendPasswordResetEmail(email).then((res)=>{
        console.log("Email Sent!")
    }).catch((err)=>{
        console.error(err);
    });
  } 