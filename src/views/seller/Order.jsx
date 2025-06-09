// src/pages/SellerOrdersPage.js
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  // FaChevronDown,
  FaEye,
  FaPrint,
  FaEllipsisV,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaMoneyBillWave,
} from "react-icons/fa";

// Styled Components
const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 20px;

  @media (min-width: 768px) {
    padding: 32px;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 16px 10px 40px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #9ca3af;
    background-color: #f9fafb;
  }
`;

const StatusFilter = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const StatusButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
  background-color: ${({ active }) => (active ? "#dbeafe" : "#f3f4f6")};
  color: ${({ active }) => (active ? "#1d4ed8" : "#4b5563")};

  &:hover {
    background-color: #e5e7eb;
  }
`;

const OrdersContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
`;

const OrderItem = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr auto;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #e5e7eb;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "id status"
      "customer date"
      "amount actions";
  }

  &:hover {
    background-color: #f9fafb;
  }
`;

const OrderId = styled.div`
  font-weight: 600;
  color: #1f2937;

  @media (max-width: 1024px) {
    grid-area: id;
  }
`;

const OrderCustomer = styled.div`
  color: #4b5563;

  @media (max-width: 1024px) {
    grid-area: customer;
  }
`;

const OrderDate = styled.div`
  color: #6b7280;
  font-size: 0.875rem;

  @media (max-width: 1024px) {
    grid-area: date;
  }
`;

const OrderAmount = styled.div`
  font-weight: 600;
  color: #1f2937;

  @media (max-width: 1024px) {
    grid-area: amount;
  }
`;

const OrderStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 20px;
  width: fit-content;

  ${({ status }) => {
    switch (status) {
      case "pending":
        return `background-color: #fffbeb; color: #b45309;`;
      case "processing":
        return `background-color: #dbeafe; color: #1d4ed8;`;
      case "shipped":
        return `background-color: #d1fae5; color: #065f46;`;
      case "delivered":
        return `background-color: #dcfce7; color: #166534;`;
      case "cancelled":
        return `background-color: #fee2e2; color: #b91c1c;`;
      default:
        return `background-color: #f3f4f6; color: #4b5563;`;
    }
  }}

  @media (max-width: 1024px) {
    grid-area: status;
  }
`;

const OrderActions = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 1024px) {
    grid-area: actions;
    justify-self: end;
  }
`;

const ActionButton = styled(Link)`
  padding: 8px;
  border-radius: 6px;
  background-color: white;
  border: 1px solid #e5e7eb;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f9fafb;
    border-color: #d1d5db;
  }
`;

const PrimaryButton = styled.button`
  padding: 10px 16px;
  background-color: #3b82f6;
  color: white;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.2s;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #2563eb;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-top: 1px solid #e5e7eb;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const PageInfo = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
`;

