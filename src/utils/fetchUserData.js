import api from "../apiService/api";

export const fetchUserData = async (role, userId) => {
  let user;
  if (role === "admin") {
    user = await api.get(`/admin/${userId}`);
  }
  if (role === "seller") {
    user = await api.get(`/seller/me`);
  }
  if (role === "user") {
    user = await api.get(`/users/me`);
  }

  return user;
};
