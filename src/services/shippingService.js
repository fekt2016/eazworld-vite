// Ghana-specific shipping calculation
export const calculateShippingCost = (items, sellerLocation, buyerLocation) => {
  // 1. Calculate total weight
  const totalWeight = items.reduce(
    (sum, item) => sum + (item.weight || 1) * (item.quantity || 1),
    0
  );

  // 2. Calculate base cost based on Ghana logistics
  let baseCost = 15; // Base fee in GHS for Accra

  // Weight-based pricing
  if (totalWeight > 5) {
    baseCost += (totalWeight - 5) * 2;
  }

  // Distance factor (Accra as center)
  if (sellerLocation.region !== buyerLocation.region) {
    // Different regions
    baseCost += buyerLocation.region === "Greater Accra" ? 20 : 30;
  } else if (
    sellerLocation.region === "Greater Accra" &&
    sellerLocation.district !== buyerLocation.district
  ) {
    // Different districts in Accra
    baseCost += 10;
  }

  // 3. Apply company's fee structure
  const buyerCharge = baseCost * 0.55; // Buyer pays 55%
  const sellerCharge = baseCost * 0.3; // Seller pays 30%
  const companyFee = baseCost * 0.15; // Company keeps 15%

  // 4. Estimate delivery days
  let estimatedDays = 1; // Default for Accra
  if (sellerLocation.region !== buyerLocation.region) {
    estimatedDays = buyerLocation.region === "Greater Accra" ? 2 : 3;
  }

  return {
    baseCost,
    buyerCharge,
    sellerCharge,
    companyFee,
    estimatedDays,
  };
};

// Generate Ghana-style tracking number
export const generateTrackingNumber = () => {
  const prefix = "GH";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${prefix}-${timestamp}-${random}`;
};

// Determine delivery agent based on location
export const assignDeliveryAgent = (district) => {
  const accraAgents = {
    "Accra Metropolitan": { name: "Kwame Mensah", contact: "+233 55 123 4567" },
    "Tema Metropolitan": { name: "Ama Serwaa", contact: "+233 54 987 6543" },
    Adentan: { name: "Yaw Boateng", contact: "+233 20 112 2334" },
  };

  return (
    accraAgents[district] || {
      name: "Ghana Delivery Team",
      contact: "+233 30 111 2222",
    }
  );
};
