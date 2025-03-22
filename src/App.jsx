import Router from "./Router/Router";
import publicRoutes from "./Router/routes/publicRoutes";

function App() {
  const publicRoutePath = publicRoutes;

  return <Router allRoutes={publicRoutePath} />;
}

export default App;
