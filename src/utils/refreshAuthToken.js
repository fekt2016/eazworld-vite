import api from "../apiService/api";
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export const refreshAuthToken = async () => {
  try {
    // Get refresh token from secure storage
    const refreshToken =
      localStorage.getItem("refreshToken") || getCookie("refreshToken");

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await api.post("/auth/refresh-token", {
      refreshToken,
    });

    // Store new tokens
    localStorage.setItem("authToken", response.data.accessToken);

    // If using refresh token rotation
    if (response.data.refreshToken) {
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }

    return response.data.accessToken;
  } catch (error) {
    console.error("Token refresh failed:", error);
    // Clear auth state on failure
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
    throw error;
  }
};
