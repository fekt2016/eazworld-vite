import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

// Define all protected route prefixes based on your App.js
const PROTECTED_ROUTES = [
  // Order-related

  "/order", // Exact match
  "/order/", // Parent route (matches children)
  "/order/*", // Wildcard: single segment
  "/order/**", // Wildcard: any path
  "/orderItem", // Exact match
  "/orderItem/", // Parent route (matches children)
  // Admin
  "/admin", // Exact
  "/admin/", // Parent

  // Analytics
  "/analytics", // Exact
  "/analytics/", // Parent
  "/analytics/sellers", // Exact
  "/analytics/sellers/", // Parent
  "/analytics/views", // Exact
  "/analytics/*", // Wildcard: any analytics segment

  // User management
  "/users", // Exact
  "/users/", // Parent
  "/account", // Exact
  "/account/", // Parent

  // Content
  "/review", // Exact
  "/review/", // Parent
  "/categories", // Exact
  "/categories/", // Parent

  // Transactions
  "/paymentmethod", // Exact
  "/paymentmethod/", // Parent
  "/payment", // Exact
  "/payment/", // Parent

  // Authentication
  "/auth/me", // Exact
  "/auth/verify", // Exact
  "/auth/", // Parent

  // Seller
  "/seller", // Exact
  "/seller/", // Parent
  "seller/me/products", // Exact match
  "/sellers/*/views",
  "/product/seller", // Exact
  "/product/seller/", // Parent
  "/product", // Exact
  "/product/", // Parent

  // Shopping
  "/cart/item/", // Parent
  "/cart", // Exact
  "/cart/", // Parent
  "/address", // Exact
  "/address/", // Parent
  "/wishlist", // Exact
  "/wishlist/", // Parent

  // Special patterns
  // Wildcard pattern
  // "/api/**", // Any API path
];
// const PROTECTED_ROUTES = [
//   // Order-related
//   // "/order/seller-order",
//   "seller/me/products",
//   "/order",
//   "/order/*",
//   "/orderItem",

//   // Admin
//   "/admin",

//   // Analytics
//   "/analytics",
//   "/analytics/sellers", // Covers all seller analytics routes
//   "/analytics/sellers/*", // Wildcard for any seller analytics sub-routes
//   "/analytics/views",

//   // User management
//   "/users",
//   "/account",

//   // Content
//   "/review",

//   "/categories",

//   // Transactions
//   "/paymentmethod",
//   "/payment",

//   // Authentication
//   "/auth/me",
//   "/auth/verify",

//   // Seller
//   "/seller",
//   "/product/seller",
//   "/product",
//   "/cart/item/",
//   "/cart/item/*",
//   "/cart",
//   "/address",
//   // Shopping

//   "/wishlist",
//   // Special patterns
//   "/sellers/*/views", // Matches /sellers/:sellerId/views
// ];

// Public GET endpoints (no auth token needed)
const PUBLIC_GET_ENDPOINTS = [
  /^\/product$/, // Product list
  /^\/product\/[a-fA-F\d]{24}$/, // MongoDB ID (24 hex chars)
  /^\/product\/\d+$/, // Numeric ID
  /^\/product\/category-counts$/, // Category counts
];

const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 500000,
});
// Helper to extract relative path
const getRelativePath = (url) => {
  // Handle absolute URLs
  if (url.startsWith("http")) {
    try {
      const parsedUrl = new URL(url);
      const baseUrlObj = new URL(baseURL);

      // Remove base path from URL pathname
      let path = parsedUrl.pathname;
      if (path.startsWith(baseUrlObj.pathname)) {
        path = path.substring(baseUrlObj.pathname.length);
      }

      return path;
    } catch (e) {
      console.error("URL parsing error:", e);
      return url;
    }
  }

  // Handle relative URLs
  return url.split("?")[0]; // Remove query params
};

// Normalize path for consistent matching
// const normalizePath = (path) => {
//   if (!path) return "/";

//   // Ensure leading slash
//   let normalized = path.startsWith("/") ? path : `/${path}`;

//   // Remove trailing slashes
//   normalized = normalized.replace(/\/+$/, "");

