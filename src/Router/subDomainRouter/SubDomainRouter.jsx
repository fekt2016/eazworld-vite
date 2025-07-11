import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";

const ProtectedSellerRoute = lazy(() =>
  import("../routes/ProtectRoute/ProtectedSellerRoute")
);
const AllProduct = lazy(() => import("../../views/seller/AllProduct"));
const SellerDashboardLayout = lazy(() =>
  import("../../layout/Dashboard/SellerDashboardLayout")
);
const ErrorBoundary = lazy(() => import("../../views/pages/ErrorBoundary"));
const SellerDashboard = lazy(() =>
  import("../../views/seller/SellerDashboard")
);
const ProtectedAdminRoute = lazy(() =>
  import("../routes/ProtectRoute/ProtectedAdminRoute")
);
const AdminDashboardLayout = lazy(() =>
  import("../../layout/Dashboard/AdminDashboardLayout")
);
const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard"));
const MainLayout = lazy(() => import("../../layout/MainLayout"));
const AuthLayout = lazy(() => import("../../layout/AuthLayout"));
const Login = lazy(() => import("../../views/auth/Login"));
const Register = lazy(() => import("../../views/auth/Register"));
const SellerLogin = lazy(() => import("../../views/auth/SellerLogin"));
const AdminLogin = lazy(() => import("../../views/auth/AdminLogin"));
const Home = lazy(() => import("../../views/pages/Home"));
const NotFound = lazy(() => import("../../views/pages/NotFound"));
const ProductDetail = lazy(() => import("../../views/pages/productDetail"));
const AddProduct = lazy(() => import("../../views/seller/AddProduct"));
const SellerSetting = lazy(() => import("../../views/seller/Setting"));
const EditProduct = lazy(() => import("../../views/seller/EditProduct"));
const OrderSeller = lazy(() => import("../../views/seller/Order"));
const DiscountProduct = lazy(() =>
  import("../../views/seller/DiscountProduct")
);
const PaymentWithdrawal = lazy(() =>
  import("../../views/seller/PaymentWithdrawal")
);
const SellerChatSupport = lazy(() => import("../../views/seller/ChatSupport"));
const PaymentRequest = lazy(() => import("../../views/admin/PaymentRequest"));
const SellerRequest = lazy(() => import("../../views/admin/SellerRequest"));
const AccountPending = lazy(() => import("../../views/pages/AccountPending"));
const OrderDetailsSeller = lazy(() =>
  import("../../views/seller/OrderDetails")
);
const UnAuthorized = lazy(() => import("../../views/pages/UnAuthorized"));
const AccountDeactive = lazy(() => import("../../views/pages/AccountDeactive"));
const Category = lazy(() => import("../../views/admin/Category"));
const OrderAdmin = lazy(() => import("../../views/admin/Order"));
const AdminOrderDetail = lazy(() => import("../../views/admin/OrderDetail"));
const AdminAllProduct = lazy(() => import("../../views/admin/AllProduct"));
const User = lazy(() => import("../../views/admin/User"));
const Activity = lazy(() => import("../../views/admin/Activity"));
const AdminChat = lazy(() => import("../../views/admin/Chat"));
const Wishlist = lazy(() => import("../../views/pages/Wishlist"));
const CartPage = lazy(() => import("../../views/pages/cart"));
const Checkout = lazy(() => import("../../views/pages/Checkout"));
const OrderComfirmation = lazy(() =>
  import("../../views/pages/OrderComfirmation")
);
const OrderListPage = lazy(() => import("../../views/pages/OrderList"));
function SubdomainRouter() {
  const [subdomain, setSubdomain] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Extract subdomain from hostname
    const host = window.location.hostname;
    const parts = host.split(".");

    if (parts.length > 1 && (parts[0] === "seller" || parts[0] === "admin")) {
      setSubdomain(parts[0]);
    } else {
      setSubdomain("main");
    }
  }, [location]);

  if (!subdomain) return <div>Loading...</div>;

  // Seller Subdomain
  if (subdomain === "seller") {
    return (
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<SellerLogin />} />
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/seller/login" element={<SellerLogin />} /> */}
          {/* <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} /> */}
        </Route>
        <Route
          path="/"
          element={
            <ProtectedSellerRoute
              allowedStatuses={["active", "pending", "deactive"]}
            >
              <SellerDashboardLayout>
                <Suspense fallback={<div>Loading...</div>}>
                  <ErrorBoundary>
                    <Outlet />
                  </ErrorBoundary>
                </Suspense>
              </SellerDashboardLayout>
            </ProtectedSellerRoute>
          }
        >
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard">
            <Route
              index
              element={
                <ProtectedSellerRoute allowedStatuses={["active", "pending"]}>
                  <SellerDashboard />
                </ProtectedSellerRoute>
              }
            />
            <Route
              path="products"
              element={
                <ProtectedSellerRoute allowedStatuses={["active"]}>
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
              path="orders/details/:orderId"
              element={
                <ProtectedSellerRoute allowedStatuses={["active"]}>
                  <OrderDetailsSeller />
                </ProtectedSellerRoute>
              }
            />
            <Route
              path="settings"
              element={
                <ProtectedSellerRoute allowedStatuses={["active"]}>
                  <SellerSetting />
                </ProtectedSellerRoute>
              }
            />
            <Route path="unauthorized" element={<UnAuthorized />} />
            <Route path="account-pending" element={<AccountPending />} />
            <Route path="account-deactive" element={<AccountDeactive />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
  // Admin Subdomain
  if (subdomain === "admin") {
    return (
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>
        <Route
          path="/"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardLayout>
                <Suspense fallback={<div>Loading...</div>}>
                  <ErrorBoundary>
                    <Outlet />
                  </ErrorBoundary>
                </Suspense>
              </AdminDashboardLayout>
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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  // Main Application (no subdomain)
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderComfirmation />} />
        <Route path="/orders" element={<OrderListPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default SubdomainRouter;
