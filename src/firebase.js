import firebase from "firebase";
// import auth from "firebase/auth";
// import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBGRPS8c8FJUb4FTyQycAo2VxcbJ3ouvYY",
    authDomain: "whatsapp-clone-a5dd9.firebaseapp.com",
    projectId: "whatsapp-clone-a5dd9",
    storageBucket: "whatsapp-clone-a5dd9.appspot.com",
    messagingSenderId: "407551877909",
    appId: "1:407551877909:web:ff1d531eb4830c4529bf1c",
    measurementId: "G-9MK3DJ9Y3E"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig); // passing firebase config to setup our app
  const db = firebaseApp.firestore(); // creating firestore instance db 
  const auth = firebase.auth(); // authentication handler
  const provider = new firebase.auth.GoogleAuthProvider(); // for google authentication sign in with google

  export { auth, provider };
  export default db;