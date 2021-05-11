import {writable} from 'svelte/store';

const user = writable(null)

const customUser = {
    subscribe: user.subscribe,
    setUser: (firebaseUser) => {
        user.set(firebaseUser)
    },
    signUpUser: (email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                // var user = userCredential.user;
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
            });
    },
    signInUser: (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                // var user = userCredential.user;
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    },
    signOutUser: () => {
        firebase.auth().signOut().then(() => {
            // user.set(null)
          }).catch((error) => {
            // An error happened.
          });
    }
}

export default customUser;