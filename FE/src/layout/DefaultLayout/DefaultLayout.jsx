import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./DefaultLayout.css";

const DefaultLayout = () => {
  return (
    <>
      <Sidebar />
      <div className="body">
        <Header />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DefaultLayout;
