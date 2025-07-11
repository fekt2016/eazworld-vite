import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../../apiService/authApi";
import { useNavigate } from "react-router-dom";
// import { adminApi } from "../../apiService/adminApi";

const useAuth = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const {
    data: userData,
    isLoading: isUserLoading,
    error,
  } = useQuery({
    queryKey: ["auth"],
    queryFn: async (me) => {
      const token = localStorage.getItem("token");
      if (!token) return null;

      try {
        // Try to get user data based on the token
        const response = await authApi.getCurrentUser(me);
        console.log("response", response);
        return response.data?.data || null;
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("taken");
        }
        console.error("Error fetching user data:", error);
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: (failureCount, error) => {
      return error.response?.status !== 401 && failureCount < 2;
    },
    refetchOnWindowFocus: true,
  });

  const login = useMutation({
    mutationFn: (credentials) => authApi.login(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], data.data.data);
      localStorage.setItem("token", data.data.token);
    },
  });

  const register = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], data.data.data);
      localStorage.setItem("token", data.data.token);
    },
  });

  const logout = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.removeQueries(["auth"]);
      localStorage.removeItem("token");
      localStorage.removeItem("userData");

      queryClient.setQueryData(["cart", true], { cart: { products: [] } });
      queryClient.setQueryData(["cart", false], { cart: { products: [] } });
      localStorage.removeItem("guestCart");
      navigate("/");
    },
  });

  // Function to get seller data as admin
  // const getSellerAsAdmin = async (sellerId) => {
  //   try {
  //     const response = await adminApi.getSellerDetails(sellerId);
  //     return response.data.data;
  //   } catch (error) {
  //     console.error("Error fetching seller data:", error);
  //     throw error;
  //   }
  // };

  return {
    userData,
    login,
    register,
    logout,
    isLoading: isUserLoading,
    error,
    isAuthenticated: !!userData,
    isAdmin: userData?.role === "admin",
    isSeller: userData?.role === "seller",
  };
};

export default useAuth;
