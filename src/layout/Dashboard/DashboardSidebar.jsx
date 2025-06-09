import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  // FaHome,
  // FaBox,
  FaChartLine,
  FaCog,
  // FaUser,
  FaSignOutAlt,
  FaUsersCog,
  FaBoxes,
  FaShoppingCart,
  // FaChartLine,
  // FaCog,
  FaStore,
  // FaSignOutAlt,
} from "react-icons/fa";

export default function DashboardSidebar({ role }) {
  const commonMenu = [
    { path: "dashboard/settings", label: "Settings", icon: <FaCog /> },
  ];

  // Seller-specific menu items
  const sellerMenu = [
    { path: "/seller/dashboard", label: "Dashboard", icon: <FaStore /> },
    {
      path: "/seller/dashboard/add-product",
      label: "Add Product",
      icon: <FaBoxes />,
    },
    {
      path: "/seller/dashboard/products",
      label: "My Products",
      icon: <FaBoxes />,
    },

    {
      path: "/seller/dashboard/orders",
      label: "Orders",
      icon: <FaShoppingCart />,
    },
    {
      path: "/seller/dashboard/analytics",
      label: "Analytics",
      icon: <FaChartLine />,
    },

    {
      path: "/seller/dashboard/discount-product",
      label: "Discount Product",
      icon: <FaBoxes />,
    },
    {
      path: "/seller/dashboard/payments",
      label: "Payments",
      icon: <FaChartLine />,
    },
    {
      path: "/seller/dashboard/chat-support",
      label: "chat support",
      icon: <FaUsersCog />,
    },
  ];

  // Admin-specific menu items
  const adminMenu = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <FaUsersCog /> },
    {
      path: "/admin/dashboard/order",
      label: "Order",
      icon: <FaShoppingCart />,
    },
    {
      path: "/admin/dashboard/products",
      label: "All Products",
      icon: <FaBoxes />,
    },
    {
      path: "/admin/dashboard/categories",
      label: "Categories",
      icon: <FaChartLine />,
    },
    {
      path: "/admin/dashboard/users",
      label: "User Management",
      icon: <FaUsersCog />,
    },
    {
      path: "/admin/dashboard/payment-request",
      label: "Payment Request",
      icon: <FaChartLine />,
    },
    // {
    //   path: "/admin/dashboard/deactive-sellers",
    //   label: "Deactive Sellers",
    //   icon: <FaUsersCog />,
    // },
    {
      path: "/admin/dashboard/seller-request",
      label: "Seller Request",
      icon: <FaUsersCog />,
    },
    {
      path: "/admin/dashboard/chat",
      label: "Live Chat",
      icon: <FaUsersCog />,
    },
    {
      path: "/admin/dashboard/activity",
      label: "activity",
      icon: <FaUsersCog />,
    },
  ];
  // Combine role-specific menu with common menu
  const menuItems = [
    ...(role === "admin" ? adminMenu : role === "seller" ? sellerMenu : []),
    ...commonMenu,
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        {role === "seller" ? (
          <Logo>
            My<span>Store</span>
          </Logo>
        ) : (
          <Logo>admin panel</Logo>
        )}
      </SidebarHeader>
      <MenuList>
        {menuItems.map((item) => (
          <MenuItem key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <MenuIcon>{item.icon}</MenuIcon>
              {item.label}
            </NavLink>
          </MenuItem>
        ))}
      </MenuList>
      <LogoutButton>
        <FaSignOutAlt />
        Logout
      </LogoutButton>
    </Sidebar>
  );
}

// Theme variables

// Header Component

export const NavItems = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const theme = {
  primaryColor: "#2563eb",
  secondaryColor: "#1e40af",
  textColor: "#1f2937",
  lightText: "#6b7280",
  sidebarWidth: "240px",
  headerHeight: "64px",
  borderRadius: "8px",
  transition: "all 0.3s ease",
};

// Sidebar Component
const Sidebar = styled.aside`
  width: ${theme.sidebarWidth};
  height: 100vh;
  background: ${theme.primaryColor};
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`;
const NavLink = styled(Link)`
  color: ${theme.lightText};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: ${theme.transition};

  &:hover {
    color: ${theme.primaryColor};
  }

  &.active {
    color: ${theme.primaryColor};
    font-weight: 500;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.primaryColor};

  span {
    color: ${theme.textColor};
  }
`;

const SidebarHeader = styled.div`
  padding: 0 1.5rem;
  margin-bottom: 2rem;

  ${Logo} {
    color: white;
    font-size: 1.25rem;

    span {
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
`;

const MenuItem = styled.li`
  a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: ${theme.transition};

    &:hover {
      background: ${theme.secondaryColor};
      color: white;
    }

    &.active {
      background: ${theme.secondaryColor};
      color: white;
      border-left: 4px solid white;
    }
  }
`;

const MenuIcon = styled.span`
  font-size: 1.2rem;
  display: flex;
`;

const LogoutButton = styled.button`
  background: ${theme.secondaryColor};
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  margin: 1rem;
  border-radius: ${theme.borderRadius};
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: ${theme.transition};

  &:hover {
    background: #1e3a8a;
  }
`;
