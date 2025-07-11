import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Index from "./pages/Index";
import OrdersManagement from "./pages/OrdersManagement";
import TrackOrder from "./pages/TrackOrder";
import TrackOrderDetails from "./pages/TrackOrderDetails";
import Customers from "./pages/Customers";
import Invoices from "./pages/Invoices";
import Inventory from "./pages/Inventory";
import Employees from "./pages/Employees";
import Notifications from "./pages/Notifications";
import FinancialDashboard from "./pages/FinancialDashboard";
import Suppliers from "./pages/Suppliers";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <NotificationProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route
                          path="/orders"
                          element={
                            <ProtectedRoute permission="orders">
                              <OrdersManagement />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/track-order"
                          element={
                            <ProtectedRoute permission="track-order">
                              <TrackOrder />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/track-order/:orderId/details"
                          element={
                            <ProtectedRoute permission="track-order">
                              <TrackOrderDetails />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/customers"
                          element={
                            <ProtectedRoute permission="customers">
                              <Customers />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/invoices"
                          element={
                            <ProtectedRoute permission="invoices">
                              <Invoices />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/inventory"
                          element={
                            <ProtectedRoute permission="inventory">
                              <Inventory />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/employees"
                          element={
                            <ProtectedRoute permission="employees">
                              <Employees />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/notifications"
                          element={
                            <ProtectedRoute permission="notifications">
                              <Notifications />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/financial"
                          element={
                            <ProtectedRoute permission="financial">
                              <FinancialDashboard />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/suppliers"
                          element={
                            <ProtectedRoute permission="suppliers">
                              <Suppliers />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/settings"
                          element={
                            <ProtectedRoute permission="admin">
                              <Settings />
                            </ProtectedRoute>
                          }
                        />
                      </Routes>
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </NotificationProvider>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}
