import { useNavigate, useSearchParams } from "react-router-dom";
import Logo from "/src/assets/images/Logo.png";
import "./ResetPassword.css";
import { useForm } from "react-hook-form";
import userService from "../../service/userService.js";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;
  const [emailParam, setEmailParam] = useSearchParams();

  const navigate = useNavigate();

  const handleOtp = async (data) => {
    data.email = emailParam.get("email");
    console.log(data);
    const res = await userService.resetPassword(data);

    toast.success(res.data?.message);
    navigate("/login");
  };

  return (
    <>
      <div className="password">
        <form className="password-form" onSubmit={handleSubmit(handleOtp)}>
          <h1 className="password-logo">
            <img src={Logo} alt="Logo" className="password-logo" width={207} />
          </h1>

          <div className="password-control">
            <div className="password-group">
              <label htmlFor="password">Đặt lại mật khẩu</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                id="password"
                name="password"
                {...register("password", {
                  required: "Vui lòng nhập mật khẩu!",
                })}
              />
              <p className="error password-error">{errors.password?.message}</p>
            </div>

            <div className="password-group">
              <label htmlFor="confirm_password">Xác nhận mật khẩu</label>
              <div className="password-confirm_password">
                <input
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  id="confirm_password"
                  name="confirm_password"
                  {...register("confirm_password", {
                    required: "Vui lòng nhập xác nhận mật khẩu!",
                    validate: (value) => {
                      return (
                        value === getValues("password") || "Mật khẩu không khớp"
                      );
                    },
                  })}
                />
              </div>
              <p className="error password-error">
                {errors.confirm_password?.message}
              </p>
            </div>
          </div>

          <div className="password-button">
            <button type="submit" className="btn btn-password">
              OK
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
