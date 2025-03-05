import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import DefaultLayout from "../layout/DefaultLayout/DefaultLayout";
import ForgotPassword from "../pages/ForgotPasswod/ForgotPassword";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Otp from "../pages/Otp/Otp";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import VerifyAccount from "../pages/VerifyAccount/VerifyAccount";
import BoardingHouse from "../pages/BoardingHouse/BoardingHouse";
import Room from "../pages/Room/Room";
import Service from "../pages/Service/Service";
import Guest from "../pages/Guest/Guest";

export const route = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <DefaultLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },

          {
            path: "/boarding-house",
            element: <BoardingHouse />,
          },

          {
            path: "/room/:id",
            element: <Room />,
          },

          {
            path: "/service",
            element: <Service />,
          },

          {
            path: "/guest",
            element: <Guest />,
          },
        ],
      },
    ],
  },

  {
    path: "login",
    element: <Login />,
  },

  {
    path: "verify",
    element: <VerifyAccount />,
  },

  {
    path: "password/forgot",
    element: <ForgotPassword />,
  },

  {
    path: "password/otp",
    element: <Otp />,
  },

  {
    path: "password/reset",
    element: <ResetPassword />,
  },

  {
    path: "register",
    element: <Register />,
  },
];
