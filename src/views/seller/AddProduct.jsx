import { useNavigate } from "react-router-dom";
import useSellerAuth from "../../hooks/auth/useSellerAuth";
import useProduct from "../../hooks/product/useProduct";
import ProductForm from "../components/product/ProductForm";
import { compressImage } from "../../utils/imageCompressor";
import { generateSKU } from "../../utils/helpers";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";

const AddProductPage = () => {
  const navigate = useNavigate();
  const { seller } = useSellerAuth();

  const { createProduct } = useProduct();

  const handleSubmit = async (data) => {
    console.log("data", data);
    const formData = new FormData();

    try {
      // Compress images before submission
      const compressedCover = await compressImage(data.imageCover, {
        quality: 0.7,
        maxWidth: 1024,
      });
      formData.append("imageCover", compressedCover);

      const compressedImages = await Promise.all(
        data.images.map((file) =>
          compressImage(file, { quality: 0.6, maxWidth: 800 })
        )
      );

      compressedImages.forEach((file) => {
        formData.append("newImages", file);
      });

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("totalStock", data.totalStock);
      formData.append("price", data.price.toString());
      formData.append("parentCategory", data.category);
      if (data.subCategory && data.subCategory.match(/^[0-9a-fA-F]{24}$/)) {
        formData.append("subCategory", data.subCategory);
      }

      // Ensure variants are properly formatted before stringifying
      const formattedVariants = data.variants.map((variant) => ({
        ...variant,
        price: variant.price ? Number(variant.price) : 0,
        stock: variant.stock ? Number(variant.stock) : 0,
        sku:
          variant.sku ||
          generateSKU({
            user: seller,
            category: data.category,
            variants: variant,
          }),
      }));

      formData.append("variants", JSON.stringify(formattedVariants));
      // Handle key-value pairs
      data.specifications.keyValuePairs.forEach((pair, index) => {
        formData.append(
          `specifications[keyValuePairs][${index}][key]`,
          pair.key
        );
        formData.append(
          `specifications[keyValuePairs][${index}][value]`,
          pair.value
        );
      });

      // Handle "About This Item"
      formData.append("specifications[about]", data.specifications.about);
      formData.append("attributes", JSON.stringify(data.attributes));
      formData.append("seller", seller.id);

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      createProduct.mutate(formData, {
        onSuccess: () => {
          console.log("Product created successFully!!!");
          navigate("/seller/dashboard/products");
        },
        onError: (error) => {
          console.error("Creation error:", error);
        },
      });
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };
  return (
    <PageContainer>
      <HeaderContainer>
        <BackButton onClick={() => navigate("/seller/dashboard/products")}>
          <FaArrowLeft />
          Back to Products
        </BackButton>
        <PageTitle>Add New Product</PageTitle>
        <HeaderDescription>
          Fill out the form below to add a new product to your store
        </HeaderDescription>
      </HeaderContainer>

      <FormContainer>
        <ProductForm
          mode="add"
          onSubmit={handleSubmit}
          isSubmitting={createProduct.isPending}
        />
      </FormContainer>
    </PageContainer>
  );
};

export default AddProductPage;
const PageContainer = styled.div`
  padding: 2rem;
  background-color: #f8fafc;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderContainer = styled.div`
  margin-bottom: 2.5rem;
  position: relative;
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
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #f1f5f9;
    border-color: #cbd5e0;
    transform: translateY(-1px);
  }

  svg {
    font-size: 0.8rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a202c;
  margin: 1.5rem 0 0.5rem;
`;

const HeaderDescription = styled.p`
  font-size: 1rem;
  color: #718096;
  max-width: 700px;
  line-height: 1.5;
`;

const FormContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

// Loading spinner for when form is submitting
export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
