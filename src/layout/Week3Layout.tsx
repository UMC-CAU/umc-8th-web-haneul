import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";

const Week3Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Week3Layout;
