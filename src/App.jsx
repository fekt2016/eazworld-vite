import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import GlobalStyles from './styles/GlobalStyles'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Sell from './pages/Sell'
import Buy from './pages/Buy'
import Settings from './pages/Settings'
import History from './pages/History'
import PageNotFound from './pages/PageNotFound'
import Signup from './pages/Signup'
import Login from './pages/Login'
import DashboardLayout from './features/dashboard/DashboardLayout'
import Prepaid from './pages/Prepaid'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './ui/ProtectedRoute'
import RecoverPassword from './pages/RecoverPassword'
import UpdatePassword from './pages/UpdatePassword'
import BuyCurrentOrder from './pages/BuyCurrentOrder'
import Admin from './pages/Admin'
import SellCurrentOrder from './pages/SellCurrentOrder'
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import ManageOrder from './features/admin/ManageOrder'
import Customers from './features/admin/Customers'
import RateUpdate from './features/admin/RateUpdate'
=======
=======
>>>>>>> parent of 49283c7 (final)
import ManageOrderbuy from './features/admin/ManageOrderBuy'
import ManageOrderSell from './features/admin/ManageOrderSell'
=======
import ManageOrder from './features/admin/ManageOrder'
>>>>>>> parent of 4c94207 (email setting)
import Customers from './features/admin/Customers'
import RateUpdate from './features/admin/RateUpdate'
<<<<<<< HEAD
<<<<<<< HEAD
=======
import ManageOrderbuy from './features/admin/ManageOrderBuy'
import ManageOrderSell from './features/admin/ManageOrderSell'
import Customers from './features/admin/Customers'
import RateUpdate from './features/admin/RateUpdate'
>>>>>>> parent of 49283c7 (final)
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import Nav from './features/home/Nav'
>>>>>>> parent of 49283c7 (final)
=======
>>>>>>> parent of 5f192ef (email setting)
=======
>>>>>>> parent of 5f192ef (email setting)
=======
>>>>>>> parent of 005e1ed (avatar)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
<<<<<<< HEAD
          <Route index element={<Navigate replace to="home" />} />
          <Route path="home" element={<Home />} />
=======
          <Route index element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of 5f192ef (email setting)
=======
>>>>>>> parent of 5f192ef (email setting)
=======
>>>>>>> parent of 5f192ef (email setting)
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
            <Route
              path="buy-currentOrder/:orderId"
              element={<BuyCurrentOrder />}
            />
            <Route
              path="sell-currentOrder/:orderId"
              element={<SellCurrentOrder />}
            />
            <Route path="sell" element={<Sell />} />
            <Route path="buy" element={<Buy />} />
            <Route path="settings" element={<Settings />} />
            <Route path="history" element={<History />} />
            <Route path="prepaid" element={<Prepaid />} />
<<<<<<< HEAD
<<<<<<< HEAD
            <Route path="admin" element={<Admin />}>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
              <Route path="manage-order" element={<ManageOrder />} />
=======
=======
>>>>>>> parent of 49283c7 (final)
=======
            <Route path="admin" element={<Admin />}>
>>>>>>> parent of 49283c7 (final)
              <Route path="buy-manage" element={<ManageOrderbuy />} />
              <Route path="sell-manage" element={<ManageOrderSell />} />
>>>>>>> parent of 49283c7 (final)
=======
              <Route path="manage-order" element={<ManageOrder />} />
>>>>>>> parent of 4c94207 (email setting)
              <Route path="customers" element={<Customers />} />
              <Route path="rate-update" element={<RateUpdate />} />
            </Route>
<<<<<<< HEAD
=======
            <Route path="admin" element={<Admin />} />
>>>>>>> parent of 005e1ed (avatar)
=======
>>>>>>> parent of 49283c7 (final)
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            backgroundColor: 'var(--color-grey-0)',
            color: 'var(--color-grey-700)',
          },
        }}
      />
    </QueryClientProvider>
  )
}

export default App
