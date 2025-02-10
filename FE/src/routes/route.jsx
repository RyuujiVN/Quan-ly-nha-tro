import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import DefaultLayout from "../layout/DefaultLayout/DefaultLayout";
import ForgotPassword from "../pages/ForgotPasswod/ForgotPassword";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Otp from "../pages/Otp/Otp";
import ResetPassword from "../pages/ResetPassword/ResetPassword";

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
        ],
      },
    ],
  },

  {
    path: "login",
    element: <Login />,
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
