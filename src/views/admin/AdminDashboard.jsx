import { FaBox, FaChartLine, FaShoppingCart, FaUsers } from "react-icons/fa";
import styled from "styled-components";
import { Link } from "react-router-dom";
const theme = {
  primary: "#4361ee",
  secondary: "#3f37c9",
  accent: "#4895ef",
  success: "#4cc9f0",
  danger: "#f72585",
  warning: "#f8961e",
  dark: "#2b2d42",
  light: "#f8f9fa",
  gray: "#8d99ae",
  border: "#e9ecef",
};
// Mock data
const metrics = [
  {
    title: "Total Revenue",
    value: "$42,567",
    change: "+12.5%",
    icon: <FaShoppingCart />,
    bg: "primary",
  },
  {
    title: "Total Orders",
    value: "1,258",
    change: "+8.3%",
    icon: <FaBox />,
    bg: "success",
  },
  {
    title: "Active Vendors",
    value: "89",
    change: "+5.2%",
    icon: <FaUsers />,
    bg: "accent",
  },
  {
    title: "Conversion Rate",
    value: "4.7%",
    change: "+1.2%",
    icon: <FaChartLine />,
    bg: "warning",
  },
];

const orders = [
  {
    id: "#ORD-001",
    customer: "John Smith",
    date: "15 Oct, 2023",
    amount: "$128.50",
    status: "Completed",
  },
  {
    id: "#ORD-002",
    customer: "Sarah Johnson",
    date: "14 Oct, 2023",
    amount: "$75.20",
    status: "Pending",
  },
  {
    id: "#ORD-003",
    customer: "Michael Brown",
    date: "14 Oct, 2023",
    amount: "$210.00",
    status: "Completed",
  },
  {
    id: "#ORD-004",
    customer: "Emily Davis",
    date: "13 Oct, 2023",
    amount: "$59.99",
    status: "Failed",
  },
  {
    id: "#ORD-005",
    customer: "David Wilson",
    date: "13 Oct, 2023",
    amount: "$342.75",
    status: "Completed",
  },
];

const vendors = [
  { name: "FashionHub", products: 42, sales: "$12,450", rating: 4.8 },
  { name: "TechGadgets", products: 28, sales: "$8,920", rating: 4.7 },
  { name: "HomeStyle", products: 35, sales: "$7,310", rating: 4.5 },
  { name: "BeautyCare", products: 19, sales: "$5,680", rating: 4.3 },
  { name: "SportsGear", products: 23, sales: "$4,950", rating: 4.6 },
];

export default function AdminDashboard() {
  // const [sidebarOpen, setSidebarOpen] = useState(true);

  // const toggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen);
  // };
  return (
    <DashboardContainer>
      <MainContent>
        <Content>
          <WelcomeBanner>
            <div>
              <h1>Welcome back, Admin!</h1>
              <p>
                Heres whats happening with your multi-vendor platform today.
                Monitor your vendors, track sales, and manage orders
                efficiently.
              </p>
            </div>
            <button>Generate Report</button>
          </WelcomeBanner>
          <CardsContainer>
            {metrics.map((metric, index) => (
              <Card key={index}>
                <CardIcon bg={metric.bg}>{metric.icon}</CardIcon>
                <CardContent>
                  <h3>{metric.value}</h3>
                  <p>{metric.title}</p>
                  <small style={{ color: theme.success, fontWeight: 500 }}>
                    {metric.change}
                  </small>
                </CardContent>
              </Card>
            ))}
          </CardsContainer>
          <ChartsContainer>
            <ChartCard>
              <ChartHeader>
                <h3>Sales Analytics</h3>
                <select
                  style={{
                    border: "none",
                    background: theme.light,
                    padding: "5px 10px",
                    borderRadius: "8px",
                  }}
                >
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </ChartHeader>
              <ChartPlaceholder>Sales Chart Visualization</ChartPlaceholder>
            </ChartCard>
            <ChartCard>
              <ChartHeader>
                <h3>Top Vendors</h3>
              </ChartHeader>
              <div>
                {vendors.map((vendor, index) => (
                  <VendorCard key={index}>
                    <VendorAvatar>{vendor.name.charAt(0)}</VendorAvatar>
                    <VendorInfo>
                      <h4>{vendor.name}</h4>
                      <p>
                        {vendor.products} products • {vendor.sales} sales
                      </p>
                    </VendorInfo>
                    <VendorRating>{vendor.rating} ★</VendorRating>
                  </VendorCard>
                ))}
              </div>
            </ChartCard>
          </ChartsContainer>
          <ChartCard>
            <ChartHeader>
              <h3>Recent Orders</h3>
              <Link
                to="/admin/dashboard/orders"
                style={{
                  // background: theme.primary,
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                {" "}
                View All
              </Link>
            </ChartHeader>
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <th>ORDER ID</th>
                    <th>CUSTOMER</th>
                    <th>DATE</th>
                    <th>AMOUNT</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.date}</td>
                      <td>{order.amount}</td>
                      <td>
                        <StatusBadge status={order.status}>
                          {order.status}
                        </StatusBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
          </ChartCard>
        </Content>
      </MainContent>
    </DashboardContainer>
  );
}

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.light};
`;

// Main Content
const MainContent = styled.div`
  flex: 1;
  /* margin-left: 260px; */
  transition: all 0.3s;

  /* @media (max-width: 992px) {
    margin-left: ${({ isOpen }) => (isOpen ? "260px" : "70px")};
  } */
`;

// Content Area
const Content = styled.div`
  padding: 30px;

  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const WelcomeBanner = styled.div`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.accent}
  );
  color: white;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 28px;
    margin-bottom: 10px;
  }

  p {
    opacity: 0.9;
    max-width: 600px;
  }

  button {
    background: white;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    font-weight: 500;
    cursor: pointer;
    color: ${({ theme }) => theme.primary};
    transition: all 0.3s;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 20px;

    button {
      width: 100%;
    }
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
  margin-bottom: 30px;
`;

const Card = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: ${({ theme, bg }) => theme[bg] || theme.primary}20;
  color: ${({ theme, bg }) => theme[bg] || theme.primary};
`;

const CardContent = styled.div`
  flex: 1;

  h3 {
    font-size: 24px;
    margin-bottom: 5px;
  }

  p {
    color: ${({ theme }) => theme.gray};
    font-size: 14px;
  }
`;

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    font-size: 18px;
  }
`;

const ChartPlaceholder = styled.div`
  height: 300px;
  background: linear-gradient(120deg, #f5f7fb, #e9ecef);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.gray};
  font-weight: 500;
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 15px 10px;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }

  th {
    color: ${({ theme }) => theme.gray};
    font-weight: 500;
    font-size: 14px;
  }

  tbody tr:hover {
    background-color: rgba(67, 97, 238, 0.05);
  }
`;

const StatusBadge = styled.span`
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: ${({ theme, status }) =>
    status === "Completed"
      ? theme.success + "20"
      : status === "Pending"
      ? theme.warning + "20"
      : theme.danger + "20"};
  color: ${({ theme, status }) =>
    status === "Completed"
      ? theme.success
      : status === "Pending"
      ? theme.warning
      : theme.danger};
`;

const VendorCard = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  &:last-child {
    border-bottom: none;
  }
`;

const VendorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 18px;
  margin-right: 15px;
`;

const VendorInfo = styled.div`
  flex: 1;

  h4 {
    margin-bottom: 5px;
  }

  p {
    color: ${({ theme }) => theme.gray};
    font-size: 13px;
  }
`;

const VendorRating = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.warning};
`;
