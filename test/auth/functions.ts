import firebase from 'firebase/app';

export function login (email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then((res)=>{
        console.log('i logged In');
        console.log('store should include user info if state monitor is working');
    }).catch(err=>{
        console.error(err);
    })
}

export function logout() {
        firebase.auth().signOut().then(() => {
            console.log('I logged out :-)');
            console.log('store should remove user info from state');
        }).catch((err) => {
            console.error(err);
        })
}
