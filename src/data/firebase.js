import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDRljzIEaVg28y4Qn1-HDrRJoH-53O1cpA",
    authDomain: "senior-project-3f176.firebaseapp.com",
    databaseURL: "https://senior-project-3f176.firebaseio.com",
    projectId: "senior-project-3f176",
    storageBucket: "senior-project-3f176.appspot.com",
    messagingSenderId: "1052317350942",
    appId: "1:1052317350942:web:b65f31b59477b1c470020f",
    measurementId: "G-H0F8TQCRPZ"
  }

  firebase.initializeApp(firebaseConfig)

  export const auth = firebase.auth()
  export const provider = new firebase.auth.GoogleAuthProvider();
  export const db = firebase.firestore()

  export default firebase