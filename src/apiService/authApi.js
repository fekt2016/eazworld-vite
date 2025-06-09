import api from "./api";

export const authApi = {
  login: (credentials) => api.post("/users/login", credentials),
  register: (userData) => api.post("/users/register", userData),
  logout: () => api.post("/users/logout"),
  getCurrentUser: () => api.get("/users/me"),
  forgotPassword: (email) => api.post("/users/forgot-password", { email }),
  resetPassword: ({ token, password }) =>
    api.post(`/users/reset-password/${token}`, { password }),
};

export const adminAuthApi = {
  login: (credentials) => api.post("/admin/login", credentials),
  register: (userData) => api.post("/admin/register", userData),
  logout: () => api.post("/admin/logout"),
  getCurrentUser: () => api.get("/admin/getMe"),
  forgotPassword: (email) => api.post("/admin/forgot-password", { email }),
  resetPassword: ({ token, password }) =>
    api.post(`/admin/reset-password/${token}`, { password }),
};

export const sellerAuthApi = {
  login: (credentials) => api.post("/seller/login", credentials),
  register: (userData) => api.post("/seller/register", userData),
  logout: () => api.post("/seller/logout"),
  getCurrentUser: () => api.get("/seller/me"),
  updateSellerImage: (avatar) => api.patch("/seller/updateSellerImage", avatar),
  forgotPassword: (email) => api.post("/seller/forgot-password", { email }),
  resetPassword: ({ token, password }) =>
    api.post(`/seller/reset-password/${token}`, { password }),
  update: (data) => api.patch("/seller/updateMe", data),
};
