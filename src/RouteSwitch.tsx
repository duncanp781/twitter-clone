import React, { createContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./Pages/Feed";

const UserContext = React.createContext({
  userName: 'test',
  userAt: 'tester',
  uid: 1,
})

function RouteSwitch() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Feed />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;