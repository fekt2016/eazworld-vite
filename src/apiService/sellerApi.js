import api from "./api";

const sellerApi = {
  // ... existing code ...

  // Get seller information as admin
  getSellerAsAdmin: (sellerId) => {
    return api.get(`/sellers/${sellerId}`);
  },

  // ... existing code ...
};

export default sellerApi;
