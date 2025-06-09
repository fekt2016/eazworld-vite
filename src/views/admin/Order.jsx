// import { useState } from "react";

import styled from "styled-components";
import {
  FaChartBar,
  FaCheckCircle,
  FaEdit,
  FaExclamationCircle,
  FaEye,
  FaFilter,
  FaSearch,
  FaShoppingBag,
  FaTimesCircle,
  FaTrash,
  FaTruck,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Order() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const ordersPerPage = 8;
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  });
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  // Apply filters
  useEffect(() => {
    let result = [...orders];

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter);
    }

    // Apply date filter (simplified)
    if (dateFilter !== "all") {
      result = result.filter((order) => {
        if (dateFilter === "week") return order.id.includes("ORD-2023-00");
        if (dateFilter === "month") return true; // all in demo
        return true;
      });
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(term) ||
          order.customer.toLowerCase().includes(term)
      );
    }

    setFilteredOrders(result);
    setCurrentPage(1); // Reset to first page
  }, [statusFilter, dateFilter, searchTerm, orders]);

  useEffect(() => {
    const mockOrders = [
      {
        id: "ORD-2023-001",
        customer: "John Smith",
        date: "2023-10-15",
        status: "processing",
        items: 3,
        amount: 142.5,
      },
      {
        id: "ORD-2023-002",
        customer: "Sarah Johnson",
        date: "2023-10-14",
        status: "shipped",
        items: 2,
        amount: 89.99,
      },
      {
        id: "ORD-2023-003",
        customer: "Michael Brown",
        date: "2023-10-14",
        status: "pending",
        items: 5,
        amount: 245.75,
      },
      {
        id: "ORD-2023-004",
        customer: "Emily Davis",
        date: "2023-10-13",
        status: "delivered",
        items: 1,
        amount: 49.99,
      },
      {
        id: "ORD-2023-005",
        customer: "David Wilson",
        date: "2023-10-12",
        status: "cancelled",
        items: 4,
        amount: 178.4,
      },
      {
        id: "ORD-2023-006",
        customer: "Jessica Lee",
        date: "2023-10-11",
        status: "delivered",
        items: 2,
        amount: 112.3,
      },
      {
        id: "ORD-2023-007",
        customer: "Robert Taylor",
        date: "2023-10-10",
        status: "processing",
        items: 3,
        amount: 156.8,
      },
      {
        id: "ORD-2023-008",
        customer: "Amanda Clark",
        date: "2023-10-09",
        status: "shipped",
        items: 1,
        amount: 75.25,
      },
      {
        id: "ORD-2023-009",
        customer: "Daniel Moore",
        date: "2023-10-08",
        status: "pending",
        items: 2,
        amount: 94.99,
      },
      {
        id: "ORD-2023-010",
        customer: "Olivia Anderson",
        date: "2023-10-07",
        status: "delivered",
        items: 4,
        amount: 210.45,
      },
    ];

    setOrders(mockOrders);
    setFilteredOrders(mockOrders);

    // Calculate stats
    const total = mockOrders.length;
    const pending = mockOrders.filter((o) => o.status === "pending").length;
    const processing = mockOrders.filter(
      (o) => o.status === "processing"
    ).length;
    const shipped = mockOrders.filter((o) => o.status === "shipped").length;
    const delivered = mockOrders.filter((o) => o.status === "delivered").length;
    const cancelled = mockOrders.filter((o) => o.status === "cancelled").length;

    setStats({ total, pending, processing, shipped, delivered, cancelled });
  }, []);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleStatusChange = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setShowStatusModal(true);
  };

  const confirmStatusChange = () => {
    if (selectedOrder && newStatus) {
      const updatedOrders = orders.map((order) =>
        order.id === selectedOrder.id ? { ...order, status: newStatus } : order
      );

      setOrders(updatedOrders);
      setShowStatusModal(false);
    }
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FaExclamationCircle />;
      case "processing":
        return <FaShoppingBag />;
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
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#f39c12";
      case "processing":
        return "#3498db";
      case "shipped":
        return "#9b59b6";
      case "delivered":
        return "#2ecc71";
      case "cancelled":
        return "#e74c3c";
      default:
        return "#7f8c8d";
    }
  };
  return (
    <Container>
      <Header>
        <Title>
          <FaShoppingBag /> Order Management
        </Title>
        <Description>Manage and track customer orders</Description>
      </Header>
      <StatsContainer>
        <StatCard>
          <StatIcon $color="#3498db">
            <FaShoppingBag />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.total}</StatValue>
            <StatLabel>Total Orders</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon $color="#f39c12">
            <FaExclamationCircle />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.pending}</StatValue>
            <StatLabel>Pending</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon $color="#3498db">
            <FaShoppingBag />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.processing}</StatValue>
            <StatLabel>Processing</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon $color="#9b59b6">
            <FaTruck />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.shipped}</StatValue>
            <StatLabel>Shipped</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon $color="#2ecc71">
            <FaCheckCircle />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.delivered}</StatValue>
            <StatLabel>Delivered</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon $color="#e74c3c">
            <FaTimesCircle />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.cancelled}</StatValue>
            <StatLabel>Cancelled</StatLabel>
          </StatContent>
        </StatCard>
      </StatsContainer>
      <ControlsContainer>
        <SearchContainer>
          <FaSearch />
          <SearchInput
            type="text"
            placeholder="Search orders by ID or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        <FilterGroup>
          <FilterLabel>Status</FilterLabel>
          <FilterSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </FilterSelect>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>Date</FilterLabel>
          <FilterSelect
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </FilterSelect>
        </FilterGroup>
        <ActionButton>
          <FaFilter /> Apply Filters
        </ActionButton>

        <ActionButton $primary>
          <FaChartBar /> Reports
        </ActionButton>
      </ControlsContainer>
      <OrdersTable>
        <TableHeader>
          <TableRow>
            <HeaderCell>Order ID</HeaderCell>
            <HeaderCell>Customer</HeaderCell>
            <HeaderCell>Date</HeaderCell>
            <HeaderCell>Items</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Status</HeaderCell>
            <HeaderCell>Actions</HeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentOrders.length > 0 ? (
            currentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>${order.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <StatusBadge $color={getStatusColor(order.status)}>
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <ActionButtons>
                    <ActionIcon
                      $color="#3498db"
                      title="View details"
                      to={`/admin/dashboard/order/details/${order.id}`}
                    >
                      <FaEye />
                    </ActionIcon>
                    <ActionIcon
                      $color="#2ecc71"
                      title="Update status"
                      onClick={() => handleStatusChange(order)}
                    >
                      <FaEdit />
                    </ActionIcon>
                    <ActionIcon $color="#e74c3c" title="Delete order">
                      <FaTrash />
                    </ActionIcon>
                  </ActionButtons>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <NoOrdersRow>
              <td colSpan="7">
                <NoOrders>
                  <FaShoppingBag size={48} />
                  <h3>No orders found</h3>
                  <p>Try adjusting your filters or search criteria</p>
                </NoOrders>
              </td>
            </NoOrdersRow>
          )}
        </TableBody>
      </OrdersTable>
      <PaginationContainer>
        <PaginationInfo>
          Showing {indexOfFirstOrder + 1} to{" "}
          {Math.min(indexOfLastOrder, filteredOrders.length)} of{" "}
          {filteredOrders.length} orders
        </PaginationInfo>
        <PaginationControls>
          <PaginationButton
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </PaginationButton>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationButton
              key={page}
              $active={currentPage === page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PaginationButton>
          ))}

          <PaginationButton
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </PaginationButton>
        </PaginationControls>
      </PaginationContainer>
      {showStatusModal && selectedOrder && (
        <ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              <h3>Update Order Status</h3>
              <CloseButton onClick={() => setShowStatusModal(false)}>
                ×
              </CloseButton>
            </ModalHeader>
            <ModalContent>
              <OrderInfo>
                <InfoLabel>Order ID:</InfoLabel>
                <InfoValue>{selectedOrder.id}</InfoValue>
              </OrderInfo>
              <OrderInfo>
                <InfoLabel>Customer:</InfoLabel>
                <InfoValue>{selectedOrder.customer}</InfoValue>
              </OrderInfo>
              <OrderInfo>
                <InfoLabel>Current Status:</InfoLabel>
                <InfoValue>
                  <StatusBadge $color={getStatusColor(selectedOrder.status)}>
                    {selectedOrder.status.charAt(0).toUpperCase() +
                      selectedOrder.status.slice(1)}
                  </StatusBadge>
                </InfoValue>
              </OrderInfo>

              <FormGroup>
                <FormLabel>New Status</FormLabel>
                <FormSelect
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </FormSelect>
              </FormGroup>

              {newStatus === "shipped" && (
                <FormGroup>
                  <FormLabel>Tracking Number</FormLabel>
                  <FormInput type="text" placeholder="Enter tracking number" />
                </FormGroup>
              )}

              <ActionButtons>
                <ModalButton onClick={() => setShowStatusModal(false)}>
                  Cancel
                </ModalButton>
                <ModalButton $primary onClick={confirmStatusChange}>
                  Update Status
                </ModalButton>
              </ActionButtons>
            </ModalContent>
          </ModalContainer>
        </ModalOverlay>
      )}
    </Container>
  );
}
const Container = styled.div`
  padding: 2rem;
  background-color: #f8fafc;
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: #7f8c8d;
  font-size: 1rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-size: 1.5rem;
  color: white;
  background-color: ${(props) => props.$color || "#3498db"};
`;

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
`;

const StatLabel = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const ControlsContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
`;

