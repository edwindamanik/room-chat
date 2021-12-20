import React, {useState, useEffect} from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import Button from './components/Button';
import Channel from './components/Channel';

import './App.css';

firebase.initializeApp({
  apiKey: "AIzaSyBRFu8xXt3E-SjlKN_IV_AKEnEQAgeUwLc",
  authDomain: "chat-room-4d641.firebaseapp.com",
  projectId: "chat-room-4d641",
  storageBucket: "chat-room-4d641.appspot.com",
  messagingSenderId: "932764563171",
  appId: "1:932764563171:web:7703557a650d53b53bb7d6"
});

const auth = firebase.auth();
const db = firebase.firestore();

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if(initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, [])

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  if(initializing) return "Loading...";

  return (
    <div>
      {user ? (
        <>
          <div className='header'>
            <span></span>
            <p>Selamat Datang Di Forum Chat Estudiando Juntos</p>
            <Button onClick={signOut}>Sign Out</Button>
          </div>
          <Channel user={user} db={db} />
        </>
      ) : (
        <Button onClick={signInWithGoogle}>Sign In With Google</Button>
      )}
    </div>
  );
}

export default App;
