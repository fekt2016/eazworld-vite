import { useCallback } from "react";

const useGetImmediateSubcategories = (categories) => {
  return useCallback(
    (categoryId) => {
      return categories
        .filter((cat) => cat.parentCategory === categoryId)
        .sort((a, b) => a.name.localeCompare(b.name));
    },
    [categories]
  );
};
export default useGetImmediateSubcategories;
