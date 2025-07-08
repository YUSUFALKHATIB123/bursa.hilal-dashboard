import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Users,
  FileText,
  Package,
  UserCheck,
  Bell,
  TrendingUp,
  Building2,
  ArrowRight,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const dashboardCards = [
  {
    title: { en: "Orders Management", ar: "إدارة الطلبات" },
    description: {
      en: "View, add, track, and manage customer orders",
      ar: "عرض وإضافة وتتبع وإدارة طلبات العملاء",
    },
    icon: ShoppingCart,
    path: "/orders",
    color: "from-blue-500 to-blue-600",
    stats: "142",
  },
  {
    title: { en: "Customers", ar: "العملاء" },
    description: {
      en: "Detailed profiles, order history, and contact info",
      ar: "ملفات تعريف مفصلة وتاريخ الطلبات ومعلومات الاتصال",
    },
    icon: Users,
    path: "/customers",
    color: "from-purple-500 to-purple-600",
    stats: "89",
  },
  {
    title: { en: "Invoices", ar: "الفواتير" },
    description: {
      en: "Upload, archive invoices and track payment status",
      ar: "تحميل وأرشفة الفواتير وتتبع حالة الدفع",
    },
    icon: FileText,
    path: "/invoices",
    color: "from-green-500 to-green-600",
    stats: "23",
  },
  {
    title: { en: "Inventory", ar: "المخزون" },
    description: {
      en: "Manage stock by fabric type/color with alerts",
      ar: "إدارة المخزون حسب نوع ولون القماش مع التنبيهات",
    },
    icon: Package,
    path: "/inventory",
    color: "from-orange-500 to-orange-600",
    stats: "567",
  },
  {
    title: { en: "Employees & Tasks", ar: "الموظفين والمهام" },
    description: {
      en: "Track salaries, payments, and daily assignments",
      ar: "تتبع الرواتب والمدفوعات والمهام اليومية",
    },
    icon: UserCheck,
    path: "/employees",
    color: "from-indigo-500 to-indigo-600",
    stats: "34",
  },
  {
    title: { en: "Smart Notifications", ar: "الإشعارات الذكية" },
    description: {
      en: "System alerts for delays, low stock, pending tasks",
      ar: "تنبيهات النظام للتأخير ونقص المخزون والمهام المعلقة",
    },
    icon: Bell,
    path: "/notifications",
    color: "from-red-500 to-red-600",
    stats: "12",
  },
  {
    title: { en: "Financial Dashboard", ar: "لوحة المالية" },
    description: {
      en: "Earnings, expenses, profit/loss with charts",
      ar: "الأرباح والمصروفات والربح/��لخسارة مع المخططات",
    },
    icon: TrendingUp,
    path: "/financial",
    color: "from-teal-500 to-teal-600",
    stats: "$45.2K",
  },
  {
    title: { en: "Supplier Management", ar: "إدارة الموردين" },
    description: {
      en: "Manage external factories with files and ratings",
      ar: "إدارة المصانع الخارجية مع الملفات والتقييمات",
    },
    icon: Building2,
    path: "/suppliers",
    color: "from-pink-500 to-pink-600",
    stats: "15",
  },
];

const quickStats = [
  {
    label: { en: "Today's Orders", ar: "طلبات اليوم" },
    value: 12,
    change: "+8%",
    icon: ShoppingCart,
    color: "text-blue-600 bg-blue-100",
  },
  {
    label: { en: "Total Revenue", ar: "إجمالي الإيرادات" },
    value: 45200,
    change: "+12%",
    icon: DollarSign,
    color: "text-green-600 bg-green-100",
  },
  {
    label: { en: "Pending Tasks", ar: "المهام المعلقة" },
    value: 8,
    change: "-3%",
    icon: AlertTriangle,
    color: "text-orange-600 bg-orange-100",
  },
  {
    label: { en: "Completed Orders", ar: "الطلبات المكتملة" },
    value: 134,
    change: "+5%",
    icon: CheckCircle,
    color: "text-green-600 bg-green-100",
  },
];

function AnimatedCounter({
  value,
  duration = 2000,
  suffix = "",
}: {
  value: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Index() {
  const [language] = useState<"en" | "ar">("en");

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-primary to-green-secondary text-white rounded-2xl p-8"
      >
        <h1 className="text-4xl font-bold mb-2">
          {language === "ar"
            ? "مرحباً بك في بورصة هلال"
            : "Welcome to Bursa Hilal"}
        </h1>
        <p className="text-green-100 text-lg">
          {language === "ar"
            ? "نظام إدارة المصنع المتكامل"
            : "Comprehensive Factory Management System"}
        </p>
        <div className="mt-4 flex items-center space-x-2 text-green-100">
          <Calendar className="w-5 h-5" />
          <span>
            {new Date().toLocaleDateString(
              language === "ar" ? "ar-EG" : "en-US",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              },
            )}
          </span>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">
                  {stat.label[language]}
                </p>
                <div className="text-2xl font-bold text-gray-900 animate-counter">
                  {typeof stat.value === "number" && stat.value > 100 ? (
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.value > 1000 ? "K" : ""}
                    />
                  ) : (
                    <AnimatedCounter value={stat.value} />
                  )}
                </div>
                <span
                  className={`text-sm ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                >
                  {stat.change}
                </span>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardCards.map((card, index) => (
          <motion.div
            key={card.path}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group"
          >
            <Link to={card.path}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full hover:shadow-lg transition-all duration-300 overflow-hidden relative">
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-br ${card.color} text-white`}
                    >
                      <card.icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {card.stats}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-primary transition-colors">
                    {card.title[language]}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {card.description[language]}
                  </p>

                  <div className="flex items-center text-green-primary group-hover:translate-x-1 transition-transform">
                    <span className="text-sm font-medium mr-2">
                      {language === "ar" ? "فتح" : "Open"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Today's Overview Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {language === "ar" ? "نظرة عامة على اليوم" : "Today's Overview"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              <AnimatedCounter value={8} />
            </div>
            <p className="text-blue-800 font-medium">
              {language === "ar" ? "طلبات جديدة" : "New Orders"}
            </p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">
              <AnimatedCounter value={15} />
            </div>
            <p className="text-green-800 font-medium">
              {language === "ar" ? "مهام مكتملة" : "Tasks Completed"}
            </p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              <AnimatedCounter value={3} />
            </div>
            <p className="text-orange-800 font-medium">
              {language === "ar" ? "تنبيهات نشطة" : "Active Alerts"}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
