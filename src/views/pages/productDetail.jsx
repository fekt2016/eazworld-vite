import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaChevronLeft,
  FaCheck,
} from "react-icons/fa";
import useProduct from "../../hooks/product/useProduct";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});

  const { useGetProductById } = useProduct();

  const { data: productData, isLoading, error } = useGetProductById(id);

  const product = useMemo(() => {
    return productData?.data.data;
  }, [productData]);

  // Parse variants
  const variants = useMemo(() => {
    if (!product?.variants) return [];
    try {
      return JSON.parse(product.variants);
    } catch (e) {
      console.error("Error parsing variants", e);
      return [];
    }
  }, [product]);

  // Get all unique attributes from variants
  const attributeOptions = useMemo(() => {
    const options = {};

    variants.forEach((variant) => {
      for (const [key, value] of Object.entries(variant)) {
        if (key === "price" || key === "stock" || key === "sku") continue;

        if (!options[key]) {
          options[key] = new Set();
        }
        options[key].add(value);
      }
    });

    return options;
  }, [variants]);

  console.log("attributeOptions", attributeOptions);
  console.log(Object.entries(attributeOptions));
  // Initialize selected attributes
  useEffect(() => {
    if (variants.length > 0) {
      const initialAttributes = {};

      Object.keys(attributeOptions).forEach((attr) => {
        initialAttributes[attr] = Array.from(attributeOptions[attr])[0];
      });

      setSelectedAttributes(initialAttributes);
    }
  }, [variants, attributeOptions]);

  // Update selected variant when attributes change
  useEffect(() => {
    if (Object.keys(selectedAttributes).length > 0) {
      const matchingVariant = variants.find((variant) => {
        return Object.entries(selectedAttributes).every(([key, value]) => {
          return variant[key] === value;
        });
      });

      setSelectedVariant(matchingVariant);
    }
  }, [selectedAttributes, variants]);

  // Update quantity if it exceeds selected variant stock
  useEffect(() => {
    if (selectedVariant && quantity > selectedVariant.stock) {
      setQuantity(selectedVariant.stock > 0 ? selectedVariant.stock : 1);
    }
  }, [selectedVariant, quantity]);

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, selectedVariant?.stock || 1));
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    console.log(
      `Added ${quantity} of ${product.name} (${selectedVariant.sku}) to cart`
    );
  };

  const handleAttributeChange = (attribute, value) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attribute]: value,
    }));
  };

  // Function to check if a value represents a valid color
  const isColorValue = (value) => {
    // Check for CSS color names
    const colorNames = [
      "black",
      "silver",
      "gray",
      "white",
      "maroon",
      "red",
      "purple",
      "fuchsia",
      "green",
      "lime",
      "olive",
      "yellow",
      "navy",
      "blue",
      "teal",
      "aqua",
      "orange",
    ];

    // Check if it's a hex color
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    // Check if it's a CSS color name
    const isNamedColor = colorNames.includes(value.toLowerCase());

    // Check if it's a hex value
    const isHexColor = hexRegex.test(value);

    return isNamedColor || isHexColor;
  };

  if (isLoading) return <Loading>Loading product details...</Loading>;
  if (error) return <Error>{error.message}</Error>;
  if (!product) return <Error>Product not found</Error>;

  // Get current display values based on selected variant
  const displayPrice = selectedVariant?.price || product.price;
  const displaySku = selectedVariant?.sku || product.sku;
  const displayStock = selectedVariant?.stock || product.totalStock;

  return (
    <PageContainer>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <FaChevronLeft /> Back
        </BackButton>
        <PageTitle>{product.name}</PageTitle>
      </Header>

      <ProductContainer>
        <ProductGallery>
          <MainImage>
            <img
              src={
                product.images && product.images.length > 0
                  ? product.images[selectedImage]
                  : product.imageCover
              }
              alt={product.name}
            />
          </MainImage>

          {product.images && product.images.length > 1 && (
            <Thumbnails>
              {product.images.map((img, index) => (
                <Thumbnail
                  key={index}
                  $active={index === selectedImage}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                  />
                </Thumbnail>
              ))}
            </Thumbnails>
          )}
        </ProductGallery>

        <ProductInfo>
          <ProductHeader>
            <ProductName>{product.name}</ProductName>
            <ProductMeta>
              <Rating>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} $filled={i < Math.floor(product.rating)}>
                    <FaStar />
                  </Star>
                ))}
                <RatingValue>({product.rating})</RatingValue>
              </Rating>
              <SKU>SKU: {displaySku || "N/A"}</SKU>
            </ProductMeta>
          </ProductHeader>

          <Price>GH₵{displayPrice.toFixed(2)}</Price>

          {/* Attribute-based variant selection */}

          {Object.keys(attributeOptions).length > 0 && (
            <AttributeSelector>
              {Object.entries(attributeOptions).map(([attribute, options]) => (
                <AttributeGroup key={attribute}>
                  <AttributeLabel>
                    {attribute.charAt(0).toUpperCase() + attribute.slice(1)}:
                  </AttributeLabel>
                  <AttributeOptions>
                    {Array.from(options).map((value) => {
                      const isColor = attribute.toLowerCase().includes("color");
                      const showAsColor = isColor && isColorValue(value);

                      return (
                        <RadioButton
                          key={`${attribute}-${value}`}
                          $active={selectedAttributes[attribute] === value}
                          $disabled={variants.some(
                            (v) =>
                              Object.entries(selectedAttributes)
                                .filter(([k]) => k !== attribute)
                                .every(([k, vVal]) => v[k] === vVal) &&
                              v[attribute] === value &&
                              v.stock <= 0
                          )}
                          $isColor={showAsColor}
                          $colorValue={showAsColor ? value : null}
                          onClick={() =>
                            handleAttributeChange(attribute, value)
                          }
                        >
                          {showAsColor ? (
                            <ColorSwatch $color={value}>
                              {selectedAttributes[attribute] === value && (
                                <Checkmark>
                                  <FaCheck />
                                </Checkmark>
                              )}
                            </ColorSwatch>
                          ) : (
                            <RadioLabel>
                              {value}
                              {selectedAttributes[attribute] === value && (
                                <RadioCheckmark>
                                  <FaCheck />
                                </RadioCheckmark>
                              )}
                            </RadioLabel>
                          )}
                        </RadioButton>
                      );
                    })}
                  </AttributeOptions>
                </AttributeGroup>
              ))}
            </AttributeSelector>
          )}

          <ProductDescription>
            <h3>Description</h3>
            <p>{product.description || "No description available"}</p>
          </ProductDescription>

          <Actions>
            <Quantity>
              <QtyButton onClick={decrementQuantity} disabled={quantity <= 1}>
                -
              </QtyButton>
              <QtyInput
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Math.max(
                      1,
                      Math.min(parseInt(e.target.value) || 1, displayStock)
                    )
                  )
                }
                min="1"
                max={displayStock}
              />
              <QtyButton
                onClick={incrementQuantity}
                disabled={quantity >= displayStock}
              >
                +
              </QtyButton>
            </Quantity>
            <AddToCartButton
              onClick={handleAddToCart}
              disabled={displayStock <= 0 || !selectedVariant}
            >
              <FaShoppingCart />
              {displayStock > 0 ? "Add to Cart" : "Out of Stock"}
            </AddToCartButton>
            <WishlistButton>
              <FaHeart />
            </WishlistButton>
          </Actions>

          <ProductDetails>
            <DetailItem>
              <DetailLabel>Category:</DetailLabel>
              <DetailValue>{product.category?.name || "N/A"}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Brand:</DetailLabel>
              <DetailValue>{product.brand || "N/A"}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Stock:</DetailLabel>
              <DetailValue>
                {displayStock > 0
                  ? `In Stock (${displayStock})`
                  : "Out of Stock"}
              </DetailValue>
            </DetailItem>
          </ProductDetails>

          <SellerInfo>
            <h3>Sold by</h3>
            <Seller>
              <SellerImage>
                <img
                  src={product.seller?.logo || "https://via.placeholder.com/50"}
                  alt={product.seller?.name}
                />
              </SellerImage>
              <SellerName>
                {product.seller?.name || "Unknown Seller"}
              </SellerName>
            </Seller>
          </SellerInfo>
        </ProductInfo>
      </ProductContainer>
    </PageContainer>
  );
};
// Styled Components
const PageContainer = styled.div`
  padding: 20px 5%;
  background-color: #f8f9fc;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  gap: 20px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  background: white;
  border: 2px solid #eaecf4;
  color: #4e73df;
  font-size: 16px;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 8px;
  transition: all 0.3s;

  &:hover {
    background: rgba(78, 115, 223, 0.1);
    border-color: #4e73df;
  }

  svg {
    margin-right: 8px;
  }
`;

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #2e3a59;
`;

const ProductContainer = styled.div`
  display: flex;
  gap: 40px;
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProductGallery = styled.div`
  flex: 1;
`;

