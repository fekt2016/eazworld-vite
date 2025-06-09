import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAuthApi } from "../../apiService/authApi";

const useAdminAuth = () => {
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["adminAuth"],
    queryFn: adminAuthApi.getCurrentUser,
    staleTime: Infinity,
    retry: false,
  });

  const login = useMutation({
    mutationFn: adminAuthApi.login,
    onSuccess: (data) => {
      const { user } = data.data.data;
      queryClient.setQueryData(["adminAuth"], user);
      localStorage.setItem("token", data.data.token);
    },
  });

  const register = useMutation({
    mutationFn: adminAuthApi.register,
    onSuccess: (data) => {
      queryClient.setQueryData(["adminAuth"], data.user);
      localStorage.setItem("token", data.token);
    },
  });

  const logout = useMutation({
    mutationFn: adminAuthApi.logout,
    onSuccess: () => {
      queryClient.removeQueries(["adminAuth"]);
      localStorage.removeItem("token");
    },
  });

  return {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };
};

export default useAdminAuth;
