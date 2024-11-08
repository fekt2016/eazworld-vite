import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Sell from "./pages/Sell";
import Buy from "./pages/Buy";
import Settings from "./pages/Settings";
import History from "./pages/History";
import PageNotFound from "./pages/PageNotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import Prepaid from "./pages/Prepaid";
import { Toaster } from "react-hot-toast";

import RecoverPassword from "./pages/RecoverPassword";
import UpdatePassword from "./pages/UpdatePassword";
import BuyCurrentOrder from "./features/dashboard/BuyCurrentOrder";
import SellCurrentOrder from "./pages/SellCurrentOrder";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Nav from "./features/home/Nav";
import ProtectedRoute from "./ui/ProtectedRoute";
import Admin from "./pages/Admin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />

      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="/home" />} />
          <Route element={<Nav />}>
            <Route path="/home" element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blog" element={<Blog />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="recover-password" element={<RecoverPassword />} />
          <Route path="update-password" element={<UpdatePassword />} />

          <Route path="*" element={<PageNotFound />} />
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="admin" element={<Admin />} />
            <Route path="sell" element={<Sell />} />
            <Route path="sell" element={<Sell />} />
            <Route path="buy" element={<Buy />} />
            <Route
              path="buy-currentOrder/:orderId"
              element={<BuyCurrentOrder />}
            />
            <Route
              path="sell-currentOrder/:orderId"
              element={<SellCurrentOrder />}
            />
            <Route path="settings" element={<Settings />} />
            <Route path="history" element={<History />} />
            <Route path="prepaid" element={<Prepaid />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
