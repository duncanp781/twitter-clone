import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./Feed";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;