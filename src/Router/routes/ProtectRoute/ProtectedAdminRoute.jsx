import { Navigate } from "react-router-dom";
import useAdminAuth from "../../../hooks/auth/useAdminAuth";

const ProtectedAdminRoute = ({ children }) => {
  // const { isAuthenticated, isAdmin, isLoading } = useAuth();c
  const { isAuthenticated, isAdmin, isLoading } = useAdminAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
