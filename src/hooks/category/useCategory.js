import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "../../apiService/categoryService";
import api from "../../apiService/api";

const useCategory = () => {
  const queryClient = useQueryClient();

  // Get all categories
  const getCategories = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const data = await categoryService.getAllCategories({ limit: 1000 }); // Set a high limit to get all categories
        return data || [];
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        return [];
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });

  // Custom hook to get single category by ID
  const useCategoryById = (id) =>
    useQuery({
      queryKey: ["category", id],
      queryFn: async () => {
        if (!id) return null;
        try {
          const { data } = await categoryService.getCategoryById(id);
          return data || null;
        } catch (error) {
          console.error(`Failed to fetch category ${id}:`, error);
          throw new Error(`Failed to load category: ${error.message}`);
        }
      },
      enabled: !!id,
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    });

  // Create category mutation
  const createCategory = useMutation({
    mutationFn: async (formData) => {
      const response = await api.post(
        "categories", // Your API endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      console.log("Category created successfully!!!");
    },
  });

  // Update category mutation
  const updateCategory = useMutation({
    mutationFn: async ({ id, formData }) => {
      const response = await api.patch(`/categories/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", variables.id] });
      console.log("Category updated successfully!!!");
    },
  });

  // Delete category mutation
  const deleteCategory = useMutation({
    mutationFn: async (id) => {
      console.log(id);
      await api.delete(`/categories/${id}`);
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.removeQueries({ queryKey: ["category", deletedId] });
      console.log("Category deleted successfully!!!");
    },
  });

  return {
    getCategories,
    useCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};

export default useCategory;
