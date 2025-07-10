import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  FileText,
  Package,
  UserCheck,
  Bell,
  TrendingUp,
  Building2,
  MapPin,
} from "lucide-react";

interface SidebarProps {
  onItemClick?: () => void;
}

const menuItems = [
  {
    path: "/",
    icon: LayoutDashboard,
    label: { en: "Dashboard", ar: "لوحة التحكم" },
    permission: "*", // Always visible
  },
  {
    path: "/orders",
    icon: ShoppingCart,
    label: { en: "Orders Management", ar: "إدارة الطلبات" },
    permission: "orders",
  },
  {
    path: "/track-order",
    icon: MapPin,
    label: { en: "Track Order", ar: "تتبع الطلبات" },
    permission: "track-order",
  },
  {
    path: "/customers",
    icon: Users,
    label: { en: "Customers", ar: "العملاء" },
    permission: "customers",
  },
  {
    path: "/invoices",
    icon: FileText,
    label: { en: "Invoices", ar: "الفواتير" },
    permission: "invoices",
  },
  {
    path: "/inventory",
    icon: Package,
    label: { en: "Inventory", ar: "المخزون" },
    permission: "inventory",
  },
  {
    path: "/employees",
    icon: UserCheck,
    label: { en: "Employees & Tasks", ar: "الموظفين والمهام" },
    permission: "employees",
  },
  {
    path: "/notifications",
    icon: Bell,
    label: { en: "Smart Notifications", ar: "الإشعارات الذكية" },
    permission: "notifications",
  },
  {
    path: "/financial",
    icon: TrendingUp,
    label: { en: "Financial Dashboard", ar: "لوحة المالية" },
    permission: "financial",
  },
  {
    path: "/suppliers",
    icon: Building2,
    label: { en: "Supplier Management", ar: "إدارة الموردين" },
    permission: "suppliers",
  },
];

export default function Sidebar({ onItemClick }: SidebarProps) {
  const { hasPermission } = useAuth();
  const { language } = useLanguage();

  const visibleMenuItems = menuItems.filter(
    (item) => item.permission === "*" || hasPermission(item.permission),
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-64 bg-white shadow-lg border-r border-gray-200 h-full flex flex-col relative z-10"
      style={{
        touchAction: "pan-y",
        WebkitOverflowScrolling: "touch",
        minWidth: "256px",
      }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className={`flex items-center ${language === "ar" ? "space-x-reverse space-x-3" : "space-x-3"}`}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-green-primary to-green-secondary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">BH</span>
          </div>
          <div className={language === "ar" ? "rtl-content" : ""}>
            <h1 className="text-xl font-bold text-gray-900">
              {language === "ar" ? "بورصة هلال" : "Bursa Hilal"}
            </h1>
            <p className="text-sm text-gray-500">
              {language === "ar" ? "نظام إدارة المصنع" : "Factory Management"}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 p-4 space-y-2 overflow-y-auto"
        style={{
          touchAction: "pan-y",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {visibleMenuItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ x: language === "ar" ? 50 : -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
          >
            <NavLink
              to={item.path}
              onClick={(e) => {
                // Close sidebar immediately on mobile for better UX
                if (onItemClick) {
                  onItemClick();
                }
                // Let React Router handle navigation normally
              }}
              onTouchStart={(e) => {
                // Prevent iOS double-tap zoom
                e.currentTarget.style.backgroundColor =
                  e.currentTarget.classList.contains("bg-gradient-to-r")
                    ? ""
                    : "#f3f4f6";
              }}
              onTouchEnd={(e) => {
                // Reset background after touch
                setTimeout(() => {
                  if (!e.currentTarget.classList.contains("bg-gradient-to-r")) {
                    e.currentTarget.style.backgroundColor = "";
                  }
                }, 150);
              }}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-150 group select-none cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-green-primary to-green-secondary text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 hover:text-green-primary active:bg-green-50"
                } ${language === "ar" ? "flex-row-reverse space-x-reverse" : ""}`
              }
              style={{
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
                WebkitTouchCallout: "none",
                WebkitUserSelect: "none",
                userSelect: "none",
                cursor: "pointer",
                minHeight: "48px", // Ensure adequate touch target
              }}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label[language]}</span>

              {/* Active indicator */}
              <motion.div
                className="ml-auto w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
              />
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-xs text-gray-500"
        >
          {language === "ar" ? "الإصدار 1.0.0" : "Version 1.0.0"}
        </motion.div>
      </div>
    </motion.div>
  );
}