//   // Handle empty path case
//   return normalized || "/";
// };
const normalizePath = (path) => {
  if (!path) return "/";

  // Remove query string and hash
  let normalized = path.split("?")[0].split("#")[0];

  // Remove trailing slashes
  normalized = normalized.replace(/\/+$/, "");

  // Ensure leading slash
  if (normalized === "") {
    normalized = "/";
  } else if (!normalized.startsWith("/")) {
    normalized = "/" + normalized;
  }

  return normalized;
};

// Helper function to check if a path is protected
// Check if path is protected
// const isPathProtected = (path) => {
//   const normalizedPath = normalizePath(path);

//   return PROTECTED_ROUTES.some((route) => {
//     const normalizedRoute = normalizePath(route);

//     // 1. Check exact match
//     console.log("normalized path", normalizedPath, normalizedRoute);
//     if (normalizedPath === normalizedRoute) return true;

//     // 2. Check wildcard routes ("*" in route)
//     if (normalizedRoute.includes("*")) {
//       const routeRegex = new RegExp(
//         `^${normalizedRoute.replace(/\*/g, "[^/]+")}$`
//       );
//       if (routeRegex.test(normalizedPath)) return true;
//     }

//     // 3. Check prefix matches (parent routes)
//     if (normalizedPath.startsWith(`${normalizedRoute}/`)) return true;

//     return false;
//   });
// };

// Route matching function
const isPathProtected = (path) => {
  const normalizedPath = normalizePath(path);
  console.log("normalized path", normalizedPath);

  const isProtected = PROTECTED_ROUTES.some((route) => {
    // Normalize route to consistent format
    const normalizedRoute = normalizePath(route);

    // 1. Check for exact match
    if (normalizedPath === normalizedRoute) return true;

    // 2. Handle wildcard routes
    if (normalizedRoute.includes("*")) {
      // Convert wildcard pattern to regex
      const regexStr = `^${normalizedRoute
        .replace(/[.+?^${}()|[\]\\]/g, "\\$&") // Escape regex special chars
        .replace(/\*\*/g, ".*") // Handle ** wildcard (any characters)
        .replace(/\*/g, "[^/]+")}$`; // Handle * wildcard (single segment)

      try {
        const routeRegex = new RegExp(regexStr);
        if (routeRegex.test(normalizedPath)) return true;
      } catch (e) {
        console.error(`Invalid route pattern: ${normalizedRoute}`, e);
      }
    }

    // 3. Handle parent routes (trailing slash in config)
    if (route.endsWith("/")) {
      // Match children but not exact parent
      if (
        normalizedPath.startsWith(normalizedRoute) &&
        normalizedPath !== normalizedRoute
      ) {
        return true;
      }
    }

    return false;
  });
  console.log("isProtected", isProtected, normalizedPath);
  return isProtected;
};
const isProtectedRoute = (url) => {
  // Handle relative URLs directly
  if (!url.startsWith("http")) {
    return isPathProtected(url);
  }

  // Process absolute URLs
  try {
    const parsedUrl = new URL(url, baseURL);
    const baseUrlObj = new URL(baseURL);
    let path = parsedUrl.pathname;

    // Remove base path segment
    if (path.startsWith(baseUrlObj.pathname)) {
      path = path.substring(baseUrlObj.pathname.length);
    }

    return isPathProtected(path);
  } catch (e) {
    console.error("URL parsing error:", e);
    return false;
  }
};

