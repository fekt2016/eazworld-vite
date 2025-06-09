// src/App.js
import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  FaChevronLeft,
  FaPrint,
  FaDownload,
  FaEllipsisV,
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaCreditCard,
  FaUser,
  FaMapMarkerAlt,
  FaHistory,
  FaBell,
  FaShoppingBag,
  FaTag,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaClipboardList,
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaExclamationTriangle,
} from "react-icons/fa";

// Global styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  body {
    background-color: #f8fafc;
    color: #333;
  }

  #root {
    min-height: 100vh;
    padding: 20px;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  }
`;

// Theme variables
const theme = {
  primary: "#4361ee",
  primaryLight: "#eef2ff",
  secondary: "#3f37c9",
  success: "#06d6a0",
  warning: "#ffd166",
  danger: "#ef476f",
  dark: "#1e293b",
  light: "#f8fafc",
  border: "#e2e8f0",
  cardShadow: "0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)",
  text: "#334155",
  textLight: "#64748b",
};

// Main container
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

// Header styles
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: white;
  border-bottom: 1px solid ${theme.border};
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${theme.primaryLight};
  color: ${theme.primary};
  border: none;
  border-radius: 8px;
  padding: 8px 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${theme.primary};
    color: white;
  }
`;

const OrderTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${theme.dark};

  span {
    color: ${theme.textLight};
    font-weight: 500;
  }
`;

const OrderStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 20px;
  background: ${(props) =>
    props.status === "completed"
      ? "rgba(6, 214, 160, 0.1)"
      : props.status === "processing"
      ? "rgba(255, 209, 102, 0.1)"
      : props.status === "shipped"
      ? "rgba(67, 97, 238, 0.1)"
      : props.status === "cancelled"
      ? "rgba(239, 71, 111, 0.1)"
      : "rgba(101, 119, 134, 0.1)"};
  color: ${(props) =>
    props.status === "completed"
      ? "#06d6a0"
      : props.status === "processing"
      ? "#ffd166"
      : props.status === "shipped"
      ? "#4361ee"
      : props.status === "cancelled"
      ? "#ef476f"
      : "#657786"};
  font-size: 14px;
  font-weight: 600;
  margin-left: 15px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const IconButton = styled.button`
  background: ${theme.light};
  border: 1px solid ${theme.border};
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${theme.text};
  transition: all 0.2s;

  &:hover {
    background: ${theme.primaryLight};
    color: ${theme.primary};
    border-color: ${theme.primary};
  }
`;

// Main content
const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 25px;
  padding: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

// Order details section
const OrderSection = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: ${theme.cardShadow};
  padding: 25px;
  margin-bottom: 25px;
  position: relative;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${theme.border};
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  color: ${theme.dark};
`;

const EditButton = styled.button`
  background: ${theme.primaryLight};
  color: ${theme.primary};
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;

  &:hover {
    background: ${theme.primary};
    color: white;
  }
`;

const SectionContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
`;

const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoLabel = styled.div`
  font-size: 14px;
  color: ${theme.textLight};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.text};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActionLink = styled.a`
  color: ${theme.primary};
  text-decoration: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  margin-top: 3px;

  &:hover {
    text-decoration: underline;
  }
`;

// Items table
const ItemsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px 15px;
  background: ${theme.primaryLight};
  color: ${theme.primary};
  font-weight: 600;
  border-bottom: 2px solid ${theme.primary};
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8fafc;
  }

  &:hover {
    background-color: ${theme.primaryLight};
  }
`;

const TableCell = styled.td`
  padding: 15px;
  border-bottom: 1px solid ${theme.border};
  color: ${theme.text};

  &:first-child {
    display: flex;
    align-items: center;
    gap: 15px;
  }
`;

const ProductImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background: linear-gradient(45deg, #4361ee, #3a0ca3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  flex-shrink: 0;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.div`
  font-weight: 600;
  margin-bottom: 3px;
`;

const ProductSku = styled.div`
  font-size: 13px;
  color: ${theme.textLight};
`;

// Order summary
const OrderSummary = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: ${theme.cardShadow};
  padding: 25px;
  position: sticky;
  top: 20px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid ${theme.border};

  &:last-child {
    border-bottom: none;
  }
`;

const SummaryLabel = styled.div`
  color: ${theme.textLight};
`;

const SummaryValue = styled.div`
  font-weight: 600;
  color: ${theme.text};
`;

const TotalRow = styled(SummaryItem)`
  font-size: 18px;
  font-weight: 700;
  color: ${theme.dark};
  padding: 15px 0;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 10px;
  background: ${theme.primary};
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s;

  &:hover {
    background: ${theme.secondary};
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
  }
`;

