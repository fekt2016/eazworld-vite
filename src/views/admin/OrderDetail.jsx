// src/components/OrderDetail.js
import { useState } from "react";
import styled from "styled-components";
import {
  FaPrint,
  FaPen,
  FaUser,
  FaTshirt,
  FaShoePrints,
  FaMugHot,
  FaCheck,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaCreditCard,
} from "react-icons/fa";

const OrderDetail = () => {
  const [status, setStatus] = useState("shipped");
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [customerNote, setCustomerNote] = useState(
    "Please leave the package at the front door if I'm not home."
  );

  // Mock order data
  const order = {
    id: "ORD-20230615-001",
    date: "June 15, 2023",
    time: "10:30 AM",
    customer: {
      name: "Michael Anderson",
      email: "michael.anderson@example.com",
      phone: "+1 (555) 123-4567",
    },
    shipping: {
      name: "Michael Anderson",
      street: "123 Main Street",
      apt: "Apt 4B",
      city: "New York, NY 10001",
      country: "United States",
    },
    billing: {
      name: "Michael Anderson",
      street: "123 Main Street",
      apt: "Apt 4B",
      city: "New York, NY 10001",
      country: "United States",
    },
    payment: {
      method: "Visa ending in 1234",
      date: "June 15, 2023",
    },
    items: [
      {
        id: 1,
        name: "Premium Cotton T-Shirt",
        sku: "T-SHIRT-001",
        details: "Color: Navy Blue, Size: M",
        price: 29.99,
        quantity: 2,
        total: 59.98,
      },
      {
        id: 2,
        name: "Running Shoes",
        sku: "SHOES-045",
        details: "Color: Black/Red, Size: 10",
        price: 89.99,
        quantity: 1,
        total: 89.99,
      },
      {
        id: 3,
        name: "Stainless Steel Water Bottle",
        sku: "BOTTLE-112",
        details: "Color: Silver, 750ml",
        price: 24.99,
        quantity: 1,
        total: 24.99,
      },
    ],
    summary: {
      subtotal: 174.96,
      shipping: 9.99,
      tax: 14.0,
      discount: -15.0,
      total: 183.95,
    },
    timeline: [
      {
        id: 1,
        title: "Order Placed",
        description: "Order confirmed and payment processed",
        date: "June 15, 10:30 AM",
        completed: true,
      },
      {
        id: 2,
        title: "Processing",
        description: "Order is being prepared for shipment",
        date: "June 15, 11:45 AM",
        completed: true,
      },
      {
        id: 3,
        title: "Shipped",
        description:
          "Order shipped via USPS (Tracking #: 9400111899221345678912)",
        date: "June 16, 3:20 PM",
        completed: true,
      },
      {
        id: 4,
        title: "Out for Delivery",
        description: "Package is on the way to the customer",
        date: "Expected: June 18",
        completed: false,
      },
    ],
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const handleNoteEdit = () => {
    setIsEditingNote(!isEditingNote);
  };

  const handleNoteChange = (e) => {
    setCustomerNote(e.target.value);
  };

  const handleSaveNote = () => {
    setIsEditingNote(false);
  };

  return (
    <OrderDetailContainer>
      <PageHeader>
        <HeaderInfo>
          <PageTitle>Order #{order.id}</PageTitle>
          <OrderDate>
            <FaCalendarAlt /> {order.date} at {order.time}
          </OrderDate>
        </HeaderInfo>
        <HeaderActions>
          <ActionButton>
            <FaPrint /> Print
          </ActionButton>
          <PrimaryButton>
            <FaPen /> Edit Order
          </PrimaryButton>
        </HeaderActions>
      </PageHeader>

      <StatusCard>
        <StatusInfo>
          <StatusTitle>Order Status</StatusTitle>
          <StatusBadge status={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </StatusBadge>
          <DeliveryInfo>
            <FaClock /> Estimated delivery: June 18, 2023
          </DeliveryInfo>
        </StatusInfo>
        <StatusActions>
          <StatusButton onClick={() => handleStatusChange("cancelled")}>
            Cancel Order
          </StatusButton>
          <PrimaryButton onClick={() => handleStatusChange("delivered")}>
            Update Status
          </PrimaryButton>
        </StatusActions>
      </StatusCard>

      <InfoGrid>
        <CustomerCard>
          <CardTitle>Customer Information</CardTitle>
          <CustomerInfo>
            <CustomerAvatar>
              <FaUser />
            </CustomerAvatar>
            <CustomerDetails>
              <CustomerName>{order.customer.name}</CustomerName>
              <CustomerContact>{order.customer.email}</CustomerContact>
              <CustomerContact>{order.customer.phone}</CustomerContact>
            </CustomerDetails>
          </CustomerInfo>

          <CardTitle>Customer Notes</CardTitle>
          {isEditingNote ? (
            <NoteEditContainer>
              <NoteTextarea value={customerNote} onChange={handleNoteChange} />
              <SaveButton onClick={handleSaveNote}>Save</SaveButton>
            </NoteEditContainer>
          ) : (
            <NoteContainer>
              <NoteText>{customerNote}</NoteText>
              <EditButton onClick={handleNoteEdit}>Edit</EditButton>
            </NoteContainer>
          )}
        </CustomerCard>

        <ShippingBillingCard>
          <GridRow>
            <AddressSection>
              <CardTitle>
                <FaMapMarkerAlt /> Shipping Address
              </CardTitle>
              <AddressText>{order.shipping.name}</AddressText>
              <AddressText>{order.shipping.street}</AddressText>
              <AddressText>{order.shipping.apt}</AddressText>
              <AddressText>{order.shipping.city}</AddressText>
              <AddressText>{order.shipping.country}</AddressText>
            </AddressSection>

            <AddressSection>
              <CardTitle>
                <FaMapMarkerAlt /> Billing Address
              </CardTitle>
              <AddressText>{order.billing.name}</AddressText>
              <AddressText>{order.billing.street}</AddressText>
              <AddressText>{order.billing.apt}</AddressText>
              <AddressText>{order.billing.city}</AddressText>
              <AddressText>{order.billing.country}</AddressText>

              <PaymentSection>
                <CardTitle>
                  <FaCreditCard /> Payment Method
                </CardTitle>
                <PaymentMethod>{order.payment.method}</PaymentMethod>
                <PaymentDate>Paid on {order.payment.date}</PaymentDate>
              </PaymentSection>
            </AddressSection>
          </GridRow>
        </ShippingBillingCard>
      </InfoGrid>

      <OrderItemsCard>
        <CardTitle>Order Items</CardTitle>
        <ItemsList>
          {order.items.map((item) => (
            <ItemRow key={item.id}>
              <ItemImage>
                {item.name.includes("T-Shirt") && <FaTshirt />}
                {item.name.includes("Shoes") && <FaShoePrints />}
                {item.name.includes("Bottle") && <FaMugHot />}
              </ItemImage>
              <ItemDetails>
                <ItemName>{item.name}</ItemName>
                <ItemSku>SKU: {item.sku}</ItemSku>
                <ItemDetailsText>{item.details}</ItemDetailsText>
              </ItemDetails>
              <ItemPricing>
                <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
                <ItemQuantity>Qty: {item.quantity}</ItemQuantity>
                <ItemTotal>${item.total.toFixed(2)}</ItemTotal>
              </ItemPricing>
            </ItemRow>
          ))}
        </ItemsList>
      </OrderItemsCard>

      <SummaryGrid>
        <SummaryCard>
          <CardTitle>Order Summary</CardTitle>
          <SummaryRow>
            <SummaryLabel>Subtotal</SummaryLabel>
            <SummaryValue>${order.summary.subtotal.toFixed(2)}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Shipping</SummaryLabel>
            <SummaryValue>${order.summary.shipping.toFixed(2)}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Tax</SummaryLabel>
            <SummaryValue>${order.summary.tax.toFixed(2)}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Discount</SummaryLabel>
            <DiscountValue>
              -${Math.abs(order.summary.discount).toFixed(2)}
            </DiscountValue>
          </SummaryRow>
          <TotalRow>
            <TotalLabel>Total</TotalLabel>
            <TotalValue>${order.summary.total.toFixed(2)}</TotalValue>
          </TotalRow>
        </SummaryCard>

        <TimelineCard>
          <CardTitle>Order Timeline</CardTitle>
          <TimelineContainer>
            {order.timeline.map((event) => (
              <TimelineItem key={event.id}>
                <TimelineDot completed={event.completed}>
                  {event.completed ? <FaCheck /> : null}
                </TimelineDot>
                <TimelineContent>
                  <TimelineHeader>
                    <TimelineTitle>{event.title}</TimelineTitle>
                    <TimelineDate>
                      <FaCalendarAlt /> {event.date}
                    </TimelineDate>
                  </TimelineHeader>
                  <TimelineDescription>{event.description}</TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            ))}
          </TimelineContainer>
        </TimelineCard>
      </SummaryGrid>
    </OrderDetailContainer>
  );
};

// Styled Components
const OrderDetailContainer = styled.div`
  padding: 2rem;
  background-color: #f8fafc;
  max-width: 1400px;
  margin: 0 auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const PageHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
  background-color: #f8fafc;
`;

const HeaderInfo = styled.div`
  flex: 1;
  min-width: 300px;
`;

const PageTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const OrderDate = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 1rem;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  color: #334155;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;

  &:hover {
    background-color: #f8fafc;
    border-color: #94a3b8;
  }
`;

const PrimaryButton = styled(ActionButton)`
  background-color: #4f46e5;
  border-color: #4f46e5;
  color: white;

  &:hover {
    background-color: #4338ca;
    border-color: #4338ca;
  }
`;

const StatusCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatusInfo = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const StatusTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
`;

const StatusBadge = styled.span`
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  font-size: 0.9rem;
  font-weight: 600;

  background-color: ${(props) =>
    props.status === "processing"
      ? "#fef9c3"
      : props.status === "shipped"
      ? "#dbeafe"
      : props.status === "delivered"
      ? "#dcfce7"
      : props.status === "cancelled"
      ? "#fee2e2"
      : "#e0f2fe"};

  color: ${(props) =>
    props.status === "processing"
      ? "#ca8a04"
      : props.status === "shipped"
      ? "#2563eb"
      : props.status === "delivered"
      ? "#16a34a"
      : props.status === "cancelled"
      ? "#dc2626"
      : "#0ea5e9"};
`;

const DeliveryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.95rem;
`;

const StatusActions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const StatusButton = styled(ActionButton)`
  &:hover {
    background-color: #fee2e2;
    color: #dc2626;
    border-color: #fee2e2;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
`;

const CustomerCard = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const ShippingBillingCard = styled(Card)``;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CustomerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CustomerAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #e2e8f0;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
`;

const CustomerDetails = styled.div`
  margin-left: 1rem;
`;

const CustomerName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

const CustomerContact = styled.p`
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.4;
`;

const NoteContainer = styled.div`
  position: relative;
  background-color: #f8fafc;
  border-radius: 0.5rem;
  padding: 1rem;
  font-style: italic;
  color: #475569;
  border-left: 3px solid #cbd5e1;
`;

const NoteText = styled.p`
  margin: 0;
`;

const EditButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  color: #4f46e5;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const NoteEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const NoteTextarea = styled.textarea`
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #cbd5e1;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: #94a3b8;
    box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.2);
  }
`;

const SaveButton = styled.button`
  align-self: flex-end;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.6rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4338ca;
  }
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AddressSection = styled.div`
  &:first-child {
    border-right: 1px solid #e2e8f0;
    padding-right: 1.5rem;

    @media (max-width: 768px) {
      border-right: none;
      border-bottom: 1px solid #e2e8f0;
      padding-right: 0;
      padding-bottom: 1.5rem;
    }
  }
`;