// Request interceptor
// Updated request interceptor with debug logs
api.interceptors.request.use((config) => {
  const originalUrl = config.url;
  const relativePath = getRelativePath(originalUrl);
  const normalizedPath = normalizePath(relativePath);

  console.groupCollapsed(
    `[API] ${config.method.toUpperCase()} ${normalizedPath}`
  );
  console.log("Original URL:", originalUrl);
  console.log("Relative Path:", relativePath);
  console.log("Normalized Path:", normalizedPath);

  // Check if it's a public GET request
  const isPublicGet = PUBLIC_GET_ENDPOINTS.some(
    (regex) =>
      regex.test(normalizedPath) && config.method.toLowerCase() === "get"
  );

  console.log("Is Public GET:", isPublicGet);
  console.log(
    "Matched Public Patterns:",
    PUBLIC_GET_ENDPOINTS.filter((regex) => regex.test(normalizedPath))
  );

  if (isPublicGet) {
    console.log("Skipping token for public GET request");
    console.groupEnd();
    return config;
  }

  // Check if route is protected
  const isProtected = isPathProtected(normalizedPath);
  console.log("Is Protected Route:", isProtected);

  if (isProtected) {
    const role = localStorage.getItem("current_role") || "user";
    const tokenKey =
      {
        seller: "seller_token",
        admin: "admin_token",
        user: "token",
      }[role] || "token";

    const token = localStorage.getItem(tokenKey);

    if (token) {
      console.log("Adding token for role:", role);
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["x-user-role"] = role;
      config.roleContext = role;
    } else {
      console.warn("No token found for protected route");
    }
  }

  console.groupEnd();
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`[API] Response: ${response.status} ${response.config.url}`);

    return response;
  },
  (error) => {
    const { config, response } = error;
    console.log("error", config, response);

    // Handle network errors
    if (!response) {
      console.error("Network Error:", error.message);
      return Promise.reject(
        new Error("Network error. Please check your connection.")
      );
    }

    const { status, data } = response;
    console.error("Response error:", status, data);

    // Only handle errors for protected routes
    if (config.url && isProtectedRoute(config.url)) {
      const roleContext = config.roleContext || "user";
      const tokenKey =
        {
          seller: "seller_token",
          admin: "admin_token",
          user: "token",
        }[roleContext] || "token";

      switch (status) {
        case 401: // Unauthorized
          {
            // Check if it's a token refresh scenario
            if (data.message?.includes("expired") && !config._retry) {
              config._retry = true;
              return refreshToken(roleContext)
                .then((newToken) => {
                  // Update request with new token
                  config.headers.Authorization = `Bearer ${newToken}`;
                  // Update storage with new token
                  localStorage.setItem(tokenKey, newToken);
                  return api(config);
                })
                .catch(() => {
                  forceLogout(roleContext, tokenKey);
                  return Promise.reject(error);
                });
            }

            // Only logout if not already on login page
            // const loginPaths = {
            //   seller: "/seller/login",
            //   admin: "/admin/login",
            //   user: "/login",
            // };

            // const loginPath = loginPaths[roleContext] || "/login";

            // if (!window.location.pathname.startsWith(loginPath)) {
            //   forceLogout(roleContext, tokenKey);
            // }
          }
          break;

        case 403: // Forbidden
          // Handle account status-specific redirects
          if (roleContext === "seller" && data.status) {
            console.warn("Seller account status:", data.status);

            // handleSellerStatusRedirect(data.status);
          } else {
            // Generic unauthorized access
            // window.location.href = "/unauthorized";
          }
          break;

        case 404: // Not Found
          console.log("Resource not found:", config.url);
          break;

        case 500: // Server Error
          console.error("Server error for:", config.url);
          break;

        default:
          console.warn(`Request failed with status ${status} for:`, config.url);
      }
    }

    return Promise.reject(error);
  }
);

// Helper functions
const refreshToken = async (role) => {
  const refreshToken = localStorage.getItem(`${role}_refresh_token`);
  if (!refreshToken) throw new Error("No refresh token");

  const response = await api.post(`api/v1/${role}/refresh-token`, {
    refreshToken,
  });
  return response.data.token;
};

const forceLogout = (role, tokenKey) => {
  // Remove current role and specific token
  localStorage.removeItem("current_role");
  localStorage.removeItem(tokenKey);

  // Clear all cookies to be safe
  document.cookie =
    "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "seller_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Redirect
  const loginPaths = {
    seller: "/seller/login",
    admin: "/admin/login",
    user: "/login",
  };

  const loginPath = loginPaths[role] || "/login";

  setTimeout(() => {
    window.location.href = loginPath;
  }, 100);
};

// const handleSellerStatusRedirect = (status) => {
//   const redirectPaths = {
//     pending: "/seller/dashboard/account-pending",
//     deactive: "/seller/dashboard/account-deactive",
//     review: "/seller/dashboard/account-review",
//     suspended: "/seller/dashboard/account-suspended",
//   };

//   const path = redirectPaths[status];
//   console.log("Redirecting to:", path);
//   if (window.location.pathname !== path) {
//     window.location.href = path || "/login";
//   }
// };

export default api;
