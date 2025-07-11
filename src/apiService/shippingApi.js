import api from "./api"; // Assuming you have a configured Axios instance

const shippingApi = {
  calculateShipping: async (data) => {
    try {
      const response = await api.post("/shipping/calculate", data);
      return response.data;
    } catch (error) {
      // Handle specific error statuses if needed
      if (error.response?.status === 400) {
        throw new Error("Invalid shipping data");
      }
      throw new Error("Failed to calculate shipping");
    }
  },

  createShipping: async (orderData) => {
    try {
      const response = await api.post("/shipping/create", orderData);
      return response.data;
    } catch (error) {
      // Handle specific error statuses if needed
      if (error.response?.status === 401) {
        throw new Error("Authentication required");
      }
      throw new Error("Failed to create shipping order");
    }
  },
};

export default shippingApi;