const AddressText = styled.p`
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0.25rem 0;
`;

const PaymentSection = styled.div`
  margin-top: 1.5rem;
`;

const PaymentMethod = styled.div`
  color: #475569;
  font-weight: 500;
  margin-top: 0.5rem;
`;

const PaymentDate = styled.p`
  color: #64748b;
  font-size: 0.9rem;
  margin-top: 0.25rem;
`;

const OrderItemsCard = styled(Card)`
  margin-bottom: 1.5rem;
`;

const ItemsList = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
`;

const ItemRow = styled.div`
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f8fafc;
  }
`;

const ItemImage = styled.div`
  width: 64px;
  height: 64px;
  background-color: #f1f5f9;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 1.5rem;
`;

const ItemDetails = styled.div`
  flex: 1;
  margin-left: 1rem;
`;

const ItemName = styled.h4`
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

const ItemSku = styled.p`
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const ItemDetailsText = styled.p`
  color: #64748b;
  font-size: 0.9rem;
`;

const ItemPricing = styled.div`
  text-align: right;
  min-width: 120px;
`;

const ItemPrice = styled.p`
  color: #1e293b;
  margin: 0;
`;

const ItemQuantity = styled.p`
  color: #64748b;
  font-size: 0.9rem;
  margin: 0.25rem 0;
