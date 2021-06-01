import {writable} from 'svelte/store';

const user = writable(null)

const customUser = {
    subscribe: user.subscribe,
    setUser: (firebaseUser) => {
        user.set(firebaseUser)
    },
    signUpUser: (email, password, name) => {
        console.log(name)
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                let id = userCredential.user.uid
                customUser.updateName(name, id, email)
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    },
    updateName: (name, id, email) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                id,
                email
            })
        }

        fetch(`https://invoiceappfementor-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`, options)
            .then(res => {
                if(!res.ok){
                    throw new Error("Couldn't send, sorry.")
                }
            }).catch(err => (console.log(err)))
    },
    signInUser: (email, password) => {
        console.log("change this: ",email, password)
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
            user.set(null)
          }).catch((error) => {
            // An error happened.
          });
    }
}

export default customUser;