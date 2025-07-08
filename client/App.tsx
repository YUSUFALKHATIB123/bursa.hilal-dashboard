import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import OrdersManagement from "./pages/OrdersManagement";
import TrackOrder from "./pages/TrackOrder";
import FinancialDashboard from "./pages/FinancialDashboard";
import Customers from "./pages/Customers";
import Invoices from "./pages/Invoices";
import Inventory from "./pages/Inventory";
import Employees from "./pages/Employees";
import Notifications from "./pages/Notifications";
import Suppliers from "./pages/Suppliers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/orders" element={<OrdersManagement />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/track-order/:orderId" element={<TrackOrder />} />
            <Route path="/financial" element={<FinancialDashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
