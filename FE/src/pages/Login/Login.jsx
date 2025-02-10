import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import "./Login.css";
import Eyes from "../../assets/images/Eyes1.svg";
import { useForm } from "react-hook-form";
import userService from "../../service/userService";
import { toast } from "react-toastify";

const Login = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const navigate = useNavigate();

  const handleLogin = async (data) => {
    const res = await userService.login(data);
    if (res) {
      const userInfo = JSON.stringify(res.data);

      localStorage.setItem("userInfo", userInfo);
      toast.success("Đăng nhập thành công!");
      navigate("/");
    }
  };

  return (
    <>
      <div className="login">
        <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
          <h1 className="login-logo">
            <img src={Logo} alt="Logo" className="login-logo" width={207} />
          </h1>

          <div className="login-control">
            <div className="login-group">
              <label htmlFor="email">Email hoặc tên đăng nhập</label>
              <input
                type="text"
                placeholder="Nhập email hoặc tên đăng nhập"
                id="email"
                name="email"
                {...register("email", {
                  required: "Vui lòng nhập email!",
                  minLength: {
                    value: 3,
                    message: "Email phải lớn hơn 3 kí tự",
                  },
                })}
              />
              <p className="error login-error">{errors.email?.message}</p>
            </div>

            <div className="login-group">
              <label htmlFor="password">Mật khẩu</label>
              <div className="login-password">
                <input
                  type="text"
                  placeholder="Nhập mật khẩu"
                  id="password"
                  name="password"
                  {...register("password", {
                    required: "Vui lòng nhập password!",
                  })}
                />
                <img src={Eyes} alt="icon" className="login-icon" />
              </div>
              <p className="error login-error">{errors.password?.message}</p>
            </div>

            <NavLink to="/password/forgot" className="forgot-password">
              Quên mật khẩu?
            </NavLink>
          </div>

          <div className="login-button">
            <button type="submit" className="btn btn-login">
              Đăng nhập
            </button>
            <NavLink to="/register" className="btn btn-register">
              Chưa có tài khoản? Đăng ký
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
