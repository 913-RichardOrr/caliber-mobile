import {auth} from '../../user/config';

export function login (email: string, password: string) {
    auth.signInWithEmailAndPassword(email, password).then((res)=>{
        console.log('i logged In');
        console.log('store should include user info if state monitor is working');
    }).catch(err=>{
        console.log(err);
    })
}

export function logout() {
        auth.signOut().then(() => {
            console.log('I logged out :-)');
            console.log('store should remove user info from state');
        }).catch((err) => {
            console.log(err);
        })
}

export function sendPasswordResetEmail(email: string) {
    auth.sendPasswordResetEmail(email).then((res)=>{
        console.log("Email Sent!")
    }).catch((err)=>{
        console.log(err);
    });
  } 
