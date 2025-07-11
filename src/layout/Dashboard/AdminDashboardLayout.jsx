import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import AdminSidebar from "./AdminSidebar";
import styled from "styled-components";
import useAdminAuth from "../../hooks/auth/useAdminAuth";

export default function AdminDashboardLayout() {
  const { admin: user } = useAdminAuth();

  return (
    <DashboardLayoutContainer>
      <AdminSidebar role={user.role} />
      <Content>
        <DashboardHeader user={user} />
        <main>
          <Outlet />
        </main>
      </Content>
    </DashboardLayoutContainer>
  );
}
const theme = {
  // Previous values
  sidebarWidth: "240px",
  headerHeight: "64px",
  // Add new values
  breakpoints: {
    md: "768px",
  },
  shadows: {
    header: "0 2px 4px rgba(0,0,0,0.1)",
  },
  spacing: {
    content: "2rem",
  },
};
const DashboardLayoutContainer = styled.div`
  /* display: grid;
  grid-template-columns: ${theme.sidebarWidth} 1fr;
  min-height: 100vh; */
`;

const Content = styled.main`
  margin-left: ${theme.sidebarWidth};
  /* padding-top: ${theme.headerHeight}; */
  background: #f8fafc;

  > div {
    padding: 2rem;
    min-height: calc(100vh - ${theme.headerHeight});
  }

  @media (max-width: 768px) {
    margin-left: 0;
    padding-top: ${theme.headerHeight};
  }
`;