const PageControls = styled.div`
  display: flex;
  gap: 8px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  border-radius: 6px;
  background-color: ${({ active }) => (active ? "#3b82f6" : "white")};
  color: ${({ active }) => (active ? "white" : "#4b5563")};
  border: 1px solid ${({ active }) => (active ? "#3b82f6" : "#d1d5db")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ active }) => (active ? "#2563eb" : "#f9fafb")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Mock data
const mockOrders = [
  {
    id: "ORD-12345",
    customer: "John Smith",
    date: "2023-06-15",
    amount: 125.75,
    status: "processing",
    items: 3,
  },
  {
    id: "ORD-12346",
    customer: "Emma Johnson",
    date: "2023-06-14",
    amount: 89.99,
    status: "pending",
    items: 2,
  },
  {
    id: "ORD-12347",
    customer: "Michael Brown",
    date: "2023-06-13",
    amount: 245.5,
    status: "shipped",
    items: 5,
  },
  {
    id: "ORD-12348",
    customer: "Sarah Williams",
    date: "2023-06-12",
    amount: 56.25,
    status: "delivered",
    items: 1,
  },
  {
    id: "ORD-12349",
    customer: "David Miller",
    date: "2023-06-11",
    amount: 199.99,
    status: "cancelled",
    items: 4,
  },
  {
    id: "ORD-12350",
    customer: "Jennifer Davis",
    date: "2023-06-10",
    amount: 75.3,
    status: "delivered",
    items: 2,
  },
  {
    id: "ORD-12351",
    customer: "Robert Wilson",
    date: "2023-06-09",
    amount: 320.45,
    status: "processing",
    items: 6,
  },
  {
    id: "ORD-12352",
    customer: "Lisa Anderson",
    date: "2023-06-08",
    amount: 45.99,
    status: "shipped",
    items: 1,
  },
];

const statusOptions = [
  { id: "all", label: "All Orders" },
  { id: "pending", label: "Pending" },
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
];

const SellerOrdersPage = () => {
  const [orders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  const [activeStatus, setActiveStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === "") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(
        (order) =>
          order.id.toLowerCase().includes(term.toLowerCase()) ||
          order.customer.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
    setCurrentPage(1);
  };

  // Filter by status
  const filterByStatus = (status) => {
    setActiveStatus(status);
    if (status === "all") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => order.status === status);
      setFilteredOrders(filtered);
    }
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GHC",
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FaMoneyBillWave />;
      case "processing":
        return <FaEllipsisV />;
      case "shipped":
        return <FaTruck />;
      case "delivered":
        return <FaCheckCircle />;
      case "cancelled":
        return <FaTimesCircle />;
      default:
        return null;
    }
  };

  return (
    <DashboardContainer>
      <ContentContainer>
        <Title>
          <span>Order Management</span>
          <HeaderActions>
            <PrimaryButton>
              <FaPrint /> Print Orders
            </PrimaryButton>
            <Link to="/seller/settings">
              <PrimaryButton
                style={{ backgroundColor: "#f3f4f6", color: "#4b5563" }}
              >
                Settings
              </PrimaryButton>
            </Link>
          </HeaderActions>
        </Title>

        <ControlsContainer>
          <SearchContainer>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search orders by ID or customer..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </SearchContainer>

          <FilterButton>
            <FaFilter /> Filters
          </FilterButton>

          <StatusFilter>
            {statusOptions.map((status) => (
              <StatusButton
                key={status.id}
                active={activeStatus === status.id}
                onClick={() => filterByStatus(status.id)}
              >
                {status.label}
              </StatusButton>
            ))}
          </StatusFilter>
        </ControlsContainer>

        <OrdersContainer>
          {currentOrders.length > 0 ? (
            currentOrders.map((order) => (
              <OrderItem key={order.id}>
                <OrderId>
                  <div style={{ fontWeight: 700 }}>{order.id}</div>
                  <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    {order.items} item{order.items > 1 ? "s" : ""}
                  </div>
                </OrderId>

                <OrderCustomer>
                  <div style={{ fontWeight: 600 }}>{order.customer}</div>
                  <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    Customer
                  </div>
                </OrderCustomer>

                <OrderDate>
                  <div>{formatDate(order.date)}</div>
                  <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    Order Date
                  </div>
                </OrderDate>

                <OrderAmount>
                  <div>{formatCurrency(order.amount)}</div>
                  <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    Total
                  </div>
                </OrderAmount>

                <OrderStatus status={order.status}>
                  {getStatusIcon(order.status)}
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </OrderStatus>

                <OrderActions>
                  <ActionButton
                    title="View details"
                    to={`/seller/dashboard/order/details/${order.id}`}
                  >
                    <FaEye />
                  </ActionButton>
                  <ActionButton title="More options">
                    <FaEllipsisV />
                  </ActionButton>
                </OrderActions>
              </OrderItem>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <div
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  marginBottom: "16px",
                }}
              >
                No orders found
              </div>
              <div style={{ color: "#6b7280", marginBottom: "24px" }}>
                Try adjusting your search or filter criteria
              </div>
            </div>
          )}

          <Pagination>
            <PageInfo>
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, filteredOrders.length)} of{" "}
              {filteredOrders.length} orders
            </PageInfo>

            <PageControls>
              <PageButton onClick={prevPage} disabled={currentPage === 1}>
                Previous
              </PageButton>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <PageButton
                    key={number}
                    active={currentPage === number}
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </PageButton>
                )
              )}

              <PageButton
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </PageButton>
            </PageControls>
          </Pagination>
        </OrdersContainer>
      </ContentContainer>
    </DashboardContainer>
  );
};

export default SellerOrdersPage;
