import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { setupPersistor } from "./utils/cachePersistor";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";

import SubdomainRouter from "./Router/subDomainRouter/SubDomainRouter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 15,
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
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
          <SubdomainRouter />
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