const StatusButton = styled(ActionButton)`
  background: ${(props) =>
    props.status === "completed"
      ? theme.success
      : props.status === "processing"
      ? theme.warning
      : props.status === "shipped"
      ? theme.primary
      : props.status === "cancelled"
      ? theme.danger
      : "#94a3b8"};
  margin-top: 10px;
`;

// Timeline
const Timeline = styled.div`
  position: relative;
  padding: 20px 0;
  margin-top: 15px;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 16px;
    width: 2px;
    background: ${theme.border};
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-left: 40px;
  margin-bottom: 25px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: 8px;
  top: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${(props) => (props.active ? theme.primary : theme.light)};
  border: 2px solid ${(props) => (props.active ? theme.primary : theme.border)};
  z-index: 1;
`;

const TimelineContent = styled.div`
  background: ${(props) => (props.active ? theme.primaryLight : "transparent")};
  border-radius: 10px;
  padding: 15px;
  border: ${(props) =>
    props.active ? `1px solid ${theme.primary}` : "1px solid transparent"};
`;

const TimelineTitle = styled.div`
  font-weight: 600;
  color: ${theme.text};
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TimelineDate = styled.div`
  font-size: 13px;
  color: ${theme.textLight};
  margin-bottom: 5px;
`;

const TimelineText = styled.div`
  font-size: 14px;
  color: ${theme.text};
`;

// Customer contact bar
const ContactBar = styled.div`
  display: flex;
  gap: 10px;
  padding: 15px;
  background: ${theme.primaryLight};
  border-radius: 10px;
  margin-top: 15px;
`;

const ContactButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: white;
  color: ${theme.primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${theme.primary};
    color: white;
  }
`;

