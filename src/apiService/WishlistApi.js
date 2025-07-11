import api from "./api";

// export const wishlistApi = {
//   getWishlist: async () => {
//     const response = await api.get("/wishlist");
//     return response.data;
//   },
//   addToWishlist: async () => {
//     const response = await api.post("/wishlist");
//     return response.data;
//   },
// };

export const wishlistApi = {
  getWishlist: async () => {
    const response = await api.get("/wishlist");
    return response.data;
  },

  toggleWishlist: async (productId) => {
    console.log("productId", productId);
    const response = await api.post("/wishlist/toggle", { productId });
    return response.data;
  },

  // Optional: Add specific add/remove methods if needed
  addToWishlist: async (productId) => {
    const response = await api.post("/wishlist", { productId });
    return response.data;
  },

  removeFromWishlist: async (productId) => {
    const response = await api.delete(`/wishlist/${productId}`);
    return response.data;
  },
};
