import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../../apiService/authApi";

const useAuth = (address, credential) => {
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["auth"],
    queryFn: authApi.getCurrentUser,
    staleTime: Infinity,
    retry: false,
  });

  const login = useMutation({
    mutationFn: () => authApi.login(address, credential),
    onSuccess: (data) => {
      console.log("Login data", data);
      queryClient.setQueryData(["auth"], data.user);

      localStorage.setItem("token", data.token);
    },
  });

  const register = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], data.user);
      localStorage.setItem("token", data.token);
    },
  });

  const logout = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.removeQueries(["auth"]);
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
    isSeller: user?.role === "seller",
  };
};

export default useAuth;
