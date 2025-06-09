/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { privateRoutes } from "./privateRoutes.js";
import ProtectedRoutes from "../../Router/routes/ProtectedRoutes";
const MainLayout = lazy(() => import("../../layout/MainLayout"));

export const getRoutes = () => {
  privateRoutes.map((r) => {
    r.element = <ProtectedRoutes route={r}>{r.element}</ProtectedRoutes>;
  });
  return {
    path: "/",
    element: <MainLayout />,
    children: privateRoutes,
  };
};
