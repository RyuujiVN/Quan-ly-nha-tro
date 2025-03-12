import { NavLink, useNavigate } from "react-router-dom";
import Logo from "/src/assets/images/Logo.png";
import "./Register.css";
import { useForm } from "react-hook-form";
import userService from "../../service/userService.js";
import { toast } from "react-toastify";

const Register = () => {
  const { register, handleSubmit, getValues, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    const res = await userService.register(userInfo);
    
    toast.success(res.data?.message);
    navigate("/login");
  };

  return (
    <>
      <div className="register">
        <form className="register-form" onSubmit={handleSubmit(handleRegister)}>
          <h1 className="register-logo">
            <img src={Logo} alt="Logo" className="register-logo" width={207} />
          </h1>

          <div className="register-control">
            <div className="register-group">
              <label htmlFor="name">Tên đăng nhập</label>
              <input
                type="text"
                placeholder="Nhập name"
                id="name"
                name="name"
                {...register("name", {
                  required: "Vui lòng nhập tên đăng nhập!",
                })}
              />
              <p className="error register-error">{errors.name?.message}</p>
            </div>

            <div className="register-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="Nhập email"
                id="email"
                name="email"
                {...register("email", {
                  required: "Vui lòng nhập email!",
                  pattern: {
                    value: /[a-zA-Z0-9\\._+-]+@[a-zA-Z0-9\\._+-]+.[a-zA-Z0-9\\._+-]/,
                    message: "Vui lòng nhập email đúng định dạng!",
                  },
                })}
              />
              <p className="error register-error">{errors.email?.message}</p>
            </div>

            <div className="register-group">
              <label htmlFor="password">Mật khẩu</label>
              <div className="register-password">
                <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  id="password"
                  name="password"
                  {...register("password", {
                    required: "Vui lòng nhập password!",
                  })}
                />
              </div>
              <p className="error register-error">{errors.password?.message}</p>
            </div>

            <div className="register-group">
              <label htmlFor="confirm_password">Xác nhận mật khẩu</label>
              <div className="register-confirm_password">
                <input
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  id="confirm_password"
                  name="confirm_password"
                  {...register("confirm_password", {
                    required: "Vui lòng nhập xác nhận mật khẩu!",
                    validate: (value) => {
                      return (
                        value === getValues("password") ||
                        "Mật khẩu không khớp!"
                      );
                    },
                  })}
                />
              </div>
              <p className="error register-error">
                {errors.confirm_password?.message}
              </p>
            </div>
          </div>

          <div className="register-button">
            <button type="submit" className="btn btn-register">
              Đăng ký
            </button>
            <NavLink to="/login" className="btn btn-login">
              Chưa có tài khoản? Đăng nhập
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
