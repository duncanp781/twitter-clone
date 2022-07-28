import React, { useState } from "react";
import RouteSwitch from "./RouteSwitch";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import "normalize.css";
import "./initialize.css";
import Header from "./Pages/Header";
import { BrowserRouter } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyC8T3tt_11SSH8IWpTrQH8lvR_zitcDgoM",
  authDomain: "twitter-clone-f9ccd.firebaseapp.com",
  projectId: "twitter-clone-f9ccd",
  storageBucket: "twitter-clone-f9ccd.appspot.com",
  messagingSenderId: "713938873458",
  appId: "1:713938873458:web:3069ffbbf29d256911e6eb",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export const UserContext = React.createContext({
  userName: "guest",
  userAt: "test",
  uId: "1",
});

export const DBContext = React.createContext(db);

type User = {
  userName: string;
  userAt: string;
  uId: string;
};

export default function App() {
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User>({
    userName: "guest",
    userAt: "test",
    uId: "1",
  });

  auth.onAuthStateChanged((user) => {
    if (user) {
      getUserFromDB(user.uid).then((userObj) => {
        if (userObj) {
          setCurrentUser(userObj);
        }
      });
    } else {
      setCurrentUser({
        userName: "guest",
        userAt: "test",
        uId: "1",
      });
    }
  });

  const addUserToDB = async (user: User) => {
    try {
      const userDoc = doc(db, "users/" + user.uId);
      setDoc(userDoc, {
        userName: user.userName,
        userAt: user.userAt,
      });
    } catch (e) {
      console.error("failed to add user to database with error: ", e);
    }
  };

  const getUserFromDB = async (uId: string): Promise<User | undefined> => {
    const userDocRef = doc(db, "users/" + uId);
    const userDoc = await getDoc(userDocRef);
    return userDoc.data() as User | undefined;
  };

  //Sign in the user with a pop up. If the user isn't in the DB, add it to the DB
  //Returns a boolean representing whether the signed in user was new, or null if there was an error
  const signInUser = async (): Promise<boolean | null> => {
    try {
      let result = await signInWithPopup(auth, provider);

      let user = result.user;
      let newUser = await getUserFromDB(user.uid);
      if (!!newUser) {
        setCurrentUser(newUser);
        return false;
      } else {
        let newUser: User = {
          userName: user.displayName ? user.displayName : "no name",
          userAt: "test",
          uId: user.uid,
        };
        setCurrentUser(newUser);
        addUserToDB(newUser);
        return true;
      }
    } catch (error) {
      console.error("user sign in failed with error", error);
      return null;
    }
  };

  const signOutUser = () => {
    signOut(auth).catch((error) => console.error("error signing out, ", error));
  };

  return (
    <div style={{ height: "100%" }}>
      <UserContext.Provider
        value={
          currentUser
            ? currentUser
            : {
                userName: "guest",
                userAt: "test",
                uId: "1",
              }
        }
      >
        <BrowserRouter>
          {showHeader && (
            <Header
              signIn={signInUser}
              signOut={signOutUser}
              hasUser={currentUser.uId !== "1"}
            />
          )}

          <RouteSwitch setShowHeader={setShowHeader} signInUser={signInUser} />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}
