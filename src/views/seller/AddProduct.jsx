import { useNavigate } from "react-router-dom";
import useSellerAuth from "../../hooks/auth/useSellerAuth";
import useProduct from "../../hooks/product/useProduct";
import ProductForm from "../components/forms/ProductForm";
import { compressImage } from "../../utils/imageCompressor";

const AddProductPage = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useSellerAuth();
  const { createProduct } = useProduct();

  const handleSubmit = async (data) => {
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
        formData.append("newImages", file); // Changed field name
      });

      // formData.append("images", compressedImages);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("parentCategory", data.category);
      formData.append("subCategory", data.subCategory);
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
      formData.append("seller", currentUser.id);

      // for (const [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

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
    <div className="seller-container">
      <h1>Add New Product</h1>
      <ProductForm
        mode="add"
        onSubmit={handleSubmit}
        isSubmitting={createProduct.isPending}
      />
    </div>
  );
};

export default AddProductPage;
