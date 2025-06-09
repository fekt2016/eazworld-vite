import { Link } from "react-router-dom";
import useProduct from "../../hooks/product/useProduct";
import useSellerAuth from "../../hooks/auth/useSellerAuth";
import { useState } from "react";

export default function AllProduct() {
  const { user: currentUser, isLoading: authLoading } = useSellerAuth();
  const { useProductBySellerId, deleteProduct } = useProduct();
  const [deletingId, setDeletingId] = useState(null);

  const sellerId = currentUser?.id;
  const {
    data: productsResponse,
    isLoading: productsLoading,
    error,
  } = useProductBySellerId(sellerId, {
    enabled: !!sellerId, // Only fetch when seller ID exists
  });

  if (authLoading || productsLoading) {
    return <div>Loading products...</div>;
  }
  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }
  // if (error) return <div>Error loading products: {error.message}</div>;

  const products = productsResponse?.data?.data || [];
  console.log(products);

  if (products.length <= 0) return <h1>No products found</h1>;

  return (
    <div>
      <h1>All Products</h1>
      <div>
        {products?.map((product) => (
          <div
            key={product.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",

              padding: "1rem 5rem",
              gap: "2rem",
            }}
          >
            <div style={{ display: "flex" }}>
              <img
                style={{ height: "10rem", width: "10rem", padding: "1rem" }}
                src={product.imageCover}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3>{product.name.slice(0, 15)}</h3>
                <p>{product.description}</p>
                <p>{product.stock}</p>
              </div>
            </div>
            <div>
              <Link to={`/seller/dashboard/edit-product/${product.id}`}>
                Edit
              </Link>
              <button
                disabled={deletingId === product.id}
                onClick={() => {
                  deleteProduct.mutate(product.id, {
                    onSettled: () => setDeletingId(product.id),
                  });
                }}
              >
                {deletingId === product.id ? "Deleting..." : "Delete"}
              </button>
            </div>
            {deleteProduct.error && (
              <div>Delete failed: {deleteProduct.error.message}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
