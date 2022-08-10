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
import BurgerMenu from "./Pages/BurgerMenu";

// TODO:
// DONE: Make the tweet post modal also update local tweets
// DONE: Make liking replies work, or remove it
// DONE: Add loading screen
// Add max length for usernames /@s  bios
// DONE: Fix infinite like glitch (replicated by liking/unliking then switching pages)
// DONE: Fix text overflow on tweets/usernames (add ellipsis - css tricks article)
// DONE: Fix image on login page - probably just remove? it slows it down a lot
// DONE: Add Proper deleting on single tweet pages - navigate back a page
// DONE: Add deleting responses to tweets when deleting tweets
// Add More Semantic HTML
//Fix Redirecting to feed if logged in

// Possibilites:
// Small:
// Rework trash to be in triple dots in top left of tweet
// Rework date format
// Add animation on hover for styled components (buttons, icons etc.)
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
  hasImg?: boolean;
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

export const setShowHamContext = React.createContext((state: boolean) => {});

export default function App() {
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);
  const [gotAuth, setGotAuth] = useState(false);
  const [extraTweet, setExtraTweet] = useState<TweetInfo[]>([]);
  const [showHam, setShowHam] = useState(false);

  const updateUser = async () => {
    let realUser = await getUserFromDB(currentUser.uId);
    if (realUser && realUser !== currentUser) {
      setCurrentUser(realUser);
    }
  };

  useEffect(() => {}, [currentUser]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!gotAuth) {
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
    });
  }, [gotAuth]);

  return (
    <AppStyled>
      <ExtraTweetContext.Provider value={extraTweet}>
        <TriggerUserUpdate.Provider value={updateUser}>
          <UserContext.Provider value={currentUser ? currentUser : defaultUser}>
            <setShowHamContext.Provider value={setShowHam}>
              <BrowserRouter>
                {showHeader && (
                  <Header
                    signOut={signOutUser}
                    hasUser={currentUser.uId !== "1"}
                    setExtraTweet={setExtraTweet}
                  />
                )}
                {showHam && (
                  <BurgerMenu signOut = {signOutUser}
                  hasUser={currentUser.uId !== "1"}
                    setExtraTweet={setExtraTweet}/>
                )}
                <RouteSwitch setShowHeader={setShowHeader} />
              </BrowserRouter>
            </setShowHamContext.Provider>
          </UserContext.Provider>
        </TriggerUserUpdate.Provider>
      </ExtraTweetContext.Provider>
    </AppStyled>
  );
}
