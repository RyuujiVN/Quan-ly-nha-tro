import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Sidebar />
    </>
  );
};

export default DefaultLayout;
