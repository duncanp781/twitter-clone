import React, { useEffect, useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { UserContext } from "./App";
import Feed from "./Pages/Feed";
import LogIn from "./Pages/LogIn";

type Props = {
  setShowHeader: React.Dispatch<React.SetStateAction<boolean>>;
  signInUser: () => Promise<boolean | null>;
};

function RouteSwitch({ setShowHeader, signInUser }: Props) {
  const user = useContext(UserContext);
  let location = useLocation();
  //Toggle whether to show the header based on the current page
  useEffect(() => {
    switch (location.pathname) {
      case "/login":
        setShowHeader(false);
        break;
      default:
        setShowHeader(true);
        break;
    }
  }, [location, setShowHeader]);
  return (
    <Routes>
      <Route
        path="/"
        element={
          user.uId === "1" ? <Navigate to="login" /> : <Navigate to="feed" />
        }
      />
      <Route path="/login" element={<LogIn signInUser={signInUser} />} />
      <Route path="/feed" element={<Feed />} />
    </Routes>
  );
}

export default RouteSwitch;
