import api from "./api";

export const orderService = {
  getAllOrders: async () => {
    const response = await api.get("/order");
    return response.data;
  },
};
