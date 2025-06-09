import { useCallback } from "react";

export const useGetSubCategoryCount = (categories) => {
  return useCallback(
    (categoryId) => {
      return categories.filter((cat) => cat.parentCategory === categoryId)
        .length;
    },
    [categories]
  );
};
