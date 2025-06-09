import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sellerAuthApi } from "../../apiService/authApi";
import { useEffect } from "react";

const useSellerAuth = () => {
  const queryClient = useQueryClient();
  const validateToken = (token) => {
    if (!token) return false;
    try {
      const { exp } = JSON.parse(atob(token.split(".")[1]));
      return exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };
  useEffect(() => {
    return () => {
      if (!validateToken(localStorage.getItem("token"))) {
        queryClient.removeQueries(["sellerAuth"]);
        localStorage.removeItem("token");
      }
    };
  }, [queryClient]);

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["sellerAuth"],
    queryFn: async () => {
      const token = localStorage.getItem("token");

      if (!token || !validateToken(token)) {
        localStorage.removeItem("token");
        return null;
      }
      return sellerAuthApi.getCurrentUser();
    },
    staleTime: Infinity,
    retry: false,
  });

  const login = useMutation({
    mutationFn: sellerAuthApi.login,
    onSuccess: (data) => {
      const { user } = data.data.data;

      queryClient.setQueryData(["sellerAuth"], user);
      localStorage.setItem("token", data.data.token);
    },
  });

  const register = useMutation({
    mutationFn: sellerAuthApi.register,
    onSuccess: (data) => {
      queryClient.setQueryData(["sellerAuth"], data.user);
      localStorage.setItem("token", data.token);
    },
  });

  const logout = useMutation({
    mutationFn: sellerAuthApi.logout,
    onSuccess: () => {
      queryClient.removeQueries(["sellerAuth"]);
      localStorage.removeItem("token");
    },
  });

  const update = useMutation({
    mutationFn: (data) => sellerAuthApi.update(data), // Assuming you have an API method
    onSuccess: (response) => {
      console.log("Seller Updated Successfully!!!");
      const updatedSeller = response.data.seller;
      queryClient.setQueryData(["sellerAuth"], (oldData) => ({
        ...oldData,
        avatar: updatedSeller.avatar,
      }));

      // If you need to update other related queries
      queryClient.invalidateQueries(["seller", user.id]);
    },
    onError: (error) => {
      // Handle error (you might want to add error state)
      console.error("Update failed:", error);
    },
  });
  const imageUpdate = useMutation({
    mutationFn: (formData) => {
      console.log(formData);
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      return sellerAuthApi.updateSellerImage(formData, {
        headers: {
          "Content-Type": "multipart/form-ata",
        },
      });
    },
    onSuccess: (response) => {
      console.log("Updated seller:", response.data);
      const updatedSeller = response?.data.data;
      queryClient.setQueryData(["sellerAuth"], (oldData) => ({
        ...oldData,
        avatar: updatedSeller.avatar,
      }));

      // queryClient.invalidateQueries(["sellerAuth"]);
    },
    onError: (error) => {
      console.error("Update error:", error.response?.data || error.message);
    },
  });

  return {
    user,
    login,
    register,
    logout,
    update,
    isUserLoading,
    isLoginLoading: login.isLoading,
    isRegisterLoading: register.isLoading,
    isLogoutLoading: logout.isLoading,
    isUpdateLoading: update.isLoading,
    isLoading:
      isUserLoading ||
      login.isLoading ||
      register.isLoading ||
      logout.isLoading ||
      update.isLoading ||
      imageUpdate.isLoading,
    isImageUpdateLoading: imageUpdate.isLoading,
    isError: login.isError || register.isError,
    imageUpdate,
    isAuthenticated: !!user,
    isSeller: user?.role === "seller",
    status: user?.status || "pending",
  };
};

export default useSellerAuth;