const SearchContainer = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  gap: 0.75rem;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1rem;
  outline: none;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 0.25rem;
`;

const FilterSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  min-width: 150px;
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) => (props.$primary ? "#3498db" : "white")};
  color: ${(props) => (props.$primary ? "white" : "#2c3e50")};
  border: ${(props) => (props.$primary ? "none" : "1px solid #e2e8f0")};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${(props) => (props.$primary ? "#2980b9" : "#f8f9fa")};
  }
`;

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
`;

const TableHeader = styled.thead`
  background-color: #f8fafc;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e2e8f0;

  &:nth-child(even) {
    background-color: #f8fafc;
  }

  &:hover {
    background-color: #f1f5f9;
  }
`;

const HeaderCell = styled.th`
  padding: 1rem 1.5rem;
  text-align: left;
  font-weight: 600;
  color: #4a5568;
  font-size: 0.875rem;
`;

const TableBody = styled.tbody``;

const TableCell = styled.td`
  padding: 1rem 1.5rem;
  color: #2c3e50;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${(props) =>
    props.$color ? `${props.$color}20` : "#f1f5f9"};
  color: ${(props) => props.$color || "#4a5568"};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionIcon = styled(Link)`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) =>
    props.$color ? `${props.$color}20` : "#f1f5f9"};
  color: ${(props) => props.$color || "#4a5568"};
  border: none;

  &:hover {
    background-color: ${(props) => props.$color || "#e2e8f0"};
    color: white;
  }
`;

