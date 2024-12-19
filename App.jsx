import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";

// import Campaign from "./pages/Campaign";
import Login from "./pages/Login";
import History from "./pages/History";
import Agents from "./pages/Agent/Agents";
import Subscription from "./pages/Subscription";
import Customer from "./pages/Customer";
import PrivateRoute from "./components/Auth/PrivateRoute";
import AreaMapping from "./pages/AreaMapping";
import Routing from "./pages/Routing";
import Dashboard from "./pages/Dashboard";
import Aniket from "./pages/Aniket";
import CustomerExecutive from "./pages/CustomerExecutive";
import FormData from "./pages/FormData";
import PortalDashboard from "./pages/PortalDashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route index path="/" element={<Navigate to="/login" />} />
          <Route index path="/aniket" element={<Aniket/>} />
          <Route index path="/customer-executive" element={<CustomerExecutive/>} />
          <Route index path="/form-data" element={<FormData/>} />
          <Route index path="/portal-dashboard" element={<PortalDashboard />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/subscription"
            element={
              <PrivateRoute>
                <Subscription />
              </PrivateRoute>
            }
          />

          <Route
            path="/customer/credit"
            element={
              <PrivateRoute>
                <Customer />
              </PrivateRoute>
            }
          />

          <Route
            path="/routing"
            element={
              <PrivateRoute>
                <Routing />
              </PrivateRoute>
            }
          />

          <Route
            path="/history"
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />
          <Route
            path="/agents"
            element={
              <PrivateRoute>
                <Agents />
              </PrivateRoute>
            }
          />

          <Route
            path="/AreaMapping"
            element={
              <PrivateRoute>
                <AreaMapping />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
