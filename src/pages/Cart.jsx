// import { useState } from "react";
// import styled from "styled-components";
// import { Link } from "react-router-dom";
// import { FaTrash, FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";

// const CartPage = () => {
//   // Mock cart data - replace with your actual cart state
//   const [cartItems, setCartItems] = useState([
//     {
//       id: "1",
//       name: "Wireless Bluetooth Headphones",
//       price: 129.99,
//       image: "/images/headphones.jpg",
//       quantity: 2,
//       inStock: true,
//     },
//     {
//       id: "2",
//       name: "Smartphone Stand",
//       price: 24.99,
//       image: "/images/stand.jpg",
//       quantity: 1,
//       inStock: true,
//     },
//     {
//       id: "3",
//       name: "Mechanical Keyboard",
//       price: 89.99,
//       image: "/images/keyboard.jpg",
//       quantity: 1,
//       inStock: false,
//     },
//   ]);

//   // Calculate totals
//   const subtotal = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );
//   const shipping = subtotal > 0 ? 5.99 : 0;
//   const tax = subtotal * 0.08;
//   const total = subtotal + shipping + tax;

//   // Handle quantity changes
//   const handleQuantityChange = (id, change) => {
//     setCartItems(
//       cartItems.map((item) => {
//         if (item.id === id) {
//           const newQuantity = item.quantity + change;
//           return {
//             ...item,
//             quantity: newQuantity < 1 ? 1 : newQuantity,
//           };
//         }
//         return item;
//       })
//     );
//   };

//   // Remove item from cart
//   const removeItem = (id) => {
//     setCartItems(cartItems.filter((item) => item.id !== id));
//   };

//   // Empty cart
//   const emptyCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <PageContainer>
//       <MainContent>
//         <PageHeader>
//           <PageTitle>Your Shopping Cart</PageTitle>
//           <PageSubtitle>
//             {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your
//             cart
//           </PageSubtitle>
//         </PageHeader>

//         {cartItems.length === 0 ? (
//           <EmptyState>
//             <EmptyIcon>🛒</EmptyIcon>
//             <EmptyTitle>Your cart is empty</EmptyTitle>
//             <EmptyText>Add items to your cart to see them here</EmptyText>
//             <ShopButton to="/">Continue Shopping</ShopButton>
//           </EmptyState>
//         ) : (
//           <CartLayout>
//             <CartItems>
//               <CartTable>
//                 <TableHeader>
//                   <ProductHeader>Product</ProductHeader>
//                   <PriceHeader>Price</PriceHeader>
//                   <QuantityHeader>Quantity</QuantityHeader>
//                   <TotalHeader>Total</TotalHeader>
//                   <ActionHeader></ActionHeader>
//                 </TableHeader>

//                 <TableBody>
//                   {cartItems.map((item) => (
//                     <CartItem key={item.id}>
//                       <ProductCell>
//                         <ProductImage src={item.image} alt={item.name} />
//                         <ProductInfo>
//                           <ProductName>{item.name}</ProductName>
//                           {!item.inStock && (
//                             <StockWarning>Out of Stock</StockWarning>
//                           )}
//                         </ProductInfo>
//                       </ProductCell>
//                       <PriceCell>${item.price.toFixed(2)}</PriceCell>
//                       <QuantityCell>
//                         <QuantityControl>
//                           <QuantityButton
//                             onClick={() => handleQuantityChange(item.id, -1)}
//                             disabled={item.quantity <= 1}
//                           >
//                             <FaMinus size={12} />
//                           </QuantityButton>
//                           <QuantityValue>{item.quantity}</QuantityValue>
//                           <QuantityButton
//                             onClick={() => handleQuantityChange(item.id, 1)}
//                           >
//                             <FaPlus size={12} />
//                           </QuantityButton>
//                         </QuantityControl>
//                       </QuantityCell>
//                       <TotalCell>
//                         ${(item.price * item.quantity).toFixed(2)}
//                       </TotalCell>
//                       <ActionCell>
//                         <RemoveButton onClick={() => removeItem(item.id)}>
//                           <FaTrash size={16} />
//                         </RemoveButton>
//                       </ActionCell>
//                     </CartItem>
//                   ))}
//                 </TableBody>
//               </CartTable>

//               <CartActions>
//                 <ContinueShopping to="/">
//                   <FaArrowLeft /> Continue Shopping
//                 </ContinueShopping>
//                 <EmptyCartButton onClick={emptyCart}>
//                   <FaTrash /> Empty Cart
//                 </EmptyCartButton>
//               </CartActions>
//             </CartItems>

