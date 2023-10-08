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
import Signup from './pages/signup'
import Login from './pages/Login'
import DashboardLayout from './features/dashboard/DashboardLayout'
import Prepaid from './pages/Prepaid'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './ui/ProtectedRoute'
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
          <Route index element={<Navigate replace to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="sell" element={<Sell />} />
            <Route path="buy" element={<Buy />} />
            <Route path="settings" element={<Settings />} />
            <Route path="history" element={<History />} />
            <Route path="prepaid" element={<Prepaid />} />
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
