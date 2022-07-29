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
  signInUser,
  signOutUser,
} from "./Utility/FirebaseFunctions";
import { getAuth } from "firebase/auth";

export const UserContext = React.createContext({
  userName: "guest",
  userAt: "test",
  uId: "1",
});

export type User = {
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
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getUserFromDB(user.uid).then((userObj) => {
          if (userObj) {
            setCurrentUser(userObj);
            console.log(
              "setting user context from auth state change, user is "
            );
            console.log(userObj);
          } else {
            let unknownUser: User = {
              uId: user.uid,
              userName: "unknown",
              userAt: "unknown",
            };
            addUserToDB(unknownUser);
            setCurrentUser(unknownUser);
          }
        });
      } else {
        setCurrentUser({
          userName: "guest",
          userAt: "test",
          uId: "1",
        });
        console.log("setting user context from auth state change, user is ");
        console.log("the default user");
      }

      return unsubscribe;
    });
  }, []);

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
            <Header signOut={signOutUser} hasUser={currentUser.uId !== "1"} />
          )}

          <RouteSwitch setShowHeader={setShowHeader} />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}
