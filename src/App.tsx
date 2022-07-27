import React, { createContext, useState } from 'react';
import RouteSwitch from "./RouteSwitch"
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore";
import { Button } from './Components/Styled/Button.styled';
import 'normalize.css';
import './initialize.css';

const firebaseConfig = {
  apiKey: "AIzaSyC8T3tt_11SSH8IWpTrQH8lvR_zitcDgoM",
  authDomain: "twitter-clone-f9ccd.firebaseapp.com",
  projectId: "twitter-clone-f9ccd",
  storageBucket: "twitter-clone-f9ccd.appspot.com",
  messagingSenderId: "713938873458",
  appId: "1:713938873458:web:3069ffbbf29d256911e6eb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export const UserContext = React.createContext({
  userName: 'guest',
  userAt: 'test',
  uId: '1',
})

export const DBContext = React.createContext(db);

type User = {
  userName: string,
  userAt: string,
  uId: string,
}

export default function App() {
  const [currentUser, setCurrentUser] = useState({
    userName: 'guest',
    userAt: 'test',
    uId: '1',
  });

  const addUserToDB = async (user: User) => {
    try {
      const userDoc = doc(db, 'users/' + user.uId);
      setDoc(userDoc, {
        userName: user.userName,
        userAt: user.userAt,
      });
    }
    catch (e) {
      console.error('failed to add user to database with error: ', e)
    }
  }

  return (<div>
    {
    //The 'guest' user has uID 1, so if that is the current user, we allow people to sign in. Otherwise, allow them to sign out.
    (currentUser.uId !== '1') ? <Button onClick={
      (e) => {
        signOut(auth).then().catch((error) => console.error('error signing out, ', error));
      }
    }>Sign out</Button> : <Button onClick={(e) => {
      signInWithPopup(auth, provider).then((result) => {
        let user = result.user;
        let newUser: User = {
          userName: (user.displayName ? user.displayName : 'no name'),
          userAt: 'test',
          uId: user.uid,
        }
        setCurrentUser(newUser);
        addUserToDB(newUser);

      }).catch((error) => {
        console.error('user sign in failed with error', error);
      })

    }
    }>Sign in with google</Button>}
    <UserContext.Provider value={currentUser ? currentUser : {
      userName: 'guest',
      userAt: 'test',
      uId: '1',
    }}>
      <RouteSwitch />
    </UserContext.Provider>  </div>)
}