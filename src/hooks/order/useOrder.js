import { useQuery } from "@tanstack/react-query";
// import api from "../../apiService/api";
import { orderService } from "../../apiService/OrderApi";

const useOrder = () => {
  //   const queryClient = useQueryClient();

  const getAllOrders = useQuery({
    queryfn: async () => {
      try {
        const response = await orderService.getAllOrders();
        if (!response || !response.data) {
          throw new Error("No data received from the server");
        }
        return response.data;
      } catch (error) {
        console.error("Failed to fetch products:", error);
        throw new Error("Failed to load products");
      }
    },
  });

  return {
    getAllOrders,
  };
};
export default useOrder;
