import styled from "styled-components";

const Analytics = () => {
  // Mock data - replace with your actual data source
  const analyticsData = {
    sales: {
      today: 1242.5,
      thisWeek: 8450.3,
      thisMonth: 32400.75,
    },
    orders: {
      pending: 12,
      completed: 89,
      returned: 3,
    },
    customers: {
      new: 24,
      returning: 67,
      total: 2430,
    },
    products: {
      total: 156,
      lowStock: 7,
      outOfStock: 2,
    },
  };

  const recentOrders = [
    {
      id: "#ORD-7821",
      customer: "Alex Johnson",
      amount: 124.99,
      status: "Delivered",
    },
    {
      id: "#ORD-7820",
      customer: "Sarah Miller",
      amount: 89.5,
      status: "Shipped",
    },
    {
      id: "#ORD-7819",
      customer: "Michael Chen",
      amount: 245.0,
      status: "Processing",
    },
    {
      id: "#ORD-7818",
      customer: "Emma Davis",
      amount: 67.3,
      status: "Delivered",
    },
    {
      id: "#ORD-7817",
      customer: "James Wilson",
      amount: 189.99,
      status: "Shipped",
    },
  ];

  return (
    <Container>
      <Title>Business Analytics</Title>

      {/* Key Metrics Grid */}
      <MetricsGrid>
        <MetricCard
          title="Today's Sales"
          value={`$${analyticsData.sales.today.toFixed(2)}`}
          change="+12.4%"
          positive
        />
        <MetricCard
          title="Pending Orders"
          value={analyticsData.orders.pending}
          change="+3.2%"
        />
        <MetricCard
          title="New Customers"
          value={analyticsData.customers.new}
          change="+5.8%"
          positive
        />
        <MetricCard
          title="Low Stock Items"
          value={analyticsData.products.lowStock}
          change="Attention needed"
          warning
        />
      </MetricsGrid>

      {/* Detailed Stats Section */}
      <DetailGrid>
        <StatBlock title="Sales Summary">
          <StatContent>
            <StatItem
              label="This Week"
              value={`$${analyticsData.sales.thisWeek.toFixed(2)}`}
            />
            <StatItem
              label="This Month"
              value={`$${analyticsData.sales.thisMonth.toFixed(2)}`}
            />
            <StatItem
              label="Completed Orders"
              value={analyticsData.orders.completed}
            />
            <StatItem
              label="Return Rate"
              value={`${(
                (analyticsData.orders.returned /
                  analyticsData.orders.completed) *
                100
              ).toFixed(1)}%`}
            />
          </StatContent>
        </StatBlock>

        <StatBlock title="Inventory Status">
          <StatContent>
            <StatItem
              label="Total Products"
              value={analyticsData.products.total}
            />
            <StatItem
              label="Low Stock"
              value={analyticsData.products.lowStock}
              warning
            />
            <StatItem
              label="Out of Stock"
              value={analyticsData.products.outOfStock}
              danger
            />
            <StatItem label="Customer Satisfaction" value="94.2%" positive />
          </StatContent>
        </StatBlock>
      </DetailGrid>

      {/* Recent Orders */}
      <StatBlock title="Recent Orders">
        <TableContainer>
          <Table>
            <TableHead>
              <tr>
                <TableHeader>Order ID</TableHeader>
                <TableHeader>Customer</TableHeader>
                <TableHeader>Amount</TableHeader>
                <TableHeader>Status</TableHeader>
              </tr>
            </TableHead>
            <tbody>
              {recentOrders.map((order, index) => (
                <TableRow key={index} even={index % 2 === 0}>
                  <TableData>{order.id}</TableData>
                  <TableData>{order.customer}</TableData>
                  <TableData>${order.amount.toFixed(2)}</TableData>
                  <TableData>
                    <StatusBadge status={order.status} />
                  </TableData>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </StatBlock>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const MetricCardContainer = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-left: 4px solid #3b82f6;
  border-color: ${(props) =>
    props.positive ? "#10B981" : props.warning ? "#F59E0B" : "#3B82F6"};
`;

const MetricTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
`;

const MetricValue = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-top: 0.5rem;
`;

const ChangeText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) =>
    props.positive ? "#10B981" : props.warning ? "#F59E0B" : "#6B7280"};
`;

const MetricCard = ({ title, value, change, positive, warning }) => (
  <MetricCardContainer positive={positive} warning={warning}>
    <MetricTitle>{title}</MetricTitle>
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
      }}
    >
      <MetricValue>{value}</MetricValue>
      {change && (
        <ChangeText positive={positive} warning={warning}>
          {change}
        </ChangeText>
      )}
    </div>
  </MetricCardContainer>
);

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatBlockContainer = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  overflow: hidden;
`;

const StatHeader = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const StatTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: #111827;
`;

const StatContent = styled.div`
  padding: 1.25rem 1.5rem;
`;

const StatBlock = ({ title, children }) => (
  <StatBlockContainer>
    <StatHeader>
      <StatTitle>{title}</StatTitle>
    </StatHeader>
    {children}
  </StatBlockContainer>
);

const StatItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StatLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
`;

const StatValue = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${(props) =>
    props.positive
      ? "#10B981"
      : props.warning
      ? "#F59E0B"
      : props.danger
      ? "#EF4444"
      : "#111827"};
`;

const StatItem = ({ label, value, positive, warning, danger }) => (
  <StatItemContainer>
    <StatLabel>{label}</StatLabel>
    <StatValue positive={positive} warning={warning} danger={danger}>
      {value}
    </StatValue>
  </StatItemContainer>
);

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  min-width: 640px;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f9fafb;
`;

const TableHeader = styled.th`
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TableRow = styled.tr`
  background-color: ${(props) => (props.even ? "#fff" : "#f9fafb")};
`;

const TableData = styled.td`
  padding: 1rem;
  font-size: 0.875rem;
  white-space: nowrap;

  &:first-child {
    font-weight: 500;
    color: #111827;
  }

  &:nth-child(2) {
    color: #4b5563;
  }

  &:nth-child(3) {
    font-weight: 500;
    color: #111827;
  }
`;

const StatusBadgeBase = styled.span`
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
  display: inline-block;
`;

const StatusBadge = ({ status }) => {
  let colorConfig = {};

  switch (status) {
    case "Delivered":
      colorConfig = { background: "#D1FAE5", color: "#065F46" };
      break;
    case "Shipped":
      colorConfig = { background: "#DBEAFE", color: "#1E40AF" };
      break;
    case "Processing":
      colorConfig = { background: "#FEF3C7", color: "#92400E" };
      break;
    default:
      colorConfig = { background: "#F3F4F6", color: "#1F2937" };
  }

  return (
    <StatusBadgeBase
      style={{
        backgroundColor: colorConfig.background,
        color: colorConfig.color,
      }}
    >
      {status}
    </StatusBadgeBase>
  );
};

export default Analytics;
