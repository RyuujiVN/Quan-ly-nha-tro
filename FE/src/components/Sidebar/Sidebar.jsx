import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={Logo} alt="Logo" />
      </div>

      <ul className="sidebar-action">
        <li className="sidebar-container">
          <div className="sidebar-link">
            <NavLink to="/" className="link">
              Thống kê
            </NavLink>
          </div>
        </li>

        <li className="sidebar-container">
          <div className="sidebar-link">
            <NavLink to="/boarding-house" className="link">
              Phòng trọ
            </NavLink>
          </div>
        </li>

        <li className="sidebar-container">
          <div className="sidebar-link">
            <NavLink to="/guest" className="link">
              Khách thuê
            </NavLink>
          </div>
        </li>

        <li className="sidebar-container">
          <div className="sidebar-link">
            <NavLink to="/service" className="link">
              Dịch vụ
            </NavLink>
          </div>
        </li>

        <li className="sidebar-container">
          <div className="sidebar-link">
            <NavLink to="/electricity" className="link">
              Chỉ số điện
            </NavLink>
          </div>
        </li>

        <li className="sidebar-container">
          <div className="sidebar-link">
            <NavLink to="/water" className="link">
              Chỉ số nước
            </NavLink>
          </div>
        </li>

        <li className="sidebar-container">
          <div className="sidebar-link">
            <NavLink to="/cost-incurred" className="link">
              Chi phí phát sinh
            </NavLink>
          </div>
        </li>

        <li className="sidebar-container">
          <div className="sidebar-link">
            <NavLink to="/invoice" className="link">
              Hoá đơn
            </NavLink>
          </div>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