const MainImage = styled.div`
  height: 500px;
  background: #f8f9fc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  overflow: hidden;

  img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const Thumbnails = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  background: #f8f9fc;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  border: 2px solid ${(props) => (props.$active ? "#4e73df" : "transparent")};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    border-color: #4e73df;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductHeader = styled.div`
  margin-bottom: 20px;
`;

const ProductName = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #2e3a59;
`;

const ProductMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled.span`
  color: ${(props) => (props.$filled ? "#ffc107" : "#e0e0e0")};
  margin-right: 3px;
  display: flex;
  align-items: center;
`;

const RatingValue = styled.span`
  font-size: 14px;
  color: #858796;
  margin-left: 8px;
`;

const SKU = styled.span`
  font-size: 14px;
  color: #858796;
`;

const Price = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #4e73df;
  margin-bottom: 25px;
`;

const ProductDescription = styled.div`
  margin-bottom: 30px;

  h3 {
    font-size: 20px;
    margin-bottom: 15px;
    color: #2e3a59;
  }

  p {
    line-height: 1.8;
    color: #4d4d4d;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #eaecf4;
  border-radius: 5px;
  overflow: hidden;
`;

const QtyInput = styled.input`
  width: 50px;
  height: 40px;
  border: none;
  text-align: center;
  font-size: 16px;
  border-left: 1px solid #eaecf4;
  border-right: 1px solid #eaecf4;

  &:focus {
    outline: none;
  }
`;

const WishlistButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #f8f9fc;
  border: 1px solid #eaecf4;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #ff6b6b;
    color: white;
    border-color: #ff6b6b;
  }

  svg {
    font-size: 20px;
  }
`;

const ProductDetails = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fc;
  border-radius: 10px;
`;

const DetailItem = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const DetailLabel = styled.div`
  font-weight: 600;
  width: 100px;
  color: #2e3a59;
`;

const DetailValue = styled.div`
  flex: 1;
  color: #4d4d4d;
`;

const SellerInfo = styled.div`
  padding: 20px;
  background: #f8f9fc;
  border-radius: 10px;

  h3 {
    margin-bottom: 15px;
    color: #2e3a59;
    font-size: 18px;
  }
`;

const Seller = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SellerImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SellerName = styled.div`
  font-weight: 600;
  color: #2e3a59;
`;

const Loading = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #4e73df;
`;

const Error = styled.div`
  text-align: center;
  padding: 40px;
  color: #e74a3b;
  font-weight: bold;
`;

const AttributeSelector = styled.div`
  margin-bottom: 25px;
`;

const AttributeGroup = styled.div`
  margin-bottom: 15px;
`;

const AttributeLabel = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
  color: #2e3a59;
`;

const AttributeOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
// const RadioButton = styled.button`
//   min-height: 40px;
//   min-width: 40px;
//   border-radius: 100%;
//   background-color: red;
// `;
// const AttributeButton = styled.button`
//   padding: 8px 16px;
//   border: 2px solid
//     ${(props) =>
//       props.$active ? "#4e73df" : props.$disabled ? "#e0e0e0" : "#eaecf4"};
//   background: ${(props) =>
//     props.$active
//       ? "rgba(78, 115, 223, 0.1)"
//       : props.$disabled
//       ? "#f9f9f9"
//       : "white"};
//   color: ${(props) =>
//     props.$disabled ? "#b0b0b0" : props.$active ? "#4e73df" : "#2e3a59"};
//   border-radius: 8px;
//   cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
//   transition: all 0.2s;
//   position: relative;
//   min-height: 40px;
//   min-width: 40px;
//   text-align: center;

//   &:hover:not(:disabled) {
//     border-color: #4e73df;
//     background: rgba(78, 115, 223, 0.1);
//   }

// Style for color swatches
//   ${(props) =>
//     props.$isColor &&
//     css`
//       padding: 0;
//       overflow: hidden;
//       min-width: 80px;
//       height: 40px;
//     `}
// `;

// const ColorSwatch = styled.div`
/* width: 100%;
  height: 100%; */
/* background-color: ${(props) => props.$color};
  display: flex;
  align-items: center;
  justify-content: center; */
/* position: relative; */
// `;

// const ColorName = styled.span`;
//   /* background-color: rgba(255, 255, 255, 0.7); */
//   /* padding: 2px 5px;
//   border-radius: 4px;
//   font-size: 12px;
//   color: #000; */
//   /* text-shadow: 0 0 2px rgba(255, 255, 255, 0.8); */
// `;

// Update existing styled components to include disabled states
const QtyButton = styled.button`
  width: 40px;
  height: 40px;
  /* background: #f8f9fc; */
  border: none;
  font-size: 18px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  color: ${(props) => (props.disabled ? "#b0b0b0" : "inherit")};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: #eaecf4;
  }
`;

const AddToCartButton = styled.button`
  flex: 1;
  padding: 12px;
  background: ${(props) => (props.disabled ? "#b0b0b0" : "#4e73df")};
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover:not(:disabled) {
    background: ${(props) => (props.disabled ? "#b0b0b0" : "#2e59d9")};
  }
`;

// New styled components for radio buttons
const RadioButton = styled.button`
  position: relative;
  height: 40px;
  min-width: 40px;
  border: 2px solid
    ${(props) =>
      props.$active ? "#4e73df" : props.$disabled ? "#e0e0e0" : "#eaecf4"};
  background: ${(props) =>
    props.$active
      ? props.$isColor
        ? "transparent"
        : "rgba(78, 115, 223, 0.1)"
      : props.$disabled
      ? "#f9f9f9"
      : "white"};
  border-radius: 50%;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: all 0.2s;
  overflow: hidden;

  &:hover:not(:disabled) {
    border-color: ${(props) => (props.$active ? "#4e73df" : "#aab7cf")};
  }

  // For non-color radio buttons
  ${(props) =>
    !props.$isColor &&
    css`
      width: auto;
      min-width: 60px;
      height: 40px;
      border-radius: 20px;
      padding: 0 15px;
    `}
`;

const ColorSwatch = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Checkmark = styled.span`
  color: white;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RadioLabel = styled.span`
  font-size: 14px;
  color: ${(props) => (props.$disabled ? "#b0b0b0" : "#2e3a59")};
  position: relative;
  padding-right: 20px;
`;

const RadioCheckmark = styled.span`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #4e73df;
  font-size: 12px;
  background: rgba(78, 115, 223, 0.1);
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default ProductDetailPage;
