import { useState } from "react";
import {
  FaChartLine,
  FaCheckCircle,
  FaEdit,
  FaEllipsisV,
  FaEnvelope,
  FaFilter,
  FaSearch,
  FaStore,
  FaTimesCircle,
  FaTrash,
  FaUserAlt,
  FaUserPlus,
  FaUserShield,
} from "react-icons/fa";
import styled from "styled-components";

export default function User() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [actionMenu, setActionMenu] = useState(null);

  const users = [
    {
      id: "user1",
      name: "Alex Johnson",
      email: "alex@example.com",
      role: "admin",
      status: "active",
      lastActive: "2 hours ago",
      registration: "Oct 12, 2023",
      vendor: null,
      orders: 0,
      revenue: "$0",
    },
    {
      id: "user2",
      name: "Sarah Williams",
      email: "sarah@fashionhub.com",
      role: "vendor",
      status: "active",
      lastActive: "5 hours ago",
      registration: "Sep 28, 2023",
      vendor: "FashionHub",
      orders: 42,
      revenue: "$12,450",
    },
    {
      id: "user3",
      name: "Michael Brown",
      email: "michael@techgadgets.com",
      role: "vendor",
      status: "pending",
      lastActive: "1 day ago",
      registration: "Oct 15, 2023",
      vendor: "TechGadgets",
      orders: 28,
      revenue: "$8,920",
    },
    {
      id: "user4",
      name: "Emily Davis",
      email: "emily@example.com",
      role: "customer",
      status: "active",
      lastActive: "3 hours ago",
      registration: "Oct 5, 2023",
      vendor: null,
      orders: 8,
      revenue: "$420",
    },
    {
      id: "user5",
      name: "David Wilson",
      email: "david@homestyle.com",
      role: "vendor",
      status: "inactive",
      lastActive: "1 week ago",
      registration: "Aug 20, 2023",
      vendor: "HomeStyle",
      orders: 35,
      revenue: "$7,310",
    },
    {
      id: "user6",
      name: "Jessica Lee",
      email: "jessica@example.com",
      role: "customer",
      status: "active",
      lastActive: "Today",
      registration: "Oct 18, 2023",
      vendor: null,
      orders: 12,
      revenue: "$689",
    },
    {
      id: "user7",
      name: "Robert Garcia",
      email: "robert@beautycare.com",
      role: "vendor",
      status: "active",
      lastActive: "4 hours ago",
      registration: "Sep 10, 2023",
      vendor: "BeautyCare",
      orders: 19,
      revenue: "$5,680",
    },
    {
      id: "user8",
      name: "Amanda Taylor",
      email: "amanda@example.com",
      role: "customer",
      status: "inactive",
      lastActive: "2 weeks ago",
      registration: "Jul 15, 2023",
      vendor: null,
      orders: 3,
      revenue: "$150",
    },
  ];
  const filteredUsers = users.filter((user) => {
    const roleMatch = selectedRole === "all" || user.role === selectedRole;
    const statusMatch =
      selectedStatus === "all" || user.status === selectedStatus;
    return roleMatch && statusMatch;
  });

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <FaUserShield style={{ color: "#4361EE" }} />;
      case "vendor":
        return <FaStore style={{ color: "#F8961E" }} />;
      case "customer":
        return <FaUserAlt style={{ color: "#4CC9F0" }} />;
      default:
        return <FaUserAlt />;
    }
  };

  const toggleActionMenu = (userId) => {
    setActionMenu(actionMenu === userId ? null : userId);
  };
  return (
    <UserManagementContainer>
      <Header>
        <TitleSection>
          <h1>User Management</h1>
          <p>Manage all users, vendors, and administrators</p>
        </TitleSection>
        <ActionButton>
          <FaUserPlus /> Add New User
        </ActionButton>
      </Header>
      <ControlsSection>
        <SearchBar>
          <FaSearch style={{ color: "#8D99AE" }} />
          <input
            type="text"
            placeholder="Search users by name, email, or vendor..."
          />
        </SearchBar>

        <FilterButton onClick={() => setFilterOpen(!filterOpen)}>
          <FaFilter /> Filters
        </FilterButton>
      </ControlsSection>
      {filterOpen && (
        <FiltersPanel>
          <FilterGroup>
            <label>User Role</label>
            <Select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Administrator</option>
              <option value="vendor">Vendor</option>
              <option value="customer">Customer</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <label>Account Status</label>
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <label>Registration Date</label>
            <DateRangeSelector>
              <input type="date" />
              <span>to</span>
              <input type="date" />
            </DateRangeSelector>
          </FilterGroup>

          <ApplyFiltersButton>Apply Filters</ApplyFiltersButton>
        </FiltersPanel>
      )}
      <StatsSummary>
        <StatCard>
          <StatIcon style={{ background: "#4361EE20", color: "#4361EE" }}>
            <FaUserAlt />
          </StatIcon>
          <StatInfo>
            <StatValue>142</StatValue>
            <StatLabel>Total Users</StatLabel>
          </StatInfo>
        </StatCard>

        <StatCard>
          <StatIcon style={{ background: "#F8961E20", color: "#F8961E" }}>
            <FaStore />
          </StatIcon>
          <StatInfo>
            <StatValue>28</StatValue>
            <StatLabel>Active Vendors</StatLabel>
          </StatInfo>
        </StatCard>

        <StatCard>
          <StatIcon style={{ background: "#4CC9F020", color: "#4CC9F0" }}>
            <FaUserShield />
          </StatIcon>
          <StatInfo>
            <StatValue>5</StatValue>
            <StatLabel>Administrators</StatLabel>
          </StatInfo>
        </StatCard>

        <StatCard>
          <StatIcon style={{ background: "#F7258520", color: "#F72585" }}>
            <FaChartLine />
          </StatIcon>
          <StatInfo>
            <StatValue>89%</StatValue>
            <StatLabel>Active Rate</StatLabel>
          </StatInfo>
        </StatCard>
      </StatsSummary>
      <UsersTable>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>USER</TableHeaderCell>
            <TableHeaderCell>ROLE</TableHeaderCell>
            <TableHeaderCell>STATUS</TableHeaderCell>
            <TableHeaderCell>LAST ACTIVE</TableHeaderCell>
            <TableHeaderCell>REGISTRATION</TableHeaderCell>
            <TableHeaderCell>ACTIONS</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <UserInfo>
                  <UserAvatar>{user.name.charAt(0)}</UserAvatar>
                  <UserDetails>
                    <UserName>{user.name}</UserName>
                    <UserEmail>{user.email}</UserEmail>
                    {user.vendor && <VendorTag>{user.vendor}</VendorTag>}
                  </UserDetails>
                </UserInfo>
              </TableCell>

              <TableCell>
                <RoleBadge>
                  {getRoleIcon(user.role)}
                  <span>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </RoleBadge>
              </TableCell>

              <TableCell>
                <StatusBadge status={user.status}>
                  {user.status === "active" ? (
                    <FaCheckCircle />
                  ) : (
                    <FaTimesCircle />
                  )}
                  <span>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </StatusBadge>
              </TableCell>

              <TableCell>
                <LastActive>{user.lastActive}</LastActive>
              </TableCell>

              <TableCell>
                <RegistrationDate>{user.registration}</RegistrationDate>
              </TableCell>

              <TableCell>
                <ActionsCell>
                  <ActionButton onClick={() => toggleActionMenu(user.id)}>
                    <FaEllipsisV />
                  </ActionButton>

                  {actionMenu === user.id && (
                    <ActionMenu>
                      <ActionMenuItem>
                        <FaEdit /> Edit Profile
                      </ActionMenuItem>
                      <ActionMenuItem>
                        <FaEnvelope /> Send Message
                      </ActionMenuItem>
                      <ActionMenuItem>
                        <FaChartLine /> View Activity
                      </ActionMenuItem>
                      <ActionMenuItem danger>
                        <FaTrash /> Delete Account
                      </ActionMenuItem>
                    </ActionMenu>
                  )}
                </ActionsCell>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </UsersTable>
      <Pagination>
        <PaginationButton>Previous</PaginationButton>
        <PaginationButton active>1</PaginationButton>
        <PaginationButton>2</PaginationButton>
        <PaginationButton>3</PaginationButton>
        <PaginationButton>Next</PaginationButton>
      </Pagination>
    </UserManagementContainer>
  );
}

