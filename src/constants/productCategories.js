export const PRODUCT_CATEGORIES = {
  artscrafts: {
    jewelrymaking: {
      variantOptions: ["material", "finish"],
      materialOptions: ["Silver", "Gold", "Beads", "Wire"],
      finishOptions: ["Polished", "Matte", "Oxidized"],
    },
    paintingdrawing: {
      variantOptions: ["medium", "size"],
      mediumOptions: ["Watercolor", "Acrylic", "Charcoal", "Oil"],
      sizeOptions: ["A4", "A3", "Canvas 10x12", "Canvas 16x20"],
    },
    papercrafts: {
      variantOptions: ["paperType", "color"],
      paperTypeOptions: ["Cardstock", "Origami", "Scrapbook", "Tissue"],
      colorOptions: ["White", "Black", "Pastel", "Metallic"],
    },
    textilearts: {
      variantOptions: ["fabricType", "pattern"],
      fabricTypeOptions: ["Cotton", "Silk", "Linen", "Felt"],
      patternOptions: ["Floral", "Geometric", "Solid", "Striped"],
    },
  },

  petsupplies: {
    petfood: {
      variantOptions: ["animalType", "foodType"],
      animalTypeOptions: ["Dogs", "Cats", "Birds", "Fish"],
      foodTypeOptions: ["Dry", "Wet", "Raw", "Treats"],
    },

    toysaccessories: {
      variantOptions: ["material", "size"],
      materialOptions: ["Rubber", "Plastic", "Fabric", "Rope"],
      sizeOptions: ["Small", "Medium", "Large"],
    },

    healthwellness: {
      variantOptions: ["productType", "size"],
      productTypeOptions: [
        "Vitamins",
        "Shampoos",
        "Flea Control",
        "Medications",
      ],
      sizeOptions: ["50ml", "100ml", "250ml", "500ml"],
    },

    beddingfurniture: {
      variantOptions: ["material", "color"],
      materialOptions: ["Foam", "Memory Foam", "Wood", "Plastic"],
      colorOptions: ["Brown", "Blue", "Pink", "Gray"],
    },
  },

  automotive: {
    automotiveservices: {
      variantOptions: ["serviceType", "duration"],
      serviceTypeOptions: [
        "Oil Change",
        "Tire Rotation",
        "Detailing",
        "Inspection",
      ],
      durationOptions: ["30 mins", "1 hour", "2 hours", "Full Day"],
    },

    carcaredetailing: {
      variantOptions: ["packageType", "vehicleSize"],
      packageTypeOptions: ["Basic Wash", "Polish", "Wax", "Full Detail"],
      vehicleSizeOptions: ["Sedan", "SUV", "Truck", "Coupe"],
    },

    partsaccessories: {
      variantOptions: ["partType", "brand"],
      partTypeOptions: ["Tires", "Brakes", "Lights", "Suspension"],
      brandOptions: ["Bosch", "NGK", "Michelin", "Bilstein"],
    },

    specialtyniche: {
      variantOptions: ["nicheType", "customizationLevel"],
      nicheTypeOptions: ["Classic Cars", "Off-Road", "Racing", "Electric"],
      customizationLevelOptions: ["Basic", "Intermediate", "Pro"],
    },

    technologyupgrades: {
      variantOptions: ["upgradeType", "compatibility"],
      upgradeTypeOptions: ["GPS", "Audio", "Security", "Performance Chip"],
      compatibilityOptions: ["Universal", "Model Specific"],
    },

    toolsandequipment: {
      variantOptions: ["toolType", "powerSource"],
      toolTypeOptions: ["Impact Wrench", "OBD2 Scanner", "Lift", "Multimeter"],
      powerSourceOptions: ["Corded", "Battery", "Pneumatic"],
    },
  },

  babykids: {
    babygearessentials: {
      variantOptions: ["gearType", "material"],
      gearTypeOptions: ["Stroller", "Car Seat", "High Chair", "Baby Carrier"],
      materialOptions: ["Aluminum", "Plastic", "Fabric"],
    },

    carewellness: {
      variantOptions: ["productType", "scent"],
      productTypeOptions: ["Diapers", "Creams", "Wipes", "Bath Products"],
      scentOptions: ["Unscented", "Lavender", "Vanilla", "Aloe Vera"],
    },

    celebrationsgifting: {
      variantOptions: ["occasion", "giftType"],
      occasionOptions: [
        "Birthday",
        "Baby Shower",
        "Gender Reveal",
        "Christmas",
      ],
      giftTypeOptions: ["Gift Card", "Baskets", "Personalized Package"],
    },

    clothingapparel: {
      variantOptions: ["size", "fabric"],
      sizeOptions: ["Newborn", "0-3M", "3-6M", "6-12M", "12-18M"],
      fabricOptions: ["Cotton", "Organic Cotton", "Bamboo", "Polyester"],
    },

    educationaltoys: {
      variantOptions: ["ageGroup", "toyType"],
      ageGroupOptions: ["0-6 Months", "6-12 Months", "1-3 Years", "3-5 Years"],
      toyTypeOptions: ["STEM", "Books", "Puzzles", "Musical Instruments"],
    },

    specialtyservices: {
      variantOptions: ["serviceType", "duration"],
      serviceTypeOptions: [
        "Baby Massage",
        "Developmental Coaching",
        "Photography",
      ],
      durationOptions: ["30 mins", "1 hour", "Half Day", "Full Day"],
    },

    toysplay: {
      variantOptions: ["type", "material"],
      typeOptions: ["Blocks", "Ride-Ons", "Soft Toys", "Learning Tables"],
      materialOptions: ["Wood", "Plastic", "Rubber", "Foam"],
    },
  },

  beautypersonalcare: {
    fragrances: {
      variantOptions: ["fragranceType", "size"],
      fragranceTypeOptions: [
        "Eau de Parfum",
        "Eau de Toilette",
        "Cologne",
        "Body Mist",
      ],
      sizeOptions: ["30ml", "50ml", "100ml", "150ml"],
    },

    haircare: {
      variantOptions: ["productType", "hairType"],
      productTypeOptions: ["Shampoo", "Conditioner", "Serum", "Hair Mask"],
      hairTypeOptions: ["Oily", "Dry", "Normal", "Colored"],
    },

    makeup: {
      variantOptions: ["productType", "shade"],
      productTypeOptions: ["Foundation", "Lipstick", "Eyeshadow", "Mascara"],
      shadeOptions: ["Fair", "Medium", "Tan", "Deep"],
    },

    wellness: {
      variantOptions: ["productType", "size"],
      productTypeOptions: [
        "Vitamins",
        "Supplements",
        "CBD Oil",
        "Skincare Kit",
      ],
      sizeOptions: ["30 capsules", "60 capsules", "100ml", "250ml"],
    },
  },
};