// Admin Order Details Component
function AdminOrderDetails() {
  const [orderStatus, setOrderStatus] = useState("shipped");
  const [showEdit, setShowEdit] = useState(false);

  const order = {
    id: "ORD-7894",
    date: "Oct 12, 2023 14:28",
    customer: "John Anderson",
    email: "john.anderson@example.com",
    phone: "+1 (555) 123-4567",
    status: orderStatus,
    paymentMethod: "Credit Card (Visa)",
    paymentStatus: "Paid",
    shippingMethod: "Express Delivery",
    trackingNumber: "SH-789456123",
    items: [
      {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        sku: "SKU-789456",
        price: 89.99,
        quantity: 1,
        total: 89.99,
        image: "HP",
      },
      {
        id: 2,
        name: "Smartphone Case",
        sku: "SKU-123456",
        price: 24.99,
        quantity: 2,
        total: 49.98,
        image: "SC",
      },
      {
        id: 3,
        name: "USB-C Charging Cable",
        sku: "SKU-456123",
        price: 15.99,
        quantity: 1,
        total: 15.99,
        image: "CC",
      },
    ],
    subtotal: 155.96,
    shipping: 12.99,
    tax: 14.25,
    discount: 20.0,
    total: 163.2,
    shippingAddress:
      "123 Main Street, Apt 4B, San Francisco, CA 94110, United States",
    billingAddress: "Same as shipping address",
    notes: "Customer requested gift wrapping for all items",
    timeline: [
      {
        id: 1,
        title: "Order Placed",
        date: "Oct 12, 2023 14:30",
        text: "Order was placed by customer",
        active: true,
      },
      {
        id: 2,
        title: "Payment Confirmed",
        date: "Oct 12, 2023 14:35",
        text: "Payment processed successfully",
        active: true,
      },
      {
        id: 3,
        title: "Order Processed",
        date: "Oct 12, 2023 15:20",
        text: "Items picked and packed",
        active: true,
      },
      {
        id: 4,
        title: "Shipped",
        date: "Oct 12, 2023 16:45",
        text: `Shipped via Express Delivery (${"SH-789456123"})`,
        active: orderStatus === "shipped" || orderStatus === "completed",
      },
      {
        id: 5,
        title: "Delivered",
        date: "Oct 14, 2023 10:15",
        text: "Package delivered to customer",
        active: orderStatus === "completed",
      },
    ],
  };

  const updateStatus = (newStatus) => {
    if (newStatus === "cancelled") {
      if (
        window.confirm(
          "Are you sure you want to cancel this order? This action cannot be undone."
        )
      ) {
        setOrderStatus(newStatus);
      }
    } else {
      setOrderStatus(newStatus);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmailCustomer = () => {
    alert(`Email sent to ${order.email}`);
  };

  const handleCallCustomer = () => {
    alert(`Calling ${order.phone}`);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <HeaderLeft>
            <BackButton>
              <FaChevronLeft /> Back to Orders
            </BackButton>
            <OrderTitle>
              Order <span>#{order.id}</span>
            </OrderTitle>
            <OrderStatus status={order.status}>
              {order.status === "completed" && <FaCheckCircle />}
              {order.status === "processing" && <FaBox />}
              {order.status === "shipped" && <FaTruck />}
              {order.status === "cancelled" && <FaExclamationTriangle />}
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </OrderStatus>
          </HeaderLeft>
          <HeaderRight>
            <IconButton onClick={handlePrint}>
              <FaPrint />
            </IconButton>
            <IconButton>
              <FaDownload />
            </IconButton>
            <IconButton>
              <FaEllipsisV />
            </IconButton>
          </HeaderRight>
        </Header>

        <MainContent>
          <div>
            <OrderSection>
              <SectionHeader>
                <SectionTitle>
                  <FaShoppingBag /> Order Items
                </SectionTitle>
                <EditButton onClick={() => setShowEdit(!showEdit)}>
                  <FaEdit /> Edit
                </EditButton>
              </SectionHeader>

              <ItemsTable>
                <thead>
                  <tr>
                    <TableHeader>Product</TableHeader>
                    <TableHeader>SKU</TableHeader>
                    <TableHeader>Price</TableHeader>
                    <TableHeader>Qty</TableHeader>
                    <TableHeader>Total</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <ProductImage>{item.image}</ProductImage>
                        <ProductDetails>
                          <ProductName>{item.name}</ProductName>
                          <ProductSku>{item.sku}</ProductSku>
                        </ProductDetails>
                      </TableCell>
                      <TableCell>{item.sku}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.total.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </ItemsTable>
            </OrderSection>

            <OrderSection>
              <SectionHeader>
                <SectionTitle>
                  <FaHistory /> Order Timeline
                </SectionTitle>
              </SectionHeader>

              <Timeline>
                {order.timeline.map((event) => (
                  <TimelineItem key={event.id}>
                    <TimelineDot active={event.active} />
                    <TimelineContent active={event.active}>
                      <TimelineTitle>
                        {event.title}
                        {event.active && <FaBell color={theme.primary} />}
                      </TimelineTitle>
                      <TimelineDate>{event.date}</TimelineDate>
                      <TimelineText>{event.text}</TimelineText>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </OrderSection>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "25px",
                "@media (max-width: 600px)": {
                  gridTemplateColumns: "1fr",
                },
              }}
            >
              <OrderSection>
                <SectionHeader>
                  <SectionTitle>
                    <FaUser /> Customer Information
                  </SectionTitle>
                </SectionHeader>

                <SectionContent>
                  <InfoCard>
                    <InfoLabel>
                      <FaUser size={14} /> Customer
                    </InfoLabel>
                    <InfoValue>{order.customer}</InfoValue>
                  </InfoCard>

                  <InfoCard>
                    <InfoLabel>
                      <FaTag size={14} /> Contact
                    </InfoLabel>
                    <InfoValue>{order.email}</InfoValue>
                    <InfoValue>{order.phone}</InfoValue>
                    <ActionLink>
                      <FaEdit size={12} /> Edit contact info
                    </ActionLink>
                  </InfoCard>

                  <InfoCard>
                    <InfoLabel>
                      <FaMapMarkerAlt size={14} /> Shipping Address
                    </InfoLabel>
                    <InfoValue>{order.shippingAddress}</InfoValue>
                    <ActionLink>
                      <FaEdit size={12} /> Edit address
                    </ActionLink>
                  </InfoCard>

                  <InfoCard>
                    <InfoLabel>
                      <FaMapMarkerAlt size={14} /> Billing Address
                    </InfoLabel>
                    <InfoValue>{order.billingAddress}</InfoValue>
                    <ActionLink>
                      <FaEdit size={12} /> Edit address
                    </ActionLink>
                  </InfoCard>
                </SectionContent>

                <ContactBar>
                  <ContactButton onClick={handleEmailCustomer}>
                    <FaEnvelope /> Email Customer
                  </ContactButton>
                  <ContactButton onClick={handleCallCustomer}>
                    <FaPhone /> Call Customer
                  </ContactButton>
                </ContactBar>
              </OrderSection>

              <OrderSection>
                <SectionHeader>
                  <SectionTitle>
                    <FaClipboardList /> Order Information
                  </SectionTitle>
                </SectionHeader>

                <SectionContent>
                  <InfoCard>
                    <InfoLabel>
                      <FaCalendarAlt size={14} /> Order Date
                    </InfoLabel>
                    <InfoValue>{order.date}</InfoValue>
                  </InfoCard>

                  <InfoCard>
                    <InfoLabel>
                      <FaTruck size={14} /> Shipping Method
                    </InfoLabel>
                    <InfoValue>{order.shippingMethod}</InfoValue>
                    <ActionLink>
                      <FaEdit size={12} /> Change method
                    </ActionLink>
                  </InfoCard>

                  <InfoCard>
                    <InfoLabel>
                      <FaCreditCard size={14} /> Payment Method
                    </InfoLabel>
                    <InfoValue>{order.paymentMethod}</InfoValue>
                  </InfoCard>

                  <InfoCard>
                    <InfoLabel>
                      <FaMoneyBillWave size={14} /> Payment Status
                    </InfoLabel>
                    <InfoValue
                      style={{
                        color:
                          order.paymentStatus === "Paid"
                            ? theme.success
                            : theme.danger,
                      }}
                    >
                      {order.paymentStatus}
                    </InfoValue>
                  </InfoCard>

                  <InfoCard>
                    <InfoLabel>
                      <FaTruck size={14} /> Tracking Number
                    </InfoLabel>
                    <InfoValue>{order.trackingNumber}</InfoValue>
                    <ActionLink>
                      <FaEdit size={12} /> Update tracking
                    </ActionLink>
                  </InfoCard>

                  <InfoCard>
                    <InfoLabel>
                      <FaBell size={14} /> Order Notes
                    </InfoLabel>
                    <InfoValue>{order.notes}</InfoValue>
                    <ActionLink>
                      <FaEdit size={12} /> Add note
                    </ActionLink>
                  </InfoCard>
                </SectionContent>
              </OrderSection>
            </div>
          </div>

          <div>
            <OrderSummary>
              <SectionHeader>
                <SectionTitle>
                  <FaClipboardList /> Order Summary
                </SectionTitle>
              </SectionHeader>

              <SummaryItem>
                <SummaryLabel>Subtotal</SummaryLabel>
                <SummaryValue>${order.subtotal.toFixed(2)}</SummaryValue>
              </SummaryItem>

              <SummaryItem>
                <SummaryLabel>Shipping</SummaryLabel>
                <SummaryValue>${order.shipping.toFixed(2)}</SummaryValue>
              </SummaryItem>

              <SummaryItem>
                <SummaryLabel>Tax</SummaryLabel>
                <SummaryValue>${order.tax.toFixed(2)}</SummaryValue>
              </SummaryItem>

              <SummaryItem>
                <SummaryLabel>Discount</SummaryLabel>
                <SummaryValue style={{ color: theme.success }}>
                  -${order.discount.toFixed(2)}
                </SummaryValue>
              </SummaryItem>

              <TotalRow>
                <SummaryLabel>Total</SummaryLabel>
                <SummaryValue>${order.total.toFixed(2)}</SummaryValue>
              </TotalRow>

              <StatusButton status={order.status}>
                {order.status === "completed" && <FaCheckCircle />}
                {order.status === "processing" && <FaBox />}
                {order.status === "shipped" && <FaTruck />}
                {order.status === "cancelled" && <FaExclamationTriangle />}
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </StatusButton>

              <ActionButton onClick={handlePrint}>
                <FaPrint /> Print Invoice
              </ActionButton>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                <button
                  onClick={() => updateStatus("processing")}
                  style={{
                    padding: "10px",
                    border: "none",
                    borderRadius: "8px",
                    background:
                      order.status === "processing"
                        ? theme.warning
                        : theme.light,
                    color: order.status === "processing" ? "white" : theme.text,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    fontWeight: "600",
                  }}
                >
                  <FaBox /> Processing
                </button>

                <button
                  onClick={() => updateStatus("shipped")}
                  style={{
                    padding: "10px",
                    border: "none",
                    borderRadius: "8px",
                    background:
                      order.status === "shipped" ? theme.primary : theme.light,
                    color: order.status === "shipped" ? "white" : theme.text,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    fontWeight: "600",
                  }}
                >
                  <FaTruck /> Shipped
                </button>

                <button
                  onClick={() => updateStatus("completed")}
                  style={{
                    padding: "10px",
                    border: "none",
                    borderRadius: "8px",
                    background:
                      order.status === "completed"
                        ? theme.success
                        : theme.light,
                    color: order.status === "completed" ? "white" : theme.text,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    fontWeight: "600",
                  }}
                >
                  <FaCheckCircle /> Completed
                </button>

                <button
                  onClick={() => updateStatus("cancelled")}
                  style={{
                    padding: "10px",
                    border: "none",
                    borderRadius: "8px",
                    background:
                      order.status === "cancelled" ? theme.danger : theme.light,
                    color: order.status === "cancelled" ? "white" : theme.text,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    fontWeight: "600",
                  }}
                >
                  <FaExclamationTriangle /> Cancel
                </button>
              </div>
            </OrderSummary>
          </div>
        </MainContent>
      </Container>
    </>
  );
}

export default AdminOrderDetails;
