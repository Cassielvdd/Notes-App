import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import Register from "../Register";
import Admin from "../admin";
import Forgot from "../forgot";
import Private from "./private";

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recovery" element={<Forgot />} />
      <Route
        path="/admin"
        element={
          <Private>
            <Admin />
          </Private>
        }
      />
    </Routes>
  );
}
