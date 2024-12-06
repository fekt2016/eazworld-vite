// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import Sell from "./pages/Sell";
// import Buy from "./pages/Buy";
// import Settings from "./pages/Settings";
// import History from "./pages/History";
// import PageNotFound from "./pages/PageNotFound";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import DashboardLayout from "./pages/DashboardLayout";
// import Prepaid from "./pages/Prepaid";
// import { Toaster } from "react-hot-toast";

// import RecoverPassword from "./pages/RecoverPassword";
// import UpdatePassword from "./pages/UpdatePassword";
// import BuyCurrentOrder from "./features/dashboard/BuyCurrentOrder";
// import SellCurrentOrder from "./pages/SellCurrentOrder";
// import Contact from "./pages/Contact";
// import Blog from "./pages/Blog";
import Nav from "./features/home/Nav";
// import ProtectedRoute from "./ui/ProtectedRoute";
// import Admin from "./pages/Admin";
// import { useEffect, useState } from "react";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 0,
//     },
//   },
// });

// function useMedia(query) {
//   const [matches, setMatches] = useState(window.matchMedia(query).matches);

//   useEffect(() => {
//     const media = window.matchMedia(query);
//     if (media.matches !== matches) {
//       setMatches(media.matches);
//     }
//     const listener = () => setMatches(media.matches);
//     media.addListener(listener);
//     return () => media.removeListener(listener);
//   }, [query, matches]);

//   return matches;
// }
// function App() {
//   const small = useMedia("(max-width: 640px)");

//   return (
//     <QueryClientProvider client={queryClient}>
//       <ReactQueryDevtools initialIsOpen={false} />
//       <GlobalStyles />
//       <BrowserRouter>
//         <Routes>
//           <Route index element={<Navigate replace to="/home" />} />
//           <Route element={<Nav />}>
//             <Route path="/home" element={<Home />} />
//             <Route path="contact" element={<Contact />} />
//             <Route path="blog" element={<Blog />} />
//           </Route>
//           <Route path="login" element={<Login />} />
//           <Route path="signup" element={<Signup />} />
//           <Route path="recover-password" element={<RecoverPassword />} />
//           <Route path="update-password" element={<UpdatePassword />} />

//           <Route path="*" element={<PageNotFound />} />
//           <Route
//             element={
//               <ProtectedRoute>
//                 <DashboardLayout />
//               </ProtectedRoute>
//             }
//           >
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="admin" element={<Admin />} />
//             <Route path="sell" element={<Sell />} />
//             <Route path="sell" element={<Sell />} />
//             <Route path="buy" element={<Buy />} />
//             <Route
//               path="buy-currentOrder/:orderId"
//               element={<BuyCurrentOrder />}
//             />
//             <Route
//               path="sell-currentOrder/:orderId"
//               element={<SellCurrentOrder />}
//             />
//             <Route path="settings" element={<Settings />} />
//             <Route path="history" element={<History />} />
//             <Route path="prepaid" element={<Prepaid />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>

//       <Toaster
//         position={small ? "bottom-center" : "top-center"}
//         gutter={12}
//         containerStyle={{ margin: "8px" }}
//         toastOptions={{
//           success: {
//             duration: 3000,
//             style: {
//               backgroundColor: "var(--color-green-700)",
//               color: "var(--color-white-0)",
//             },
//           },
//           error: {
//             style: {
//               backgroundColor: "var(--color-red-800)",
//               color: "var(--color-white-0)",
//             },
//           },
//           style: {
//             fontSize: `${small ? "1rem" : "1.6rem"}`,
//             maxWidth: `${small ? "35rem" : "50rem"}`,
//             boxShadow: `rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px`,
//           },
//         }}
//       />
//     </QueryClientProvider>
//   );
// }
function App() {
  <GlobalStyles />
  return <BrowserRouter>
   <Routes> <Route index element={<Navigate replace to="/home" />} />
   <Route element={<Nav />}>
   <Route path="/home" element={<Home />} />
   </Route>

   </Routes>
 
</BrowserRouter>}

export default App;
