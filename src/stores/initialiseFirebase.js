import userStore from './userStore.js'
import invoiceStore from './InvoicesStore'

function initialiseFirebaseAuth(){
    var firebaseConfig = {
        apiKey: "AIzaSyBJg7dN3RrSONDXINw8xq53IuPXs3yzBUE",
        authDomain: "invoiceappfementor.firebaseapp.com",
        projectId: "invoiceappfementor",
        storageBucket: "invoiceappfementor.appspot.com",
        messagingSenderId: "48091307719",
        appId: "1:48091307719:web:fd12974df538dfcbcb68e2"
      };

    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            //what to do if signed in
            userStore.setUser(firebaseUser)
            invoiceStore.updateLocalUser(firebaseUser)
        } else {
            userStore.setUser(null)
        }
        
    })

}
export default initialiseFirebaseAuth