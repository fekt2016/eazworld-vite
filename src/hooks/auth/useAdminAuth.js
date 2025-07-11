import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAuthApi } from "../../apiService/authApi";
const validateToken = (token) => {
  if (!token) {
    console.log("No token found");
    return false;
  }

  try {
    // Split token and decode payload
    const parts = token.split(".");
    if (parts.length !== 3) {
      console.error("Invalid token format");
      return false;
    }

    const payload = JSON.parse(atob(parts[1]));
    if (!payload.exp) {
      console.error("Token missing expiration");
      return false;
    }

    // Check expiration
    const isValid = payload.exp * 1000 > Date.now();
    console.log(`Token valid: ${isValid}`);
    return isValid;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};

const useAdminAuth = () => {
  const queryClient = useQueryClient();
  const adminTokenExists = !!localStorage.getItem("admin_token");
  if (!adminTokenExists) {
    queryClient.removeQueries(["adminAuth"]);
  }

  const {
    data: admin,
    isLoading: isAdminLoading,
    error: adminError,
  } = useQuery({
    queryKey: ["adminAuth"],
    queryFn: async () => {
      const token = localStorage.getItem("admin_token");

      if (!token || !validateToken(token)) {
        localStorage.removeItem("admin_token");
        return null;
      }

      try {
        const response = await adminAuthApi.getCurrentUser();
        console.log("Get current user response:", response);
        return response.data.data;
      } catch (error) {
        console.error("Get current user error:", error);
        throw error;
      }
    },
    enabled: adminTokenExists, // Only run if token exists
    onSuccess: (data) => {
      console.log("User data:", data);
    },
    staleTime: Infinity,
    retry: false,
  });

  const login = useMutation({
    mutationFn: adminAuthApi.login,
    onSuccess: (data) => {
      console.log("Login response:", data);
      const { user } = data.data.data;
      const { token } = data.data;

      console.log("Token:", token);

      localStorage.setItem("admin_token", token);
      localStorage.setItem("current_role", "admin"); // Push role to localStorage
      localStorage.removeItem("seller_token");
      localStorage.removeItem("token");
      queryClient.setQueryData(["adminAuth"], user);
      console.log("Login successfully!!!:", user);
    },
  });

  const register = useMutation({
    mutationFn: adminAuthApi.register,
    onSuccess: (data) => {
      queryClient.setQueryData(["adminAuth"], data.user);
      localStorage.setItem("admin_token", data.token);
    },
  });

  const logout = useMutation({
    mutationFn: adminAuthApi.logout,
    onSuccess: () => {
      queryClient.removeQueries(["adminAuth"]);
      localStorage.removeItem("admin_token");
    },
  });

  return {
    admin,
    login,
    register,
    logout,
    isAdminLoading,
    adminError,
    isAuthenticated: !!admin,
    isAdmin: admin?.role === "admin",
  };
};

export default useAdminAuth;
