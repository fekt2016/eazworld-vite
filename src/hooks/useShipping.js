import { useMutation } from "react-query";
import { shippingApi } from "../api/shippingApi";

export const useShipping = () => {
  const calculateShipping = useMutation((data) =>
    shippingApi.calculateShipping(data)
  );

  const createShipping = useMutation((orderData) =>
    shippingApi.createShipping(orderData)
  );

  return {
    calculateShipping,
    createShipping,
    isLoading: calculateShipping.isLoading || createShipping.isLoading,
  };
};
