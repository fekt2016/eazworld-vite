import { useEffect, useMemo, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import styled from "styled-components";

export default function CategorySection({
  categories = [],
  // setSelectedCategoryType,
  initialData,
  mode,
  isSubmitting,
}) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const selectedCategory = watch("category");

  const selectedSubCategory = watch("subCategory");
  const prevInitialDataRef = useRef();
  const [subCategories, setSubCategories] = useState([]);

  // Memoized category lists
  const mainCategories = useMemo(() => {
    return categories
      .filter((c) => !c.parentCategory)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [categories]);

  // Single category type effect
  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find((c) => c._id === selectedCategory);

      if (category) {
        const categoryName = category.name.toLowerCase().replace(/\s+/g, "");
        console.log(categoryName);
        // Get subcategories from the database
        const subCategories = categories.filter((c) => {
          if (
            c.parentCategory &&
            typeof c.parentCategory === "object" &&
            c.parentCategory._id
          ) {
            return c.parentCategory._id === selectedCategory;
          }
          return c.parentCategory === selectedCategory;
        });

        if (subCategories.length > 0) {
          setSubCategories(subCategories);
        } else {
          setSubCategories([]);
        }

        // Only set category type if no subcategory is selected
        if (!selectedSubCategory) {
          // setSelectedCategoryType(categoryName);
        }
      }
    }
  }, [selectedCategory, categories, selectedSubCategory]);

  // Handle subcategory selection
  useEffect(() => {
    if (selectedSubCategory) {
      const subCategory = subCategories.find(
        (sub) => sub._id === selectedSubCategory
      );
      if (subCategory) {
        const subCategoryName = subCategory.name
          .toLowerCase()
          .replace(/\s+/g, "");
        console.log(subCategoryName);
        // setSelectedCategoryType(subCategoryName);
      }
    } else if (selectedCategory) {
      // If subcategory is cleared, fall back to main category
      const category = categories.find((c) => c._id === selectedCategory);
      if (category) {
        const categoryName = category.name.toLowerCase().replace(/\s+/g, "");
        console.log(categoryName);

        // setSelectedCategoryType(categoryName);
      }
    }
  }, [selectedSubCategory, subCategories, selectedCategory, categories]);

  // Edit mode initialization (runs once)
  useEffect(() => {
    if (
      mode === "edit" &&
      initialData &&
      initialData !== prevInitialDataRef.current
    ) {
      prevInitialDataRef.current = initialData;

      // Set category
      if (initialData.category) {
        const category = categories.find((c) => c._id === initialData.category);
        if (category) {
          setValue("category", category._id);
        }
      }

      // Set subcategory
      if (initialData.subCategory) {
        const subCategory = categories.find(
          (c) => c._id === initialData.subCategory
        );
        if (subCategory) {
          setValue("subCategory", subCategory._id);
        }
      }
    }
  }, [mode, initialData, categories, setValue]);

  return (
    <>
      <FormGroup>
        <Label>Category *</Label>
        <Select
          {...register("category", { required: "Category is required" })}
          disabled={isSubmitting}
        >
          <option value="">Select Category</option>
          {mainCategories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </Select>
        {errors.category && (
          <ErrorMessage>{errors.category.message}</ErrorMessage>
        )}
      </FormGroup>

      {subCategories.length > 0 && (
        <FormGroup>
          <Label>Subcategory</Label>
          <Select {...register("subCategory")} disabled={isSubmitting}>
            <option value="">Select Subcategory</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>
                {subCategory.name}
              </option>
            ))}
          </Select>
        </FormGroup>
      )}

      <FormGroup>
        <Label>Brand *</Label>
        <Input
          {...register("brand", { required: "Brand is required" })}
          placeholder="Enter brand name"
          disabled={isSubmitting}
        />
        {errors.brand && <ErrorMessage>{errors.brand.message}</ErrorMessage>}
      </FormGroup>
    </>
  );
}

const FormGroup = styled.div`
  margin-bottom: 1.25rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #4a5568;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

const ErrorMessage = styled.span`
  display: block;
  margin-top: 0.5rem;
  color: #e53e3e;
  font-size: 0.875rem;
`;
