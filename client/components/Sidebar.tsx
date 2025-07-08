import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
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
} from "lucide-react";

interface SidebarProps {
  language: "en" | "ar";
}

const menuItems = [
  {
    path: "/",
    icon: LayoutDashboard,
    label: { en: "Dashboard", ar: "لوحة التحكم" },
  },
  {
    path: "/orders",
    icon: ShoppingCart,
    label: { en: "Orders Management", ar: "إدارة الطلبات" },
  },
  {
    path: "/customers",
    icon: Users,
    label: { en: "Customers", ar: "العملاء" },
  },
  {
    path: "/invoices",
    icon: FileText,
    label: { en: "Invoices", ar: "الفواتير" },
  },
  {
    path: "/inventory",
    icon: Package,
    label: { en: "Inventory", ar: "المخزون" },
  },
  {
    path: "/employees",
    icon: UserCheck,
    label: { en: "Employees & Tasks", ar: "الموظفين والمهام" },
  },
  {
    path: "/notifications",
    icon: Bell,
    label: { en: "Smart Notifications", ar: "الإشعارات الذكية" },
  },
  {
    path: "/financial",
    icon: TrendingUp,
    label: { en: "Financial Dashboard", ar: "لوحة المالية" },
  },
  {
    path: "/suppliers",
    icon: Building2,
    label: { en: "Supplier Management", ar: "إدارة الموردين" },
  },
];

export default function Sidebar({ language }: SidebarProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-72 bg-white shadow-xl border-r border-gray-200 h-screen"
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-green-primary to-green-secondary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">BH</span>
          </div>
          <div>
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
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ x: language === "ar" ? 50 : -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-green-primary to-green-secondary text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 hover:text-green-primary"
                }`
              }
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
      <div className="absolute bottom-4 left-4 right-4">
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
