// import { useMutation } from "@tanstack/react-query";
// import api from "../../apiService/api";
// import { useNavigate } from "react-router-dom";

// export function useLogin(address) {
//   const navigate = useNavigate();

//   const { mutate, isLoading, error } = useMutation({
//     mutationKey: ["login"],
//     mutationFn: async (data) => {
//       // console.log(data);
//       const response = await api.post(address, data);

//       if (!response.data?.token) {
//         throw new Error("Authentication failed: No token received");
//       }

//       return response.data;
//     },
//     onSuccess: (data) => {
//       // Store token securely
//       const { user } = data.data;
//       console.log(user.role);
//       // console.log(user);
//       localStorage.setItem("token", data.token);
//       navigate("/seller/dashboard");
//       // Role-based redirection
//       // const redirectPaths = {
//       //   admin: "/admin/dashboard",
//       //   seller: "/seller/dashboard",
//       //   user: "/",
//       // };
//       // if (user.role === "seller") navigate("/seller/dashboard");
//       // // Navigate based on role or default to home
//       // navigate(redirectPaths[user.role] || "/");
//     },
//     onError: (error) => {
//       console.error("Login failed:", error);

//       // You could add error notification here
//       // toast.error(error.response?.data?.message || "Login failed");
//     },
//   });

//   // Return with more descriptive names
//   return {
//     login: mutate, // Renamed from mutate to login for clarity
//     isLoggingIn: isLoading, // More descriptive name
//     loginError: error?.response?.data?.message || error?.message, // Consistent error format
//   };
// }
