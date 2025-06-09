import api from "./api";
const sellerAuthApi = {
  login: (credentials) => api.post("/seller/login", credentials),
  register: (userData) => api.post("/seller/register", userData),
  logout: () => api.post("/seller/logout"),
  getCurrentUser: () => api.get("/seller/me"),
  forgotPassword: (email) => api.post("/seller/forgot-password", { email }),
  resetPassword: ({ token, password }) =>
    api.post(`/seller/reset-password/${token}`, { password }),
};

export default sellerAuthApi;
