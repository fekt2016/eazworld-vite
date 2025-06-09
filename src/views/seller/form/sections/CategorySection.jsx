import { useEffect, useMemo, useRef } from "react";
import { useFormContext } from "react-hook-form";

export default function CategorySection({
  isSubmitting,
  categoriesData,
  setSelectedCategoryType,
  initialData,
  mode,
}) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
  const selectedCategory = watch("category");
  const prevInitialDataRef = useRef();
  console.log("categories", categoriesData);
  const categories = useMemo(() => categoriesData || [], [categoriesData]);

  // Memoized category lists
  const { mainCategories, subCategories } = useMemo(
    () => ({
      mainCategories: categories.filter((c) => !c.parentCategory),
      subCategories: categories.filter(
        (c) => c.parentCategory === selectedCategory
      ),
    }),
    [categories, selectedCategory]
  );

  // Single category type effect
  useEffect(() => {
    const currentCategory = categories.find((c) => c._id === selectedCategory);
    const categoryType = currentCategory?.parentCategory
      ? ""
      : currentCategory?.name.toLowerCase() || "";

    setSelectedCategoryType(categoryType);
  }, [selectedCategory, categories, setSelectedCategoryType]);

  useEffect(() => {
    if (!selectedCategory) {
      setSelectedCategoryType((prev) => (prev !== "" ? "" : prev));
      return;
    }

    const category = categories.find((c) => c._id === selectedCategory);
    const newType = category?.parentCategory
      ? ""
      : category?.name.toLowerCase() || "";

    setSelectedCategoryType((prev) => (prev !== newType ? newType : prev));
  }, [selectedCategory, categories, setSelectedCategoryType]);

  // Edit mode initialization (runs once)
  useEffect(() => {
    if (mode === "edit" && initialData?.category) {
      const initialCategory = categories.find(
        (c) => c._id === initialData.category
      );
      if (initialCategory) {
        setValue("category", initialData.category);
        initialData.subCategory &&
          setValue("subCategory", initialData.subCategory);
      }
    }
  }, [mode, initialData, categories, setValue]); // Fixed deps

  useEffect(() => {
    if (mode === "edit" && initialData?.category) {
      const shouldInitialize = !deepEqual(
        initialData,
        prevInitialDataRef.current
      );

      if (shouldInitialize && categories.length) {
        const initialCategory = categories.find(
          (c) => c._id === initialData.category
        );
        if (initialCategory) {
          setValue("category", initialData.category);
          setValue("subCategory", initialData.subcategory || "");
        }
      }
      prevInitialDataRef.current = initialData;
    }
  }, [initialData, mode, categories, setValue]);

  // Helper function
  const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  return (
    <div className="form-section">
      <h3>Category & Brand</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Category *</label>
          <select
            {...register("category", { required: "Category is required" })}
            disabled={isSubmitting}
          >
            <option value="">Select Category</option>
            {mainCategories
              .filter((c) => !c.parentCategory)
              .map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
          {errors.category && (
            <span className="error">{errors.category.message}</span>
          )}
        </div>

        {selectedCategory && (
          <div className="form-group">
            <label>Subcategory</label>
            <select
              {...register("subCategory")}
              disabled={!subCategories.length || isSubmitting}
            >
              <option value="">Select Subcategory</option>

              {subCategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label>Brand *</label>
          <input
            {...register("brand", { required: "Brand is required" })}
            disabled={isSubmitting}
          />
          {errors.brand && (
            <span className="error">{errors.brand.message}</span>
          )}
        </div>
      </div>
    </div>
  );
}
