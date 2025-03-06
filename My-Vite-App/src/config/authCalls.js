import firebaseAcademia from './firebase';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";


const auth = getAuth(firebaseAcademia);

export const signIn = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            console.log(userCredential);
            // ...
        })
        .catch((error) => {
            console.log(error);
        });
}

export const createUser = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            console.log(userCredential);
            // ...
        }
        )
        .catch((error) => {
            console.log(error);
        });
}

export const LogoutFirebase = async () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("Sign-out successful.");
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}

export const userListener = (lisener) => {
    onAuthStateChanged(auth, (user) => {
        lisener(user);
})
}

// Compare this snippet from ViteYReact/My-Vite-App/src/config/firebase.js: