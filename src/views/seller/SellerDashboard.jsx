import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FaBox,
  FaShoppingCart,
  FaDollarSign,
  FaChartLine,
  FaPlus,
  FaSearch,
  FaFilter,
  // FaEllipsisH,
} from "react-icons/fa";
import useProduct from "../../hooks/product/useProduct";
import useSellerAuth from "../../hooks/auth/useSellerAuth";

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeFilter, setTimeFilter] = useState("month");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({});

  const { useProductBySellerId } = useProduct();
  const { user } = useSellerAuth();
  console.log(user); // Assuming you have a hook to get the seller ID

  const { data: productData, isLoading: isLoadingProduct } =
    useProductBySellerId(user?.id);

  const productsLength = productData?.data.data.length || 0;
  console.log("Product Data:", productData?.data.data.length);

  // Mock data initialization
  useEffect(() => {
    // Dashboard stats
    setStats({
      totalRevenue: 48250,
      pendingOrders: 12,
      totalProducts: productsLength || 0,
      conversionRate: 4.2,
      revenueChange: +15.3,
      orderChange: -2.4,
    });

    // Recent orders
    setOrders([
      {
        id: "#ORD-283",
        customer: "Sarah Johnson",
        date: "2023-06-15",
        amount: 149.99,
        status: "Delivered",
      },
      {
        id: "#ORD-284",
        customer: "Michael Chen",
        date: "2023-06-14",
        amount: 89.5,
        status: "Shipped",
      },
      {
        id: "#ORD-285",
        customer: "Emma Rodriguez",
        date: "2023-06-14",
        amount: 210.0,
        status: "Processing",
      },
      {
        id: "#ORD-286",
        customer: "David Wilson",
        date: "2023-06-13",
        amount: 55.25,
        status: "Pending",
      },
      {
        id: "#ORD-287",
        customer: "Olivia Brown",
        date: "2023-06-12",
        amount: 325.75,
        status: "Delivered",
      },
    ]);

    // Top products
    setProducts([
      {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        stock: 42,
        price: 79.99,
        sales: 128,
      },
      {
        id: 2,
        name: "Stainless Steel Water Bottle",
        stock: 87,
        price: 24.99,
        sales: 95,
      },
      {
        id: 3,
        name: "Yoga Mat with Carrying Strap",
        stock: 15,
        price: 35.5,
        sales: 63,
      },
      {
        id: 4,
        name: "Phone Mount for Car Dashboard",
        stock: 0,
        price: 19.99,
        sales: 47,
      },
      {
        id: 5,
        name: "Portable External Battery",
        stock: 28,
        price: 45.0,
        sales: 41,
      },
    ]);
  }, [productsLength]);

  if (isLoadingProduct) {
    return <div>Loading products...</div>;
  }
  if (!productData || productData.length === 0) {
    return <div>No products available</div>;
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
            <Value>${(stats.totalRevenue || 0).toLocaleString()}</Value>
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

      <DashboardTabs>
        <Tab
          active={activeTab === "overview"}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </Tab>
        <Tab
          active={activeTab === "orders"}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </Tab>
        <Tab
          active={activeTab === "products"}
          onClick={() => setActiveTab("products")}
        >
          Products
        </Tab>
        <Tab
          active={activeTab === "analytics"}
          onClick={() => setActiveTab("analytics")}
        >
          Analytics
        </Tab>
      </DashboardTabs>

      <DashboardContent>
        {activeTab === "overview" && (
          <OverviewContent>
            <Section>
              <SectionHeader>
                <h2>Recent Orders</h2>
                <ViewAllLink>View All Orders</ViewAllLink>
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
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.date}</td>
                      <td>${order.amount.toFixed(2)}</td>
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
                <ViewAllLink>View All Products</ViewAllLink>
              </SectionHeader>
              <ProductsGrid>
                {products.map((product) => (
                  <ProductCard key={product.id}>
                    <ProductImage />
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
        )}

        {activeTab === "orders" && (
          <OrdersContent>
            <OrdersHeader>
              <SearchBar>
                <FaSearch />
                <input type="text" placeholder="Search orders..." />
              </SearchBar>
              <OrderFilters>
                <FilterSelect>
                  <option>All Statuses</option>
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </FilterSelect>
                <FilterSelect>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>2023</option>
                </FilterSelect>
                <ActionButton>
                  <FaFilter /> Filter
                </ActionButton>
              </OrderFilters>
            </OrdersHeader>

            <OrdersTable>
              {/* Same table as in overview but with more data */}
            </OrdersTable>
          </OrdersContent>
        )}

        {activeTab === "products" && (
          <ProductsContent>
            <ProductsHeader>
              <AddProductButton>
                <FaPlus /> Add Product
              </AddProductButton>
              <SearchBar>
                <FaSearch />
                <input type="text" placeholder="Search products..." />
              </SearchBar>
            </ProductsHeader>

            <ProductsList>
              {products.map((product) => (
                <ProductRow key={product.id}>
                  <ProductRowImage />
                  <ProductRowInfo>
                    <ProductName>{product.name}</ProductName>
                    <ProductMeta>
                      <div>${product.price.toFixed(2)}</div>
                      <StockStatus $inStock={product.stock > 0}>
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : "Out of stock"}
                      </StockStatus>
                    </ProductMeta>
                  </ProductRowInfo>
                  <SalesData>{product.sales} sold</SalesData>
                  <ProductActions>
                    <ActionButton>Edit</ActionButton>
                    <ActionButton>Manage</ActionButton>
                  </ProductActions>
                </ProductRow>
              ))}
            </ProductsList>
          </ProductsContent>
        )}
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

const DashboardTabs = styled.div`
  display: flex;
  border-bottom: 1px solid #e3e6f0;
  margin-bottom: 1.5rem;
`;

const Tab = styled.button`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  font-weight: 600;
  color: ${(props) => (props.active ? "#4e73df" : "#6e707e")};
  border-bottom: 3px solid
    ${(props) => (props.active ? "#4e73df" : "transparent")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #4e73df;
  }
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

const ViewAllLink = styled.a`
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

const ProductImage = styled.div`
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
const OrdersContent = styled.div``;
const OrdersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;
const ProductsContent = styled.div``;
// const AnalyticsContent = styled.div``;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: #f8f9fc;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  width: 300px;

  input {
    border: none;
    background: transparent;
    padding: 0.5rem;
    width: 100%;
    outline: none;
  }
`;

const OrderFilters = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #d1d3e2;
  border-radius: 4px;
  background: white;
`;

const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const AddProductButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #1cc88a;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #17a673;
  }
`;

const ProductsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProductRow = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #eaecf4;
  border-radius: 0.5rem;
  gap: 1.5rem;
`;

const ProductRowImage = styled.div`
  width: 60px;
  height: 60px;
  background-color: #f8f9fc;
  border-radius: 4px;
`;

const ProductRowInfo = styled.div`
  flex: 1;
`;

const SalesData = styled.div`
  width: 100px;
  font-weight: 600;
  color: #4e73df;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export default SellerDashboard;
