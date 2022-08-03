import React, { useState, useEffect } from "react";
import RouteSwitch from "./RouteSwitch";
import "normalize.css";
import "./initialize.css";
import Header from "./Pages/Header";
import { BrowserRouter } from "react-router-dom";
import {
  addUserToDB,
  auth,
  getUserFromDB,
  signOutUser,
} from "./Utility/FirebaseFunctions";
import BlankProfile from "./img/blank-profile.webp";
import { AppStyled } from "./Components/Styled/App.styled";
import { TweetInfo } from "./Pages/Feed";





// TODO:
// DONE: Make the tweet post modal also update local tweets
// DONE: Make liking replies work, or remove it
// DONE: Add loading screen

// Possibilites:
// Small:
// Rework trash to be in triple dots in top left of tweet
// Rework date format
// Big:  
// Add Following
// Add Banner Images
// Add hover preview for profiles
// Add Search (for exact name or at)

export const TriggerUserUpdate = React.createContext(() => {});

export type User = {
  userName: string;
  userAt: string;
  uId: string;
  info: UserDetails;
};

export type UserDetails = {
  bio?: string;
  website?: string;
  img: string;
  hasImg?: boolean
};


export const defaultUser: User = {
  userName: "guest",
  userAt: "test",
  uId: "1",
  info: {
    hasImg: false,
    img: BlankProfile,
  },
};

export const UserContext = React.createContext<User>(defaultUser);

export const ExtraTweetContext = React.createContext<TweetInfo[]>([]);

export default function App() {
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);
  const [gotAuth, setGotAuth] = useState(false);
  const [extraTweet, setExtraTweet] = useState<TweetInfo[]>([]);

  const updateUser = async () => {
    let realUser = await getUserFromDB(currentUser.uId);
    if (realUser && realUser !== currentUser) {
      setCurrentUser(realUser);
    }
  };

  useEffect(() => {
  }, [currentUser]);

  useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(!gotAuth){
      if (user) {
        //If there is an account signed in, check if it is an existing user.
        //If not, add unknown information
        getUserFromDB(user.uid).then((userObj) => {
          if (userObj) {
            setCurrentUser(userObj);
          } else {
            let unknownUser: User = {
              uId: user.uid,
              userName: "unknown",
              userAt: "unknown",
              info: {
                img: BlankProfile,
              },
            };
            addUserToDB(unknownUser);
            setCurrentUser(unknownUser);
          }
        });
      } else {
        //If not signed in add guest information
        setCurrentUser(defaultUser);
      }
      setGotAuth(true);
      return unsubscribe;
    }
    })
  }, [gotAuth]);

  return (
    <AppStyled>
      <ExtraTweetContext.Provider value = {extraTweet}>
      <TriggerUserUpdate.Provider value={updateUser}>
        <UserContext.Provider value={currentUser ? currentUser : defaultUser}>
          <BrowserRouter >
            {showHeader && (
              <Header signOut={signOutUser} hasUser={currentUser.uId !== "1"} setExtraTweet = {setExtraTweet}/>
            )}
            <RouteSwitch setShowHeader={setShowHeader} />
          </BrowserRouter>
        </UserContext.Provider>
      </TriggerUserUpdate.Provider>
      </ExtraTweetContext.Provider>
    </AppStyled>
  );
}
