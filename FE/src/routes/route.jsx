import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from '../pages/Register/Register';


export const route = [
    {
        path: '/',
        element: <Home />
    },

    {
        path: 'login',
        element: <Login />
    },

    {
        path: 'register',
        element: <Register />
    }
]