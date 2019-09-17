import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyA6aOiGsWuJLFoajC4T9qy7y74z3qFICoE",
    authDomain: "react-ecommerce-88e4d.firebaseapp.com",
    databaseURL: "https://react-ecommerce-88e4d.firebaseio.com",
    projectId: "react-ecommerce-88e4d",
    storageBucket: "",
    messagingSenderId: "695707291544",
    appId: "1:695707291544:web:9049e95686b2c52b1b65ed"
}

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    console.log(userAuth);
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email, photoURL } = userAuth;
        const created_at = new Date();
        const updated_at = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                created_at,
                updated_at,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

const facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);

export default firebase;