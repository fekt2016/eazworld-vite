import { useParams } from "react-router-dom";

import useProduct from "../../hooks/product/useProduct";
import ProductForm from "../components/forms/ProductForm";
import { compressImage } from "../../utils/imageCompressor";
// import api from "../../apiService/api";

const EditProduct = () => {
  const { productId } = useParams();

  const { useProductById, updateProduct } = useProduct();
  const { data: productResponse, isLoading, error } = useProductById(productId);

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  const product = productResponse?.data?.data || {};

  const handleSubmit = async (data) => {
    console.log("data2", data);
    const formData = new FormData();

    try {
      // Handle image cover
      if (data.imageCover instanceof File) {
        const compressedCover = await compressImage(data.imageCover, {
          quality: 0.7,
          maxWidth: 1024,
          maxHeight: 1024,
        });
        formData.append("imageCover", compressedCover);
      } else if (data.imageCover) {
        formData.append("imageCover", data.imageCover);
      }

      // Handle images
      const existingImages = data.images.filter(
        (img) => typeof img === "string"
      );
      const newImages = data.images.filter((img) => img instanceof File);

      // 1. Stringify existing images array
      formData.append("existingImages", JSON.stringify(existingImages));

      // 2. Use separate field for new images
      const compressedNewImages = await Promise.all(
        newImages.map((file) =>
          compressImage(file, { quality: 0.6, maxWidth: 800, maxHeight: 800 })
        )
      );

      compressedNewImages.forEach((file) => {
        formData.append("newImages", file); // Changed field name
      });

      // Other fields
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("category", data.category);
      formData.append("variants", JSON.stringify(data.variants));
      formData.append("specifications[weight]", data.specifications.weight);
      formData.append(
        "specifications[dimension]",
        data.specifications.dimension
      );

      data.specifications.material.forEach((mat, index) => {
        formData.append(
          `specifications[material][${index}][hexCode]`,
          mat.hexCode
        );
        mat.value.forEach((val, valIndex) => {
          formData.append(
            `specifications[material][${index}][value][${valIndex}]`,
            val
          );
        });
      });
      formData.append("attributes", JSON.stringify(data.attributes));

      // Debug log
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      updateProduct.mutate({
        id: product._id,
        data: formData,
      });
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  const initialFormData = {
    ...product,
    variants: JSON.parse(product.variants).map((variant) => ({
      ...variant,
      price: parseFloat(variant.price),
      stock: parseInt(variant.stock),
    })),
    images: product.images.map((img) =>
      typeof img === "object" ? img.url : img
    ), // Array of image URLs
  };

  return (
    <div>
      <h1>Edit Product</h1>
      {product && (
        <ProductForm
          initialData={initialFormData}
          onSubmit={handleSubmit}
          isSubmitting={updateProduct.isLoading}
          mode="edit"
        />
      )}
    </div>
  );
};

export default EditProduct;
