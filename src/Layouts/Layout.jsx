import { Outlet } from "react-router";
import Header from "../components/Header";

const Layout = () => {
  return (
    <>
      <Header></Header>
      <Outlet />
    </>
  );
};

export default Layout;
