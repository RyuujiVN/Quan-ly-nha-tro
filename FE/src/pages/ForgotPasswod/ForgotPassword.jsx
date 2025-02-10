import { useNavigate } from "react-router-dom";
import Logo from "/src/assets/images/Logo.png";
import "./ForgotPassword.css";
import { useForm } from "react-hook-form";
import userService from "../../service/userService.js";

const ForgotPassword = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const navigate = useNavigate();

  const handleForgot = async (data) => {
    const res = await userService.forgotPassword(data);
    console.log(res)

    if (res) {
      navigate(`/password/otp?email=${res.data.email}`);
    }
  };

  return (
    <>
      <div className="password">
        <form className="password-form" onSubmit={handleSubmit(handleForgot)}>
          <h1 className="password-logo">
            <img src={Logo} alt="Logo" className="password-logo" width={207} />
          </h1>

          <div className="password-control">
            <div className="password-group">
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
              <p className="error password-error">{errors.email?.message}</p>
            </div>
          </div>

          <div className="password-button">
            <button type="submit" className="btn btn-password">
              Gửi mã xác nhận
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
