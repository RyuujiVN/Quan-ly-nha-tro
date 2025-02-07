import { NavLink } from "react-router-dom";
import Logo from "/src/assets/images/Logo.png";
import "./Register.css";
import { useForm } from "react-hook-form";

const Register = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const handleRegister = (data) => {
    console.log(data);
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
                })}
              />
              <p className="error register-error">{errors.email?.message}</p>
            </div>

            <div className="register-group">
              <label htmlFor="password">Mật khẩu</label>
              <div className="register-password">
                <input
                  type="text"
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
              <label htmlFor="confirm_password">Mật khẩu</label>
              <div className="register-confirm_passwordd">
                <input
                  type="text"
                  placeholder="Nhập mật khẩu"
                  id="confirm_password"
                  name="confirm_password"
                  {...register("confirm-password", {
                    required: "Vui lòng nhập xác nhận mật khẩu!",
                  })}
                />
              </div>
              <p className="error register-error">{errors.confirm_password?.message}</p>
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
