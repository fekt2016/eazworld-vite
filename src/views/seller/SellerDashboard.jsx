import { useMemo, useState } from "react";
import styled from "styled-components";
import {
  FaBox,
  FaShoppingCart,
  FaDollarSign,
  FaChartLine,
  FaExclamationTriangle,
  FaRedo,
  // FaPlus,
  // FaSearch,
  // FaFilter,
} from "react-icons/fa";
import useProduct from "../../hooks/product/useProduct";
import useSellerAuth from "../../hooks/auth/useSellerAuth";
import useOrder from "../../hooks/order/useOrder";
import { formatDate } from "../../utils/helpers";
import { Link } from "react-router-dom";
import useAnalytics from "../../hooks/analytic/useAnalytics";
const SellerDashboard = () => {
  const [timeFilter, setTimeFilter] = useState("month");
  const [retryCount, setRetryCount] = useState(0);
  console.log("timeFilter", timeFilter);

  const { useGetAllProductBySeller } = useProduct();

  const { getSellerOrders } = useOrder();
  const { useGetSellerProductViews } = useAnalytics();

  const {
    seller,
    isLoading: isSellerLoading,
    error: sellerError,
  } = useSellerAuth();
  const sellerId = useMemo(() => seller?.id || null, [seller]);

  const {
    data: ordersData,
    isLoading: isOrdersLoading,
    isError: isOrdersError,
    error: ordersError,
    refetch: refetchOrders,
  } = getSellerOrders;

  const {
    data: productData,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError,
    refetch: refetchProducts,
  } = useGetAllProductBySeller(sellerId, {
    enabled: !!sellerId,
  });

  const { data: viewData } = useGetSellerProductViews(sellerId, {
    enabled: !!sellerId,
  });

  console.log("viewData", viewData);
  const orders = useMemo(() => {
    return ordersData?.data.data.orders || [];
  }, [ordersData]);

  const products = useMemo(() => {
    return productData?.data.data || [];
  }, [productData]);

  const stats = useMemo(() => {
    // Filter delivered orders
    const deliveredOrders = orders.filter(
      (order) => order.status.toLowerCase() === "delivered"
    );

    // Helper: Get date range for current/previous period
    const getDateRange = (period) => {
      const now = new Date();
      let start, end, prevStart, prevEnd;

      switch (period) {
        case "today":
          start = new Date(now.setHours(0, 0, 0, 0));
          end = new Date(now.setHours(23, 59, 59, 999));
          prevStart = new Date(start);
          prevStart.setDate(prevStart.getDate() - 1);
          prevEnd = new Date(start);
          break;
        case "week":
          {
            const dayOfWeek = now.getDay();
            start = new Date(now);
            start.setDate(now.getDate() - dayOfWeek);
            start.setHours(0, 0, 0, 0);
            end = new Date(start);
            end.setDate(end.getDate() + 6);
            end.setHours(23, 59, 59, 999);
            prevStart = new Date(start);
            prevStart.setDate(prevStart.getDate() - 7);
            prevEnd = new Date(start);
            prevEnd.setDate(prevEnd.getDate() - 1);
          }
          break;
        case "month":
          start = new Date(now.getFullYear(), now.getMonth(), 1);
          end = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            0,
            23,
            59,
            59,
            999
          );
          prevStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          prevEnd = new Date(
            now.getFullYear(),
            now.getMonth(),
            0,
            23,
            59,
            59,
            999
          );
          break;
        case "year":
          start = new Date(now.getFullYear(), 0, 1);
          end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
          prevStart = new Date(now.getFullYear() - 1, 0, 1);
          prevEnd = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999);
          break;
        default:
          return { current: [], previous: [] };
      }

      return { start, end, prevStart, prevEnd };
    };

    const { start, end, prevStart, prevEnd } = getDateRange(timeFilter);

    // Filter orders in current and previous periods
    const currentPeriodOrders = deliveredOrders.filter(
      (order) =>
        new Date(order.createdAt) >= start && new Date(order.createdAt) <= end
    );
    const previousPeriodOrders = deliveredOrders.filter(
      (order) =>
        new Date(order.createdAt) >= prevStart &&
        new Date(order.createdAt) <= prevEnd
    );

    // Calculate revenue
    const currentRevenue = currentPeriodOrders.reduce(
      (sum, order) => sum + order.subtotal,
      0
    );
    const previousRevenue = previousPeriodOrders.reduce(
      (sum, order) => sum + order.subtotal,
      0
    );

    // Compute percentage change
    const revenueChange =
      previousRevenue === 0
        ? currentRevenue > 0
          ? 100
          : 0
        : ((currentRevenue - previousRevenue) / previousRevenue) * 100;

    // Other metrics
    const pendingOrders = orders.filter(
      (order) => order.status.toLowerCase() === "pending"
    ).length;
    const outOfStock = products.filter((p) => p.stock === 0).length;

    return {
      totalRevenue: currentRevenue,
      revenueChange: parseFloat(revenueChange.toFixed(1)),
      pendingOrders,
      totalProducts: products.length,
      outOfStock,
    };
  }, [orders, products, timeFilter]);
  console.log("stats", stats);

  const isLoading = isOrdersLoading || isProductLoading || isSellerLoading;
  const isError = isOrdersError || isProductError || sellerError;
  const anyDataAvailable = orders.length > 0 || products.length > 0;

  const handleRetry = () => {
    refetchOrders();
    refetchProducts();
    setRetryCount((prev) => prev + 1);
  };

  if (isLoading && !anyDataAvailable && retryCount === 0) {
    return <LoadingContainer>Loading dashboard data...</LoadingContainer>;
  }

  if (isError && !anyDataAvailable) {
    return (
      <ErrorContainer>
        <ErrorIcon>
          <FaExclamationTriangle />
        </ErrorIcon>
        <ErrorMessage>
          {ordersError?.message ||
            productError?.message ||
            sellerError?.message ||
            "Failed to load data. Please check your connection."}
        </ErrorMessage>
        <RetryButton onClick={handleRetry}>
          <FaRedo /> Try Again
        </RetryButton>
      </ErrorContainer>
    );
  }
  return (
    <DashboardContainer>
      <DashboardHeader>
        <WelcomeSection>
          <h1>Welcome back, FashionHub Store!</h1>
          <p>Here what happening with your store today</p>
        </WelcomeSection>
        <TimeFilter>
          <FilterButton
            active={timeFilter === "today"}
            onClick={() => setTimeFilter("today")}
          >
            Today
          </FilterButton>
          <FilterButton
            active={timeFilter === "week"}
            onClick={() => setTimeFilter("week")}
          >
            This Week
          </FilterButton>
          <FilterButton
            active={timeFilter === "month"}
            onClick={() => setTimeFilter("month")}
          >
            This Month
          </FilterButton>
          <FilterButton
            active={timeFilter === "year"}
            onClick={() => setTimeFilter("year")}
          >
            This Year
          </FilterButton>
        </TimeFilter>
      </DashboardHeader>

      <DashboardMetrics>
        <MetricCard>
          <CardIcon $color="#4e73df">
            <FaDollarSign />
          </CardIcon>
          <CardContent>
            <h3>Total Revenue</h3>
            <Value>Gh₵{(stats.totalRevenue || 0).toLocaleString()}</Value>
            <Trend $positive={stats.revenueChange > 0}>
              {stats.revenueChange > 0 ? "↑" : "↓"}{" "}
              {Math.abs(stats.revenueChange || 0)}% from last period
            </Trend>
          </CardContent>
        </MetricCard>

        <MetricCard>
          <CardIcon $color="#1cc88a">
            <FaShoppingCart />
          </CardIcon>
          <CardContent>
            <h3>Orders</h3>
            <Value>{stats.pendingOrders || 0} pending</Value>
            <Trend $positive={stats.orderChange > 0}>
              {stats.orderChange > 0 ? "↑" : "↓"}{" "}
              {Math.abs(stats.orderChange || 0)}% from last period
            </Trend>
          </CardContent>
        </MetricCard>

        <MetricCard>
          <CardIcon $color="#36b9cc">
            <FaBox />
          </CardIcon>
          <CardContent>
            <h3>Products</h3>
            <Value>{stats.totalProducts || 0} listed</Value>
            <SmallText>
              {products.filter((p) => p.stock === 0).length} out of stock
            </SmallText>
          </CardContent>
        </MetricCard>

        <MetricCard>
          <CardIcon $color="#f6c23e">
            <FaChartLine />
          </CardIcon>
          <CardContent>
            <h3>Conversion Rate</h3>
            <Value>{(stats.conversionRate || 0).toFixed(1)}%</Value>
            <SmallText>Store visits to purchases</SmallText>
          </CardContent>
        </MetricCard>
      </DashboardMetrics>
      <DashboardContent>
        <OverviewContent>
          <Section>
            <SectionHeader>
              <h2>Recent Orders</h2>
              <ViewAllLink to="/seller/dashboard/orders">
                View All Orders
              </ViewAllLink>
            </SectionHeader>
            <OrdersTable>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.orderNumber}</td>
                    <td>{order.user.name}</td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td>Gh₵{order.total}</td>
                    <td>
                      <StatusBadge $status={order.status.toLowerCase()}>
                        {order.status}
                      </StatusBadge>
                    </td>
                    <td>
                      <ActionButton>Manage</ActionButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </OrdersTable>
          </Section>

          <Section>
            <SectionHeader>
              <h2>Top Selling Products</h2>
              <ViewAllLink to="/seller/dashboard/products">
                View All Products
              </ViewAllLink>
            </SectionHeader>
            <ProductsGrid>
              {products.map((product) => (
                <ProductCard key={product.id}>
                  <ProductImage src={product.imageCover} alt={product.name} />
                  <ProductInfo>
                    <ProductName>{product.name}</ProductName>
                    <ProductMeta>
                      <div>${product.price.toFixed(2)}</div>
                      <StockStatus $inStock={product.stock > 0}>
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : "Out of stock"}
                      </StockStatus>
                    </ProductMeta>
                    <SalesBadge>{product.sales} sold</SalesBadge>
                  </ProductInfo>
                </ProductCard>
              ))}
            </ProductsGrid>
          </Section>
        </OverviewContent>
      </DashboardContent>
    </DashboardContainer>
  );
};

