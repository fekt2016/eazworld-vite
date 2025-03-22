/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import Register from "../../views/auth/Register.jsx";

const Login = lazy(() => import("../../views/auth/Login.jsx"));
const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default publicRoutes;
