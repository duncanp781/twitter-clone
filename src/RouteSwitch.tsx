import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./Feed";
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