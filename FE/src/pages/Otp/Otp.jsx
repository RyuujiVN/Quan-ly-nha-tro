import { useNavigate, useSearchParams } from "react-router-dom";
import Logo from "/src/assets/images/Logo.png";
import "./Otp.css";
import { useForm } from "react-hook-form";
import userService from "../../service/userService.js";
import { useEffect, useRef, useState } from "react";

const ForgotPassword = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [count, setCount] = useState(60);
  const sendOtp = useRef();
  const timerId = useRef();
  const [emailParam, setEmailParam] = useSearchParams();

  const navigate = useNavigate();

  const handleOtp = async (data) => {
    data.email = emailParam.get("email");
    const res = await userService.sendOtp(data);

    clearInterval(timerId.current);

    if (res) {
      navigate(`/password/reset?email=${res.data.email}`);
    }
  };

  useEffect(() => {
    sendOtp.current.innerHTML = count !== 60 ? count : "Gửi lại mã";

    if (count === 0) {
      clearInterval(timerId.current);
      sendOtp.current.innerHTML = "Gửi lại mã";
    }
  }, [count]);

  const handleSendOtp = async () => {
    timerId.current = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    sendOtp.current.setAttribute("disabled", "");
    const email = emailParam.get("email");
    await userService.forgotPassword({
      email: email,
    });
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
              <label htmlFor="otp">Nhập mã xác nhận</label>
              <input
                type="text"
                placeholder="Nhập mã xác nhận vừa được gửi đến email bạn"
                id="otp"
                name="otp"
                {...register("otp", {
                  required: "Vui lòng nhập otp!",
                })}
              />
              <p className="error password-error">{errors.otp?.message}</p>
            </div>
            <button className="send-otp" onClick={handleSendOtp} ref={sendOtp}>
              Gửi lại mã
            </button>
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