//             <CartSummary>
//               <SummaryCard>
//                 <SummaryTitle>Order Summary</SummaryTitle>
//                 <SummaryRow>
//                   <SummaryLabel>Subtotal</SummaryLabel>
//                   <SummaryValue>${subtotal.toFixed(2)}</SummaryValue>
//                 </SummaryRow>
//                 <SummaryRow>
//                   <SummaryLabel>Shipping</SummaryLabel>
//                   <SummaryValue>${shipping.toFixed(2)}</SummaryValue>
//                 </SummaryRow>
//                 <SummaryRow>
//                   <SummaryLabel>Tax (8%)</SummaryLabel>
//                   <SummaryValue>${tax.toFixed(2)}</SummaryValue>
//                 </SummaryRow>
//                 <SummaryDivider />
//                 <SummaryRow total>
//                   <SummaryLabel>Total</SummaryLabel>
//                   <SummaryValue>${total.toFixed(2)}</SummaryValue>
//                 </SummaryRow>
//                 <CheckoutButton to="/checkout">
//                   Proceed to Checkout
//                 </CheckoutButton>
//                 <DiscountNote>Free shipping on orders over $100</DiscountNote>
//               </SummaryCard>
//             </CartSummary>
//           </CartLayout>
//         )}
//       </MainContent>
//     </PageContainer>
//   );
// };

// // Styled Components
// const PageContainer = styled.div`
//   background-color: #f8f9fc;
//   min-height: 100vh;
//   font-family: "Poppins", sans-serif;
//   padding-bottom: 60px;
// `;

// const MainContent = styled.div`
//   max-width: 1200px;
//   margin: 40px auto;
//   padding: 0 20px;
// `;

// const PageHeader = styled.div`
//   margin-bottom: 40px;
// `;

// const PageTitle = styled.h1`
//   font-size: 32px;
//   font-weight: 700;
//   margin-bottom: 10px;
//   color: #2e3a59;

//   @media (max-width: 768px) {
//     font-size: 28px;
//   }
// `;

// const PageSubtitle = styled.p`
//   font-size: 18px;
//   color: #858796;
//   max-width: 600px;
//   margin: 0;

//   @media (max-width: 768px) {
//     font-size: 16px;
//   }
// `;

// const EmptyState = styled.div`
//   background: white;
//   border-radius: 15px;
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
//   padding: 60px 20px;
//   text-align: center;
//   max-width: 600px;
//   margin: 0 auto;
// `;

// const EmptyIcon = styled.div`
//   font-size: 60px;
//   margin-bottom: 20px;
// `;

// const EmptyTitle = styled.h2`
//   font-size: 24px;
//   margin-bottom: 10px;
//   color: #2e3a59;
// `;

// const EmptyText = styled.p`
//   color: #858796;
//   margin-bottom: 30px;
//   font-size: 16px;
// `;

// const ShopButton = styled(Link)`
//   display: inline-block;
//   background: #4e73df;
//   color: white;
//   padding: 12px 30px;
//   border-radius: 30px;
//   text-decoration: none;
//   font-weight: 600;
//   transition: background 0.3s;

//   &:hover {
//     background: #2e59d9;
//   }
// `;

// const CartLayout = styled.div`
//   display: flex;
//   gap: 30px;

//   @media (max-width: 992px) {
//     flex-direction: column;
//   }
// `;

// const CartItems = styled.div`
//   flex: 1;
// `;

// const CartTable = styled.div`
//   background: white;
//   border-radius: 15px;
//   overflow: hidden;
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
// `;

// const TableHeader = styled.div`
//   display: grid;
//   grid-template-columns: 2fr 1fr 1fr 1fr 50px;
//   padding: 20px;
//   font-weight: 600;
//   color: #2e3a59;
//   border-bottom: 1px solid #eaecf4;

//   @media (max-width: 768px) {
//     display: none;
//   }
// `;

// const TableBody = styled.div``;

// const CartItem = styled.div`
//   display: grid;
//   grid-template-columns: 2fr 1fr 1fr 1fr 50px;
//   padding: 20px;
//   align-items: center;
//   border-bottom: 1px solid #eaecf4;

//   &:last-child {
//     border-bottom: none;
//   }

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//     grid-template-areas:
//       "product product"
//       "price quantity"
//       "total action";
//     gap: 15px;
//   }
// `;

// const ProductCell = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 20px;

//   @media (max-width: 768px) {
//     grid-area: product;
//   }
// `;

// const PriceCell = styled.div`
//   font-weight: 500;

//   @media (max-width: 768px) {
//     grid-area: price;
//     font-weight: 600;
//   }
// `;

