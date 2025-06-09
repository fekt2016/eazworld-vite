import { lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { setupPersistor } from "./utils/cachePersistor";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { Suspense } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";

const SellerRequest = lazy(() => import("./views/admin/SellerRequest"));
const PaymentRequest = lazy(() => import("./views/admin/PaymentRequest"));
const AccountPending = lazy(() => import("./views/pages/AccountPending"));
const OrderDetailsSeller = lazy(() => import("./views/seller/OrderDetails"));
const SellerDashboard = lazy(() => import("./views/seller/SellerDashboard"));
const AllProduct = lazy(() => import("./views/seller/AllProduct"));
const Home = lazy(() => import("./views/pages/Home"));
const ErrorBoundary = lazy(() => import("./views/pages/ErrorBoundary"));
const AdminDashboard = lazy(() => import("./views/admin/AdminDashboard"));
const ProtectedAdminRoute = lazy(() =>
  import("./Router/routes/ProtectRoute/ProtectedAdminRoute")
);
const Category = lazy(() => import("./views/admin/Category"));
const AdminChat = lazy(() => import("./views/admin/Chat"));
const NotFound = lazy(() => import("./views/pages/NotFound"));
const DashboardLayout = lazy(() =>
  import("./layout/Dashboard/DashboardLayout")
);
const AddProduct = lazy(() => import("./views/seller/AddProduct"));
const Analytics = lazy(() => import("./views/seller/Analytics"));
const SellerSetting = lazy(() => import("./views/seller/Setting"));
const UnAuthorized = lazy(() => import("./views/pages/UnAuthorized"));
const AccountDeactive = lazy(() => import("./views/pages/AccountDeactive"));
const Register = lazy(() => import("./views/auth/Register"));
const Login = lazy(() => import("./views/auth/Login"));
const MainLayout = lazy(() => import("./layout/MainLayout"));
const AuthLayout = lazy(() => import("./layout/AuthLayout"));
const ProtectedSellerRoute = lazy(() =>
  import("./Router/routes/ProtectRoute/ProtectedSellerRoute")
);
const SellerLogin = lazy(() => import("./views/auth/SellerLogin"));
const AdminLogin = lazy(() => import("./views/auth/AdminLogin"));
const OrderAdmin = lazy(() => import("./views/admin/Order"));
const OrderSeller = lazy(() => import("./views/seller/Order"));
const DiscountProduct = lazy(() => import("./views/seller/DiscountProduct"));
const EditProduct = lazy(() => import("./views/seller/EditProduct"));
const AdminAllProduct = lazy(() => import("./views/admin/AllProduct"));
const User = lazy(() => import("./views/admin/User"));
const PaymentWithdrawal = lazy(() =>
  import("./views/seller/PaymentWithdrawal")
);
const Activity = lazy(() => import("./views/admin/Activity"));
const SellerChatSupport = lazy(() => import("./views/seller/ChatSupport"));
const AdminOrderDetail = lazy(() => import("./views/admin/OrderDetail"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 15,
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
  // mutations: {
  //   onSuccess: () => {
  //     // Generic success handler
  //     queryClient.invalidateQueries();
  //   },
  // },
});
setupPersistor(queryClient);

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
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/seller/login" element={<SellerLogin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="chat-support" element={<ChatSeller />} /> */}

              {/* <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} /> */}
            </Route>
            <Route
              path="/seller"
              element={
                <ProtectedSellerRoute
                  allowedStatuses={["active", "pending", "deactive"]}
                >
                  <DashboardLayout>
                    <Suspense fallback={<div>Loading...</div>}>
                      <ErrorBoundary>
                        <Outlet />
                      </ErrorBoundary>
                    </Suspense>
                  </DashboardLayout>
                </ProtectedSellerRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard">
                <Route
                  index
                  element={
                    <ProtectedSellerRoute
                      allowedStatuses={["active", "pending"]}
                    >
                      <SellerDashboard />
                    </ProtectedSellerRoute>
                  }
                />
                <Route
                  path="products"
                  element={
                    <ProtectedSellerRoute
                      allowedStatuses={["active"]}
                      // customRedirectMap={{
                      //   pending: "/custom-pending-route",
                      //   deactive: "/custom-deactive-route",
                      // }}
                    >
                      <AllProduct />
                    </ProtectedSellerRoute>
                  }
                />
                <Route
                  path="add-product"
                  element={
                    <ProtectedSellerRoute allowedStatuses={["active"]}>
                      <AddProduct />
                    </ProtectedSellerRoute>
                  }
                />
                <Route
                  path="edit-product/:productId"
                  element={
                    <ProtectedSellerRoute allowedStatuses={["active"]}>
                      <EditProduct />
                    </ProtectedSellerRoute>
                  }
                />
                <Route
                  path="orders"
                  element={
                    <ProtectedSellerRoute allowedStatuses={["active"]}>
                      <OrderSeller />
                    </ProtectedSellerRoute>
                  }
                />
                <Route
                  path="analytics"
                  element={
                    <ProtectedSellerRoute allowedStatuses={["active"]}>
                      <Analytics />
                    </ProtectedSellerRoute>
                  }
                />
                <Route
                  path="discount-product"
                  element={
                    <ProtectedSellerRoute allowedStatuses={["active"]}>
                      <DiscountProduct />
                    </ProtectedSellerRoute>
                  }
                />
                <Route
                  path="payments"
                  element={
                    <ProtectedSellerRoute allowedStatuses={["active"]}>
                      <PaymentWithdrawal />
                    </ProtectedSellerRoute>
                  }
                />
                <Route
                  path="chat-support"
                  element={
                    <ProtectedSellerRoute allowedStatuses={["active"]}>
                      <SellerChatSupport />
                    </ProtectedSellerRoute>
                  }
                />
                <Route
                  path="order/details/:orderId"
                  element={
                    <ProtectedSellerRoute allowedStatuses={["active"]}>
                      <OrderDetailsSeller />
                    </ProtectedSellerRoute>
                  }
                />
                <Route
                  path="settings"
                  element={
                    <ProtectedSellerRoute
                      allowedStatuses={["active", "pending"]}
                    >
                      <SellerSetting />
                    </ProtectedSellerRoute>
                  }
                />

                <Route path="unauthorized" element={<UnAuthorized />} />
                <Route path="account-pending" element={<AccountPending />} />
                <Route path="account-deactive" element={<AccountDeactive />} />
              </Route>
            </Route>
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <DashboardLayout>
                    <Suspense fallback={<div>Loading...</div>}>
                      <ErrorBoundary>
                        <Outlet />
                      </ErrorBoundary>
                    </Suspense>
                  </DashboardLayout>
                </ProtectedAdminRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard">
                <Route index element={<AdminDashboard />} />
                <Route path="categories" element={<Category />} />
                <Route path="seller-request" element={<SellerRequest />} />
                <Route path="chat" element={<AdminChat />} />
                <Route path="order" element={<OrderAdmin />} />
                <Route
                  path="order/details/:orderId"
                  element={<AdminOrderDetail />}
                />

                <Route path="products" element={<AdminAllProduct />} />
                <Route path="payment-request" element={<PaymentRequest />} />
                <Route path="users" element={<User />} />
                <Route path="activity" element={<Activity />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