const NoOrdersRow = styled.tr`
  td {
    padding: 3rem;
    text-align: center;
  }
`;

const NoOrders = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #7f8c8d;

  h3 {
    color: #2c3e50;
    margin: 0;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-radius: 10px;
  padding: 1rem 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const PaginationInfo = styled.div`
  color: #7f8c8d;
  font-size: 0.875rem;
`;

const PaginationControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) => (props.$active ? "#3498db" : "white")};
  color: ${(props) => (props.$active ? "white" : "#2c3e50")};
  border: ${(props) => (props.$active ? "none" : "1px solid #e2e8f0")};

  &:hover:not(:disabled) {
    background-color: ${(props) => (props.$active ? "#2980b9" : "#f8f9fa")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  background: #f8fafc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;

  h3 {
    margin: 0;
    font-size: 1.25rem;
    color: #2c3e50;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #7f8c8d;

  &:hover {
    color: #2c3e50;
  }
`;

const ModalContent = styled.div`
  padding: 1.5rem;
`;

const OrderInfo = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const InfoLabel = styled.div`
  flex: 1;
  font-weight: 500;
  color: #2c3e50;
`;

const InfoValue = styled.div`
  flex: 2;
  color: #4a5568;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
`;

// const ActionButtons = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 1rem;
//   margin-top: 1rem;
// `;

const ModalButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) => (props.$primary ? "#3498db" : "white")};
  color: ${(props) => (props.$primary ? "white" : "#2c3e50")};
  border: ${(props) => (props.$primary ? "none" : "1px solid #e2e8f0")};

  &:hover {
    background-color: ${(props) => (props.$primary ? "#2980b9" : "#f8f9fa")};
  }
`;
