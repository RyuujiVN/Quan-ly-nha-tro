import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import DefaultLayout from "../layout/DefaultLayout/DefaultLayout";
import ForgotPassword from "../pages/ForgotPasswod/ForgotPassword";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

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
    path: "register",
    element: <Register />,
  },
];
