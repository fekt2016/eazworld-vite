import axios from "axios";
// import { refreshAuthToken } from "../utils/refreshAuthToken";

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1/", // Good base URL setup
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// Add to your axios configuration
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const newToken = await refreshAuthToken();
//         localStorage.setItem("authToken", newToken);
//         return api(originalRequest);
//       } catch (refreshError) {
//         localStorage.removeItem("authToken");
//         window.location = "/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );
export default api;