`;

const ItemTotal = styled.p`
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const SummaryCard = styled(Card)``;

const TimelineCard = styled(Card)``;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px dashed #e2e8f0;
`;

const SummaryLabel = styled.span`
  color: #64748b;
`;

const SummaryValue = styled.span`
  color: #1e293b;
  font-weight: 500;
`;

const DiscountValue = styled(SummaryValue)`
  color: #10b981;
`;

const TotalRow = styled(SummaryRow)`
  border-bottom: none;
  border-top: 1px solid #e2e8f0;
  margin-top: 0.5rem;
  padding-top: 1rem;
  padding-bottom: 0;
`;

const TotalLabel = styled(SummaryLabel)`
  font-weight: 600;
  font-size: 1.1rem;
  color: #1e293b;
`;

const TotalValue = styled(SummaryValue)`
  font-weight: 700;
  font-size: 1.25rem;
  color: #1e293b;
`;

const TimelineContainer = styled.div`
  position: relative;
  padding-left: 1.5rem;

  &:before {
    content: "";
    position: absolute;
    left: 7px;
    top: 0;
    height: 100%;
    width: 2px;
    background-color: #e2e8f0;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-bottom: 1.5rem;

  &:last-child {
    padding-bottom: 0;
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: -1.5rem;
  top: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  background-color: ${(props) => (props.completed ? "#4f46e5" : "#e2e8f0")};
  color: ${(props) => (props.completed ? "white" : "transparent")};

  svg {
    font-size: 0.75rem;
  }
`;

const TimelineContent = styled.div`
  background-color: white;
  border-radius: 0.5rem;
`;

const TimelineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const TimelineTitle = styled.h4`
  font-weight: 600;
  color: #1e293b;
`;

const TimelineDate = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.9rem;
`;

const TimelineDescription = styled.p`
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
`;

export default OrderDetail;
