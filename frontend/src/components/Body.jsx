import useAuth from "../hooks/useAuth.js";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Body = () => {
  useAuth();

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Body;
