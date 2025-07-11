import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import useCategory from "../../../hooks/category/useCategory";
import useSellerAuth from "../../../hooks/auth/useSellerAuth";
import BasicSection from "../../seller/form/sections/BasicSection";
import CategorySection from "../../seller/form/sections/CategorySection";
import VariantSection from "../../seller/form/sections/VariantSection";
import ImageSection from "../../seller/form/sections/ImageSection";
import AttributeSection from "../../seller/form/sections/AttributeSection";
import PricingSection from "../../seller/form/sections/PricingSection";
import { useEffect, useMemo, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import LoadingSpinner from "../UI/LoadingSpinner";
import styled from "styled-components";
import SpecificationSection from "../../seller/form/sections/SpecificationSection";
import InventorySection from "../../seller/form/sections/InventorySection";

const ProductForm = ({ initialData, onSubmit, isSubmitting, mode = "add" }) => {
  const initialFormValues = useMemo(() => {
    const defaults = {
      name: "",
      description: "",
      price: 0,
      category: "",
      variants: [],
      images: [],
      attributes: [],
      totalStock: null,
    };

    if (initialData) {
      // For existing data, convert totalStock to string
      return {
        ...initialData,
        totalStock:
          initialData.totalStock !== undefined
            ? String(initialData.totalStock)
            : "",
      };
    }
    return defaults;
  }, [initialData]);

  const methods = useForm({
    defaultValues: initialFormValues,
  });

  const { handleSubmit, control, setValue } = methods;
  const { getCategories } = useCategory();
  const { data, isLoading } = getCategories;

  // const [selectedCategoryType, setSelectedCategoryType] = useState("");
  const { seller: currentUser } = useSellerAuth();
  const [localVariants, setLocalVariants] = useState(
    Array.isArray(initialData?.variants) ? initialData.variants : []
  );

  const {
    fields: attributeFields,
    append: appendAttribute,
    remove: removeAttribute,
  } = useFieldArray({
    control,
    name: "attributes",
  });

  // Update form variants when localVariants change
  useEffect(() => {
    setValue("variants", localVariants);
  }, [localVariants, setValue]);

  useEffect(() => {
    if (localVariants.length > 0) {
      const total = localVariants.reduce(
        (sum, variant) => sum + parseInt(variant.stock || ""),
        0
      );

      setValue("totalStock", total);
    }
  }, [localVariants, setValue]);
  const categories = useMemo(() => data?.results || [], [data]);

  const handleAddAttribute = () => {
    appendAttribute({ name: "", value: "" });
  };

  if (isLoading) return <LoadingSpinner />;
  if (getCategories.error) return <div>Error loading categories</div>;

  return (
    <ProductFormContainer>
      <FormHeader>
        <BackButton onClick={() => window.history.back()}>
          <FaArrowLeft /> Back
        </BackButton>
        <FormTitle>
          {mode === "add" ? "Add New Product" : "Edit Product"}
        </FormTitle>
      </FormHeader>
      <FormProvider {...methods}>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <SectionContainer>
            <SectionTitle>Basic Information</SectionTitle>
            <BasicSection />
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>Pricing</SectionTitle>
            <PricingSection isSubmitting={isSubmitting} />
          </SectionContainer>

          <SectionContainer>
            <CategorySection
              // setSelectedCategoryType={setSelectedCategoryType}
              categories={categories}
              initialData={initialData}
              mode={mode}
            />
          </SectionContainer>

          <SectionContainer>
            <AttributeSection
              isSubmitting={isSubmitting}
              handleAddAttribute={handleAddAttribute}
              fields={attributeFields}
              remove={removeAttribute}
              currentUser={currentUser}
              categories={categories}
              setLocalVariants={setLocalVariants}
              // selectedCategoryType={selectedCategoryType}
            />
          </SectionContainer>

          <VariantSection
            localVariants={localVariants}
            setLocalVariants={setLocalVariants}
            isSubmitting={isSubmitting}
          />
          <SectionContainer>
            <InventorySection isSubmitting={isSubmitting} />
          </SectionContainer>

          <SectionContainer>
            <SpecificationSection />
          </SectionContainer>

          <SectionContainer>
            <ImageSection
              isSubmitting={isSubmitting}
              initialData={initialData}
            />
          </SectionContainer>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoadingSpinner />
            ) : mode === "add" ? (
              "Add Product"
            ) : (
              "Save Changes"
            )}
          </SubmitButton>
        </StyledForm>
      </FormProvider>
    </ProductFormContainer>
  );
};

export default ProductForm;

// Styled Components
const ProductFormContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const FormHeader = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  color: #1a202c;
  margin: 0;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f1f5f9;
    border-color: #cbd5e0;
  }
`;

const StyledForm = styled.form`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 2rem;
`;

const SectionContainer = styled.div`
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  border-radius: 8px;
  background: #f9fafb;
  border: 1px solid #e2e8f0;
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  color: #2d3748;
  margin-top: 0;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
`;

const SubmitButton = styled.button`
  background: #3182ce;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    background: #2b6cb0;
  }

  &:disabled {
    background: #a0aec0;
    cursor: not-allowed;
  }
`;
