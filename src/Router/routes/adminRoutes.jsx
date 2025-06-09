/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";

const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard"));
const Order = lazy(() => import("../../views/admin/Order"));
const Category = lazy(() => import("../../views/admin/Category"));
const Seller = lazy(() => import("../../views/admin/Seller"));
const PaymentRequest = lazy(() => import("../../views/admin/PaymentRequest"));
const DeactiveSeller = lazy(() => import("../../views/admin/DeactiveSeller"));
const SellerRequest = lazy(() => import("../../views/admin/SellerRequest"));
// const SellerDetails = lazy(() => import("../../views/admin/SellerDetails"));
const ChatSeller = lazy(() => import("../../views/admin/ChatSeller"));
const OrderDetail = lazy(() => import("../../views/admin/OrderDetail"));

const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/order/details/:orderId",
    element: <OrderDetail />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/category",
    element: <Category />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/orders",
    element: <Order />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/sellers",
    element: <Seller />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/payment-request",
    element: <PaymentRequest />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/deactive-sellers",
    element: <DeactiveSeller />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/seller-request",
    element: <SellerRequest />,
    role: "admin",
  },
  // {
  //   path: "/admin/dashboard/seller/details/:sellerId",
  //   element: <SellerDetails />,
  //   role: "admin",
  // },
  {
    path: "/admin/dashboard/chat-sellers",
    element: <ChatSeller />,
    role: "admin",
  },
];

export default adminRoutes;
