// import { Navigate } from "react-router-dom";
// import { useUser } from "../../../hooks/useUser";
// import { memo, Suspense, useEffect, useState } from "react";
// import LoadingSpinner from "../../../views/components/LoadingSpinner"; // Adjust the path as needed

// const ProtectedRoutes = ({ route, children }) => {
//   const { user, isLoading, error } = useUser();
//   const [localAuthCheck, setLocalAuthCheck] = useState(() => {
//     // Immediate synchronous check for auth token
//     return !!localStorage.getItem("authToken");
//   });
//   useEffect(() => {
//     console.log("isLoading", isLoading);
//     if (!isLoading) {
//       setLocalAuthCheck(!!localStorage.getItem("authToken"));
//     }
//   }, [isLoading]);
//   if (localAuthCheck && isLoading) {
//     return <LoadingSpinner />;
//   }
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
//   console.log("user", user);

//   if (error) {
//     console.error("Error fetching user data:", error);
//     return (
//       <Navigate
//         to="/error"
//         state={{ error: "Error fetching user data" }}
//         replace
//       />
//     );
//   }
//   const currentUser = user;

//   // if (!currentUser) {
//   //   return <Navigate to="/login" replace />;
//   // }
//   const { role, status } = currentUser;
//   const { requiredRole, allowedStatuses, abilities } = route;

//   if (requiredRole && role !== requiredRole) {
//     return <Navigate to="/unauthorized" replace />;
//   }
//   if (allowedStatuses && !allowedStatuses.includes(status)) {
//     return handleStatusRedirect(status);
//   }
//   if (abilities && !abilities.includes(role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }
//   return (
//     <div>
//       <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
//     </div>
//   );
// };
// const statusRedirectMap = {
//   pending: "/seller/account-pending",
//   inactive: "/seller/account-deactive",
//   default: "/unauthorized",
// };

// const handleStatusRedirect = (status) => {
//   const path = statusRedirectMap[status] || statusRedirectMap.default;
//   return <Navigate to={path} replace />;
// };

// const MemoizedProtectedRoutes = memo(ProtectedRoutes);
// export default MemoizedProtectedRoutes;

// // import { Suspense, memo } from "react";
// // import { useUser } from "../../hooks/useUser";
// // import { Navigate } from "react-router-dom";

// // function ProtectedRoutes({ route, children }) {
// //   const { user, isLoading = true } = useUser();

// //   if (isLoading) {
// //     return <div>Loading...</div>;
// //   }
// //   const currentUser = user?.data?.data?.data || null;

// //   if (!currentUser) {
// //     return <Navigate to="/login" replace />;
// //   }

// //   if (route.role) {
// //     if (currentUser.role !== route.role) {
// //       return <Navigate to="/unauthorized" replace />;
// //     }
// //     if (route.status && currentUser.status !== route.status) {
// //       return handleStatusRedirect(currentUser.status);
// //     }
// //     if (route.visibility && !route.visibility.includes(currentUser.status)) {
// //       return handleStatusRedirect(currentUser.status);
// //     }
// //   } else if (route.ability === "seller" && currentUser.role !== "seller") {
// //     return <Navigate to="unauthorized" replace />;
// //   }

// //   return <Suspense fallback={null}>{children}</Suspense>;
// // }
// // function handleStatusRedirect(status) {
// //   switch (status) {
// //     case "pending":
// //       return <Navigate to="/seller/account-pending" replace />;
// //     case "inactive":
// //       return <Navigate to="/seller/account-deactive" replace />;
// //     default:
// //       return <Navigate to="/unauthorized" replace />;
// //   }
// // }

// // const MemoizedProtectedRoutes = memo(ProtectedRoutes);
// // export default MemoizedProtectedRoutes;
