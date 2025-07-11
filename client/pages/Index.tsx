import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import systemData from "../data/systemData";
import { verifyDataConsistency } from "../utils/dataConsistency";
import {
  ShoppingCart,
  Users,
  Package,
  UserCheck,
  Bell,
  TrendingUp,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Target,
  Activity,
} from "lucide-react";

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

function RoleBasedCard({
  title,
  description,
  icon: Icon,
  value,
  color,
  trend,
}: {
  title: string;
  description: string;
  icon: any;
  value: string | number;
  color: string;
  trend?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {typeof value === "number" ? (
              <AnimatedCounter value={value} />
            ) : (
              value
            )}
          </div>
          {trend && (
            <div
              className={`text-sm ${trend.startsWith("+") ? "text-green-600" : "text-red-600"}`}
            >
              {trend}
            </div>
          )}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
}

export default function Index() {
  const { language, t } = useLanguage();
  const { user } = useAuth();

  // Calculate real-time stats from system data
  const todayOrders = systemData.orders.filter(
    (order) => order.date === "2025-01-15",
  ).length;

  const processingOrders = systemData.orders.filter(
    (order) => order.status === "processing",
  ).length;

  const completedOrders = systemData.orders.filter(
    (order) => order.status === "completed",
  ).length;

  const lowStockItems = systemData.inventory.filter(
    (item) => item.quantity < 1000,
  ).length;

  const activeAlerts = systemData.notifications.filter(
    (notif) => notif.priority === "high",
  ).length;

  const totalRevenue = systemData.financials.revenue;
  const pendingPayments = systemData.orders
    .filter((order) => order.status !== "completed")
    .reduce((sum, order) => sum + order.total, 0);

  const unpaidSalaries = systemData.employees.reduce(
    (sum, emp) => sum + (emp.salary - emp.paid),
    0,
  );

  // Role-based dashboard content
  const getDashboardContent = () => {
    switch (user?.role) {
      case "admin":
      case "owner":
        return [
          {
            title: language === "ar" ? "إجمالي الطلبات" : "Total Orders",
            description:
              language === "ar"
                ? "جميع الطلبات في النظام"
                : "All orders in system",
            icon: ShoppingCart,
            value: systemData.orders.length,
            color: "bg-blue-500",
            trend: "+12%",
          },
          {
            title: language === "ar" ? "إجمالي الإيرادات" : "Total Revenue",
            description:
              language === "ar" ? "الإيرادات الشهرية" : "Monthly revenue",
            icon: DollarSign,
            value: `$${(totalRevenue / 1000).toFixed(1)}K`,
            color: "bg-green-500",
            trend: "+18%",
          },
          {
            title: language === "ar" ? "المخزون المنخفض" : "Low Stock Items",
            description:
              language === "ar"
                ? "عناصر تحتاج إع��دة تموين"
                : "Items need restocking",
            icon: AlertTriangle,
            value: lowStockItems,
            color: "bg-orange-500",
            trend: lowStockItems > 0 ? "Alert" : "Good",
          },
          {
            title: language === "ar" ? "التنبيهات ��لنشطة" : "Active Alerts",
            description:
              language === "ar"
                ? "تنبيهات عالية الأولوية"
                : "High priority alerts",
            icon: Bell,
            value: activeAlerts,
            color: "bg-red-500",
            trend: activeAlerts > 0 ? "Action needed" : "All clear",
          },
          {
            title:
              language === "ar" ? "الطلبات قيد التنفيذ" : "Processing Orders",
            description:
              language === "ar"
                ? "طلبات في مراحل الإنتاج"
                : "Orders in production",
            icon: Clock,
            value: processingOrders,
            color: "bg-purple-500",
            trend: "+5%",
          },
          {
            title: language === "ar" ? "الموظفون النشطون" : "Active Employees",
            description:
              language === "ar"
                ? "موظفون في العمل اليوم"
                : "Employees working today",
            icon: UserCheck,
            value: systemData.employees.length,
            color: "bg-indigo-500",
            trend: "100%",
          },
        ];

      case "accountant":
        return [
          {
            title: language === "ar" ? "إجمالي الإيرادات" : "Total Revenue",
            description:
              language === "ar" ? "الإيرادات الشهرية" : "Monthly revenue",
            icon: DollarSign,
            value: `$${(totalRevenue / 1000).toFixed(1)}K`,
            color: "bg-green-500",
            trend: "+18%",
          },
          {
            title: language === "ar" ? "المدفوعات المعلقة" : "Pending Payments",
            description:
              language === "ar"
                ? "مدفوعات في انتظار التحصيل"
                : "Payments awaiting collection",
            icon: Clock,
            value: `$${(pendingPayments / 1000).toFixed(1)}K`,
            color: "bg-orange-500",
            trend: "Due",
          },
          {
            title: language === "ar" ? "الفواتير اليوم" : "Today's Invoices",
            description:
              language === "ar"
                ? "فواتير مُصدرة اليوم"
                : "Invoices issued today",
            icon: FileText,
            value: 3,
            color: "bg-blue-500",
            trend: "+2",
          },
          {
            title: language === "ar" ? "رواتب معلقة" : "Unpaid Salaries",
            description:
              language === "ar"
                ? "مبالغ رواتب غير مدفوعة"
                : "Outstanding salary amounts",
            icon: AlertTriangle,
            value: `$${(unpaidSalaries / 1000).toFixed(1)}K`,
            color: "bg-red-500",
            trend: "Pay due",
          },
        ];

      case "production":
        return [
          {
            title:
              language === "ar" ? "طلبات للإنتاج" : "Orders for Production",
            description:
              language === "ar" ? "طلبات جاهزة للبدء" : "Orders ready to start",
            icon: Target,
            value: processingOrders,
            color: "bg-blue-500",
            trend: "Priority",
          },
          {
            title: language === "ar" ? "مراحل الإنتاج" : "Production Stages",
            description:
              language === "ar"
                ? "مراحل نشطة حاليًا"
                : "Currently active stages",
            icon: Activity,
            value: 8,
            color: "bg-purple-500",
            trend: "Active",
          },
          {
            title: language === "ar" ? "المخزون المطلوب" : "Required Stock",
            description:
              language === "ar" ? "مواد ��ام مطلوبة" : "Raw materials needed",
            icon: Package,
            value: 5,
            color: "bg-orange-500",
            trend: "Check",
          },
          {
            title: language === "ar" ? "معدات الإنتاج" : "Production Equipment",
            description:
              language === "ar"
                ? "معدات جاهزة للعمل"
                : "Equipment ready for work",
            icon: CheckCircle,
            value: 12,
            color: "bg-green-500",
            trend: "Ready",
          },
        ];

      default:
        return [
          {
            title: language === "ar" ? "المهام اليوم" : "Today's Tasks",
            description:
              language === "ar"
                ? "مهام مُحددة لك اليوم"
                : "Tasks assigned to you today",
            icon: CheckCircle,
            value: 4,
            color: "bg-blue-500",
            trend: "2 completed",
          },
          {
            title: language === "ar" ? "الإنجاز الأسبوعي" : "Weekly Progress",
            description:
              language === "ar"
                ? "نسبة إنجاز المهام هذا الأسبوع"
                : "Task completion rate this week",
            icon: TrendingUp,
            value: "87%",
            color: "bg-green-500",
            trend: "+5%",
          },
        ];
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-primary to-green-secondary text-white rounded-2xl p-8"
      >
        <h1 className="text-4xl font-bold mb-2">
          {`${t("welcome")} ${user?.name.split(" ")[0]}`}
        </h1>
        <p className="text-green-100 text-lg">
          {language === "ar"
            ? `لوحة التحكم الذكية - ${user?.role === "admin" ? "مدير النظام" : user?.role === "owner" ? "مالك الشركة" : user?.role === "accountant" ? "محاسب" : user?.role === "production" ? "مدير الإنتاج" : "مساعد مدير"}`
            : `Smart Dashboard - ${user?.role === "admin" ? "System Administrator" : user?.role === "owner" ? "Company Owner" : user?.role === "accountant" ? "Accountant" : user?.role === "production" ? "Production Manager" : "Assistant Manager"}`}
        </p>
        <div
          className={`mt-4 flex items-center ${language === "ar" ? "space-x-reverse space-x-2" : "space-x-2"} text-green-100`}
        >
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

      {/* Role-based Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getDashboardContent().map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <RoleBasedCard {...card} />
          </motion.div>
        ))}
      </div>

      {/* Today's Overview - Real Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {t("todaysOverview")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              <AnimatedCounter value={todayOrders} />
            </div>
            <p className="text-blue-800 font-medium">{t("newOrders")}</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">
              <AnimatedCounter value={completedOrders} />
            </div>
            <p className="text-green-800 font-medium">
              {t("completed")} {t("ordersManagement")}
            </p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              <AnimatedCounter value={activeAlerts} />
            </div>
            <p className="text-orange-800 font-medium">{t("activeAlerts")}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
