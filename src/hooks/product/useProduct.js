import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productService } from "../../apiService/productService";
// import api from "../../apiService/api";

const useProduct = () => {
  const queryClient = useQueryClient();

  // Get all products
  const getProducts = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        return await productService.getAllProducts();
      } catch (error) {
        console.error("Failed to fetch products:", error);
        throw new Error("Failed to load products");
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  // Get single product by ID
  const useGetProductById = (id) =>
    useQuery({
      queryKey: ["products", id],
      queryFn: async () => {
        if (!id) return null;
        try {
          const res = await productService.getProductById(id);

          return res.data;
        } catch (error) {
          console.error(`Failed to fetch product ${id}:`, error);
          throw new Error(`Failed to load product: ${error.message}`);
        }
      },
      enabled: !!id,
      staleTime: 1000 * 60 * 5,
      retry: 2,
    });

  // Get all products by seller
  const useGetAllProductBySeller = (sellerId) =>
    useQuery({
      queryKey: ["seller-products", sellerId],
      queryFn: async () => {
        if (!sellerId) return null;
        try {
          return await productService.getAllProductsBySeller(sellerId);
        } catch (error) {
          throw new Error(`Failed to load seller products: ${error.message}`);
        }
      },
      enabled: !!sellerId,
      staleTime: 1000 * 60 * 2, // 2 minutes
    });

  // Create product mutation
  const createProduct = useMutation({
    mutationFn: (formData) => productService.createProduct(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const updateProduct = useMutation({
    mutationFn: ({ id, data }) => productService.updateProduct(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries(["product"]);
      console.log("product updated successfully!!!");
    },
  });
  // Delete product mutation
  const deleteProduct = useMutation({
    mutationFn: (id) => productService.deleteProduct(id),
    onSuccess: () => {
      queryClient.getQueryData(["product"]);
      console.log("product deleted successfully!!!");
    },
  });

  const getProductCountByCategory = useQuery({
    queryKey: ["productCountByCategory"],
    queryFn: () => productService.getProductCountByCategory(),
    onSuccess: () => {
      queryClient.invalidateQueries(["productCountByCategory"]);
      console.log("product count by category updated successfully!!!");
    },
  });

  return {
    getProducts,
    useGetProductById,
    useGetAllProductBySeller,
    getProductCountByCategory,
    createProduct: {
      mutate: createProduct.mutate,
      isPending: createProduct.isPending,
      error: createProduct.error,
    },
    updateProduct: {
      mutate: updateProduct.mutate,
      isPending: updateProduct.isPending,
      error: updateProduct.error,
    },
    deleteProduct: {
      mutate: deleteProduct.mutate,
      isLoading: deleteProduct.isLoading,
      error: deleteProduct.error,
    },
  };
};

export default useProduct;
