import React, { useEffect, useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { User, UserContext } from "./App";
import Feed from "./Pages/Feed";
import LogIn from "./Pages/LogIn";
import Profile from "./Pages/Profile";
import SingleTweetPage from "./Pages/SingleTweetPage";
import SingleTweet from "./Pages/SingleTweetPage";

type Props = {
  setShowHeader: React.Dispatch<React.SetStateAction<boolean>>;
};

function RouteSwitch({ setShowHeader }: Props) {
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
      <Route path="/login" element={<LogIn />} />
      <Route path="/feed" element={<Feed />} />
      <Route path ='/user/:uId' element = {<Profile/>}/>
      <Route path = '/tweet/:tweetId' element = {<SingleTweetPage/>}/>
    </Routes>
  );
}

export default RouteSwitch;
