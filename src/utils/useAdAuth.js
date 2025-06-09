import useAdminAuth from "../hooks/auth/useAdminAuth";
import useSellerAuth from "../hooks/auth/useSellerAuth";

export const useAdAuth = () => {
  const { data: adminData } = useAdminAuth();
  const { data: sellerData } = useSellerAuth();

  return {
    user: adminData?.user || sellerData?.user,
    role: adminData?.role || sellerData?.role,
    isLoading: adminData?.isLoading || sellerData?.isLoading,
  };
};
