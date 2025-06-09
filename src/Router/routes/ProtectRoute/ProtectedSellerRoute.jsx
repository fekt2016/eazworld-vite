import { Navigate } from "react-router-dom";
import useSellerAuth from "../../../hooks/auth/useSellerAuth";
const statusRedirectMap = {
  pending: "/seller/dashboard/account-pending",
  deactive: "/seller/dashboard/account-deactive",
  active: "/seller/dashboard",
};
const ProtectedSellerRoute = ({
  children,
  allowedStatuses = ["active"],
  customRedirectMap = statusRedirectMap,
}) => {
  const { isAuthenticated, isSeller, status, isLoading } = useSellerAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/seller/login" replace />;
  }

  if (!isSeller) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (!allowedStatuses.includes(status)) {
    const redirectPath = customRedirectMap[status] || "/unauthorized";
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export default ProtectedSellerRoute;