// const QuantityCell = styled.div`
//   @media (max-width: 768px) {
//     grid-area: quantity;
//   }
// `;

// const TotalCell = styled.div`
//   font-weight: 600;
//   color: #4e73df;

//   @media (max-width: 768px) {
//     grid-area: total;
//   }
// `;

// const ActionCell = styled.div`
//   display: flex;
//   justify-content: flex-end;

//   @media (max-width: 768px) {
//     grid-area: action;
//   }
// `;

// const ProductHeader = styled.div``;
// const PriceHeader = styled.div``;
// const QuantityHeader = styled.div``;
// const TotalHeader = styled.div``;
// const ActionHeader = styled.div``;

// const ProductImage = styled.img`
//   width: 80px;
//   height: 80px;
//   object-fit: contain;
//   border-radius: 8px;
//   background: #f8f9fc;
// `;

// const ProductInfo = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const ProductName = styled.div`
//   font-weight: 500;
//   margin-bottom: 5px;
// `;

// const StockWarning = styled.div`
//   color: #e74a3b;
//   font-size: 14px;
//   font-weight: 500;
// `;

// const QuantityControl = styled.div`
//   display: flex;
//   align-items: center;
//   border: 1px solid #eaecf4;
//   border-radius: 5px;
//   width: fit-content;
// `;

// const QuantityButton = styled.button`
//   width: 36px;
//   height: 36px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: transparent;
//   border: none;
//   cursor: pointer;
//   color: #4e73df;
//   font-weight: bold;
//   transition: background 0.3s;

//   &:hover {
//     background: #f8f9fc;
//   }

//   &:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }
// `;

// const QuantityValue = styled.div`
//   width: 40px;
//   text-align: center;
//   font-weight: 500;
// `;

// const RemoveButton = styled.button`
//   width: 36px;
//   height: 36px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: #ffecec;
//   color: #e74a3b;
//   border: none;
//   border-radius: 50%;
//   cursor: pointer;
//   transition: all 0.3s;

//   &:hover {
//     background: #e74a3b;
//     color: white;
//   }
// `;

// const CartActions = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-top: 30px;

//   @media (max-width: 576px) {
//     flex-direction: column;
//     gap: 15px;
//   }
// `;

// const ContinueShopping = styled(Link)`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   padding: 12px 20px;
//   background: #f8f9fc;
//   color: #4e73df;
//   border: 1px solid #4e73df;
//   border-radius: 30px;
//   text-decoration: none;
//   font-weight: 600;
//   transition: all 0.3s;

//   &:hover {
//     background: #4e73df;
//     color: white;
//   }
// `;

// const EmptyCartButton = styled.button`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   padding: 12px 20px;
//   background: #ffecec;
//   color: #e74a3b;
//   border: 1px solid #ffecec;
//   border-radius: 30px;
//   text-decoration: none;
//   font-weight: 600;
//   transition: all 0.3s;
//   cursor: pointer;

//   &:hover {
//     background: #e74a3b;
//     color: white;
//     border-color: #e74a3b;
//   }
// `;

// const CartSummary = styled.div`
//   width: 100%;
//   max-width: 350px;

//   @media (max-width: 992px) {
//     max-width: 100%;
//   }
// `;

// const SummaryCard = styled.div`
//   background: white;
//   border-radius: 15px;
//   padding: 25px;
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
// `;

// const SummaryTitle = styled.h3`
//   font-size: 20px;
//   font-weight: 600;
//   margin-bottom: 20px;
//   color: #2e3a59;
// `;

// const SummaryRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 15px;
//   font-weight: ${(props) => (props.total ? "600" : "400")};
//   font-size: ${(props) => (props.total ? "18px" : "16px")};
//   color: ${(props) => (props.total ? "#2e3a59" : "#858796")};
// `;

// const SummaryLabel = styled.div``;

// const SummaryValue = styled.div``;

// const SummaryDivider = styled.div`
//   height: 1px;
//   background: #eaecf4;
//   margin: 20px 0;
// `;

// const CheckoutButton = styled(Link)`
//   display: block;
//   text-align: center;
//   background: #4e73df;
//   color: white;
//   padding: 15px;
//   border-radius: 10px;
//   text-decoration: none;
//   font-weight: 600;
//   margin-top: 20px;
//   transition: background 0.3s;

//   &:hover {
//     background: #2e59d9;
//   }
// `;

// const DiscountNote = styled.div`
//   text-align: center;
//   margin-top: 15px;
//   font-size: 14px;
//   color: #4e73df;
//   font-weight: 500;
// `;

// export default CartPage;