// Styled Components
const DashboardContainer = styled.div`
  padding: 2rem;
  background-color: #f8f9fc;
  min-height: 100vh;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const WelcomeSection = styled.div`
  h1 {
    font-size: 1.8rem;
    color: #2e59d9;
    margin-bottom: 0.5rem;
  }

  p {
    color: #6e707e;
    font-size: 1.1rem;
  }
`;

const TimeFilter = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FilterButton = styled.button`
  padding: 0.6rem 1.2rem;
  border: 1px solid ${(props) => (props.active ? "#4e73df" : "#dddfeb")};
  background-color: ${(props) => (props.active ? "#4e73df" : "white")};
  color: ${(props) => (props.active ? "white" : "#6e707e")};
  border-radius: 0.35rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #4e73df;
  }
`;

const DashboardMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const MetricCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
  display: flex;
  padding: 1.5rem;
`;

const CardIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.$color}20;
  color: ${(props) => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-right: 1.5rem;
`;

const CardContent = styled.div`
  flex: 1;
`;

const Value = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #5a5c69;
`;

const Trend = styled.div`
  font-size: 0.9rem;
  color: ${(props) => (props.$positive ? "#1cc88a" : "#e74a3b")};
  margin-top: 0.25rem;
`;

const SmallText = styled.div`
  font-size: 0.9rem;
  color: #858796;
  margin-top: 0.25rem;
`;

const DashboardContent = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
  padding: 1.5rem;
`;

const OverviewContent = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 1.5rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  background: white;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eaecf4;

  h2 {
    font-size: 1.25rem;
    color: #4e73df;
    margin: 0;
  }
`;

const ViewAllLink = styled(Link)`
  color: #4e73df;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #eaecf4;
  }

  th {
    font-weight: 700;
    color: #4e73df;
    background-color: #f8f9fc;
  }

  tr:hover {
    background-color: #f8f9fc;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;

  background-color: ${(props) =>
    props.$status === "delivered"
      ? "#d4edda"
      : props.$status === "shipped"
      ? "#cce5ff"
      : props.$status === "processing"
      ? "#fff3cd"
      : "#f8d7da"};

  color: ${(props) =>
    props.$status === "delivered"
      ? "#155724"
      : props.$status === "shipped"
      ? "#004085"
      : props.$status === "processing"
      ? "#856404"
      : "#721c24"};
`;

const ActionButton = styled.button`
  padding: 0.4rem 0.8rem;
  background-color: #4e73df;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #2e59d9;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const ProductCard = styled.div`
  border: 1px solid #eaecf4;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.img`
  height: 150px;
  background-color: #f8f9fc;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
`;

const ProductInfo = styled.div`
  padding: 1rem;
`;

const ProductName = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProductMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: #6e707e;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const StockStatus = styled.div`
  color: ${(props) => (props.$inStock ? "#1cc88a" : "#e74a3b")};
  font-weight: 600;
`;

const SalesBadge = styled.div`
  background-color: #f6c23e;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  display: inline-block;
`;

// Additional styles for other tabs

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  font-size: 1.2rem;
  color: #4e73df;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  color: #e74a3b;
  background: #fff6f6;
  border-radius: 0.5rem;
  padding: 2rem;
  margin: 2rem 0;
`;

const ErrorIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #e74a3b;
`;

const ErrorMessage = styled.div`
  color: #e74a3b;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const RetryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #4e73df;
  color: white;
  border: none;
  border-radius: 0.35rem;
  padding: 0.6rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  transition: background 0.2s;

  &:hover {
    background-color: #2e59d9;
  }
`;

export default SellerDashboard;
