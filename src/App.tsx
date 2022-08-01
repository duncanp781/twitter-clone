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

export const UserContext = React.createContext<User>({
  userName: "guest",
  userAt: "test",
  uId: "1",
  info: {
    img: BlankProfile,
  },
});

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
};

export default function App() {
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User>({
    userName: "guest",
    userAt: "test",
    uId: "1",
    info: {
      img: BlankProfile,
    },
  });

  const updateUser = async () => {
    let realUser = await getUserFromDB(currentUser.uId);
    if (realUser && realUser !== currentUser) {
      setCurrentUser(realUser);
    }
  };

  useEffect(() => {
    console.log("The current user is, ", currentUser);
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("auth state changed");
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
                img: BlankProfile
              }
            };
            addUserToDB(unknownUser);
            setCurrentUser(unknownUser);
          }
        });
      } else {
        //If not signed in add guest information
        setCurrentUser({
          userName: "guest",
          userAt: "test",
          uId: "1",
          info: {
            img: BlankProfile,
          },
        });
      }

      return unsubscribe;
    });
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <TriggerUserUpdate.Provider value={updateUser}>
        <UserContext.Provider
          value={
            currentUser
              ? currentUser
              : {
                  userName: "guest",
                  userAt: "test",
                  uId: "1",
                  info: {
                    img: BlankProfile,
                  },
                }
          }
        >
          <BrowserRouter>
            {showHeader && (
              <Header signOut={signOutUser} hasUser={currentUser.uId !== "1"} />
            )}
            <RouteSwitch setShowHeader={setShowHeader} />
          </BrowserRouter>
        </UserContext.Provider>
      </TriggerUserUpdate.Provider>
    </div>
  );
}
