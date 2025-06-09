import { useForm, FormProvider } from "react-hook-form";
import useCategory from "../../../hooks/category/useCategory";
import useSellerAuth from "../../../hooks/auth/useSellerAuth";
import BasicSection from "../../seller/form/sections/BasicSection";
import CategorySection from "../../seller/form/sections/CategorySection";
import VariantSection from "../../seller/form/sections/VariantSection";
import ImageSection from "../../seller/form/sections/ImageSection";

import AttributeSection from "../../seller/form/sections/AttributeSection";
import SpecificationSection from "../../seller/form/sections/SpecificationSection";
import PricingSection from "../../seller/form/sections/PricingSection";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const PRODUCT_CATEGORIES = {
  fashion: {
    variantOptions: ["size", "color", "material", "style"],
    sizeOptions: ["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL"],
    colorOptions: [
      "Red",
      "Navy",
      "Black",
      "White",
      "Heather Grey",
      "Olive Green",
      "Royal Blue",
      "Burgundy",
    ],
    materialOptions: [
      "100% Cotton",
      "Polyester Blend",
      "Organic Cotton",
      "Linen",
      "Merino Wool",
      "Cashmere",
      "Silk",
    ],
    styleOptions: [
      "Regular Fit",
      "Slim Fit",
      "Relaxed Fit",
      "Oversized",
      "Tapered",
    ],
  },
  electronics: {
    variantOptions: ["storage", "color", "connectivity", "model"],
    storageOptions: ["64GB", "128GB", "256GB", "512GB", "1TB", "2TB"],
    colorOptions: [
      "Space Gray",
      "Silver",
      "Gold",
      "Rose Gold",
      "Midnight Green",
      "Jet Black",
    ],
    connectivityOptions: ["Wi-Fi 6", "5G", "Bluetooth 5.0", "NFC", "LTE"],
    modelOptions: [
      "Standard Edition",
      "Pro Version",
      "Limited Edition",
      "Refurbished",
    ],
  },
  furniture: {
    variantOptions: ["dimensions", "color", "material", "configuration"],
    dimensionsOptions: [
      "Small (80cm)",
      "Medium (120cm)",
      "Large (180cm)",
      "XL (240cm)",
    ],
    colorOptions: [
      "Walnut",
      "Espresso",
      "White Gloss",
      "Black Matte",
      "Natural Oak",
    ],
    materialOptions: [
      "Solid Wood",
      "MDF",
      "Metal Frame",
      "Genuine Leather",
      "Faux Leather",
    ],
    configurationOptions: ["Modular", "Fixed", "Convertible", "Expandable"],
  },
  beauty: {
    variantOptions: ["scent", "volume", "skinType", "formulation"],
    scentOptions: [
      "Unscented",
      "Lavender Vanilla",
      "Citrus Burst",
      "Ocean Breeze",
      "Rose Quartz",
    ],
    volumeOptions: ["30ml", "50ml", "100ml", "200ml", "500ml"],
    skinTypeOptions: ["Oily", "Dry", "Combination", "Sensitive", "Normal"],
    formulationOptions: ["Cream", "Gel", "Serum", "Oil", "Foam"],
  },
};

const ProductForm = ({ initialData, onSubmit, isSubmitting, mode = "add" }) => {
  const productCategories = useMemo(() => PRODUCT_CATEGORIES, []);

  const methods = useForm({
    defaultValues: initialData || {
      name: "",
      description: "",
      price: 0,
      category: "",
      variants: [],
      images: [],
    },
  });

  const { handleSubmit } = methods;

  const { getCategories } = useCategory();
  const { data, isLoading } = getCategories;

  console.log("cate", data);

  const [selectedCategoryType, setSelectedCategoryType] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});

  const { user: currentUser } = useSellerAuth();
  const [localVariants, setLocalVariants] = useState(
    Array.isArray(initialData?.variants) ? initialData.variants : []
  );

  const stableSetCategoryType = useCallback(setSelectedCategoryType, [
    setSelectedCategoryType,
  ]);
  const stableSetVariants = useCallback(setLocalVariants, [setLocalVariants]);
  const stableSetOptions = useCallback(setSelectedOptions, [
    setSelectedOptions,
  ]);

  // Add state for tracking removed variants
  const stableCurrentUser = useMemo(() => currentUser, [currentUser]);
  const localVariantsRef = useRef(localVariants);

  useEffect(() => {
    localVariantsRef.current = localVariants;
  }, [localVariants]);

  const categories = useMemo(() => data?.data.results || [], [data]);

  console.log("categories", categories);
  useEffect(() => {
    if (mode === "add") {
      setLocalVariants([]);
      setSelectedOptions({});
      // setValue("variants", localVariants);
    }
  }, [selectedCategoryType, mode]);

  if (isLoading) return <div>Loading categories...</div>;
  if (getCategories.error) return <div>Error loading categories</div>;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>{mode === "add" ? "Add new Product" : "Edit Product"}</h2>
        <BasicSection />
        <PricingSection isSubmitting={isSubmitting} />
        <CategorySection
          setSelectedCategoryType={stableSetCategoryType}
          categoriesData={categories}
          isSubmitting={false}
        />
        <VariantSection
          selectedCategoryType={selectedCategoryType}
          setSelectedCategoryType={stableSetCategoryType}
          localVariants={localVariants}
          setLocalVariants={stableSetVariants}
          selectedOptions={selectedOptions}
          setSelectedOptions={stableSetOptions}
          currentUser={stableCurrentUser}
          productCategories={productCategories}
          initialData={initialData}
          mode={mode}
          isSubmitting={isSubmitting}
        />
        <ImageSection isSubmitting={isSubmitting} initialData={initialData} />
        <SpecificationSection />
        <AttributeSection isSubmitting={isSubmitting} />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Submitting..."
            : mode === "add"
            ? "Add Product"
            : "Save Changes"}
        </button>
      </form>
    </FormProvider>
  );
};

export default ProductForm;
