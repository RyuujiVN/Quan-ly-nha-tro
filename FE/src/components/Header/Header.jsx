import Search from "../Search/Search";
import Alert from "../../assets/images/icon.svg";
import Avatar from "../../assets/images/SAO.jpg";
import "./Header.css";
import userService from "../../service/userService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    userService.logout().then((res) => {
      navigate("/login");
      toast.success(res.data?.message)
    });
  };
  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="navbar">
            <Search />
            <div className="header-action">
              <img src={Alert} alt="Alert icon" className="alert-icon" />
              <div className="header-account">
                <div className="header-user">
                  <div className="header-avatar">
                    <img src={Avatar} alt="Avatar" />
                  </div>

                  <div className="header-info">
                    <div className="name">User 1</div>
                    <div className="role">Admin</div>
                  </div>

                  <button className="btn btn-logout" onClick={handleClick}>
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