const UserManagementContainer = styled.div`
  padding: 30px;
  background-color: #f5f7fb;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TitleSection = styled.div`
  h1 {
    font-size: 28px;
    color: #2b2d42;
    margin-bottom: 8px;
  }

  p {
    color: #8d99ae;
    font-size: 16px;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #4361ee;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #3a56d4;
    transform: translateY(-2px);
  }
`;

const ControlsSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 15px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 10px;
  padding: 12px 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  flex: 1;
  max-width: 500px;

  input {
    border: none;
    padding: 5px 10px;
    width: 100%;
    outline: none;
    font-size: 15px;
    background: transparent;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: white;
  color: #4361ee;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #f0f2ff;
  }
`;

const FiltersPanel = styled.div`
  background: white;
  border-radius: 16px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FilterGroup = styled.div`
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #2b2d42;
    font-size: 14px;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #e9ecef;
  background: white;
  font-size: 14px;
  color: #2b2d42;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
`;

const DateRangeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    flex: 1;
    padding: 14px;
    border-radius: 10px;
    border: 1px solid #e9ecef;
    font-size: 14px;
  }

  span {
    color: #8d99ae;
  }
`;

const ApplyFiltersButton = styled.button`
  background: #4361ee;
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  align-self: flex-end;

  &:hover {
    background: #3a56d4;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StatsSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 15px;
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const StatInfo = styled.div``;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #2b2d42;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  color: #8d99ae;
  font-size: 14px;
`;

const UsersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
`;

const TableHeader = styled.thead`
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
`;

const TableHeaderCell = styled.th`
  padding: 18px 25px;
  text-align: left;
  font-weight: 600;
  color: #2b2d42;
  font-size: 14px;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid #e9ecef;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f8faff;
  }
`;

const TableCell = styled.td`
  padding: 18px 25px;
  color: #2b2d42;
  vertical-align: middle;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const UserAvatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #4361ee;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
`;

const UserDetails = styled.div``;

const UserName = styled.div`
  font-weight: 600;
  margin-bottom: 5px;
`;

const UserEmail = styled.div`
  color: #8d99ae;
  font-size: 14px;
  margin-bottom: 8px;
`;

const VendorTag = styled.span`
  background: #f0f2ff;
  color: #4361ee;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
`;

const RoleBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
`;

const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ status }) =>
    status === "active"
      ? "#4CC9F020"
      : status === "pending"
      ? "#F8961E20"
      : "#F7258520"};
  color: ${({ status }) =>
    status === "active"
      ? "#4CC9F0"
      : status === "pending"
      ? "#F8961E"
      : "#F72585"};
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  width: fit-content;
`;

const LastActive = styled.div`
  font-size: 14px;
  color: #2b2d42;
`;

const RegistrationDate = styled.div`
  font-size: 14px;
  color: #2b2d42;
`;

const ActionsCell = styled.div`
  position: relative;
`;

const ActionMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 10;
  overflow: hidden;
`;

const ActionMenuItem = styled.div`
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f8f9fa;
  }

  ${({ danger }) =>
    danger &&
    `
    color: #F72585;

    &:hover {
      background: #F7258510;
    }
  `}
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const PaginationButton = styled.button`
  min-width: 40px;
  padding: 0 15px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background: ${({ active }) => (active ? "#4361ee" : "white")};
  color: ${({ active }) => (active ? "white" : "#2b2d42")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  font-weight: 500;

  &:hover {
    background: ${({ active }) => (active ? "#3a56d4" : "#f0f2ff")};
  }
`;
