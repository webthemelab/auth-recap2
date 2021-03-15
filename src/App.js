import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);


function App() {
  const [user, setUser] = useState({})
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
         var credential = result.credential;
         var token = credential.accessToken;
         var user = result.user;
         console.log(user);
         setUser(user);
       }).catch((error) => {
         var errorCode = error.code;
        var errorMessage = error.message;
         var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email , credential)
      });
  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign in using google</button>
      <h3>Email: {user.email}</h3>
      <img src={user.photoURL} alt=""/>
    </div>
  );
}

export default App;
