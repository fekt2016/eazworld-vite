import { Outlet } from "react-router-dom";
// import useAuth from "../hooks/auth/useAuth";

const AuthLayout = () => {
  // const { user } = useAuth();
  // if (user) {
  //   return <Navigate to={user.isAdmin ? "/admin" : "/seller"} replace />;
  // }

  return (
    <div className="auth-layout">
      <div className="auth-container">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
