import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { Link } from "react-router-dom";
import systemData from "../data/systemData";
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Package,
  Users,
  UserCheck,
  Filter,
  Search,
  Check,
  CheckCheck,
  ExternalLink,
  X,
} from "lucide-react";

interface SmartNotification {
  id: string;
  title: { en: string; ar: string };
  message: { en: string; ar: string };
  type: "invoice_due" | "low_stock" | "order_update" | "employee_absent" | "payment_received" | "customer_added";
  category: "financial" | "inventory" | "production" | "hr" | "sales";
  priority: "low" | "medium" | "high";
  timestamp: Date;
  read: boolean;
  actionUrl: string;
  relatedEntityId: string;
  icon: string;
}

const categoryConfig = {
  financial: { 
    label: { en: "Financial", ar: "مالي" }, 
    color: "bg-green-100 text-green-800",
    icon: DollarSign
  },
  inventory: { 
    label: { en: "Inventory", ar: "مخزون" }, 
    color: "bg-blue-100 text-blue-800",
    icon: Package
  },
  production: { 
    label: { en: "Production", ar: "إنتاج" }, 
    color: "bg-purple-100 text-purple-800",
    icon: Clock
  },
  hr: { 
    label: { en: "HR", ar: "موارد بشرية" }, 
    color: "bg-orange-100 text-orange-800",
    icon: UserCheck
  },
  sales: { 
    label: { en: "Sales", ar: "مبيعات" }, 
    color: "bg-indigo-100 text-indigo-800",
    icon: Users
  },
};

const priorityConfig = {
  high: { 
    label: { en: "High Priority", ar: "أولوية عالية" }, 
    color: "bg-red-100 text-red-800 border-red-200",
    icon: "🔴"
  },
  medium: { 
    label: { en: "Medium Priority", ar: "أولوية متوسطة" }, 
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: "🟡"
  },
  low: { 
    label: { en: "Low Priority", ar: "أولوية منخفضة" }, 
    color: "bg-gray-100 text-gray-800 border-gray-200",
    icon: "🟢"
  },
};

function ToastNotification({ notification, onClose }: { notification: SmartNotification, onClose: () => void }) {
  const { language } = useLanguage();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      className="fixed top-4 right-4 z-50 max-w-sm w-full"
    >
      <div className={`bg-white rounded-lg shadow-lg border-l-4 ${
        notification.priority === 'high' ? 'border-red-500' : 
        notification.priority === 'medium' ? 'border-yellow-500' : 'border-green-500'
      } p-4`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${categoryConfig[notification.category].color}`}>
              <categoryConfig[notification.category].icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 text-sm">
                {notification.title[language]}
              </h4>
              <p className="text-gray-600 text-xs mt-1">
                {notification.message[language]}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                {new Date(notification.timestamp).toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Notifications() {
  const { language, t } = useLanguage();
  const [notifications, setNotifications] = useState<SmartNotification[]>(systemData.notifications as SmartNotification[]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const [toastNotifications, setToastNotifications] = useState<SmartNotification[]>([]);

  // Filter notifications
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message[language].toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || notification.category === selectedCategory;
    const matchesPriority =
      selectedPriority === "all" || notification.priority === selectedPriority;
    const matchesReadStatus = !showOnlyUnread || !notification.read;
    
    return matchesSearch && matchesCategory && matchesPriority && matchesReadStatus;
  });

  // Calculate stats
  const totalNotifications = notifications.length;
  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.read).length;
  const todayCount = notifications.filter(n => {
    const today = new Date();
    const notifDate = new Date(n.timestamp);
    return notifDate.toDateString() === today.toDateString();
  }).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const addToastNotification = (notification: SmartNotification) => {
    setToastNotifications(prev => [...prev, notification]);
  };

  const removeToastNotification = (id: string) => {
    setToastNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Check for new system events and generate notifications
      
      // Check for overdue invoices
      const overdueInvoices = systemData.invoices.filter(invoice => 
        invoice.isOverdue && !notifications.some(n => n.relatedEntityId === invoice.id && n.type === 'invoice_due')
      );
      
      overdueInvoices.forEach(invoice => {
        const newNotification: SmartNotification = {
          id: `NOTIF-${Date.now()}-${invoice.id}`,
          title: { en: "Invoice Overdue", ar: "فاتورة متأخرة" },
          message: { 
            en: `Invoice ${invoice.invoiceNumber} is overdue`, 
            ar: `الفاتورة ${invoice.invoiceNumber} متأخرة` 
          },
          type: "invoice_due",
          category: "financial",
          priority: "high",
          timestamp: new Date(),
          read: false,
          actionUrl: "/invoices",
          relatedEntityId: invoice.id,
          icon: "AlertTriangle",
        };
        
        setNotifications(prev => [newNotification, ...prev]);
        addToastNotification(newNotification);
      });

      // Check for low stock
      const lowStockItems = systemData.inventory.filter(item => 
        item.quantity < item.minimumThreshold && 
        !notifications.some(n => n.relatedEntityId === item.id && n.type === 'low_stock')
      );
      
      lowStockItems.forEach(item => {
        const newNotification: SmartNotification = {
          id: `NOTIF-${Date.now()}-${item.id}`,
          title: { en: "Low Stock Alert", ar: "تنبيه انخفاض المخزون" },
          message: { 
            en: `${item.type} ${item.color} is below minimum threshold`, 
            ar: `${item.type} ${item.color} أقل من الحد الأدنى` 
          },
          type: "low_stock",
          category: "inventory",
          priority: "high",
          timestamp: new Date(),
          read: false,
          actionUrl: "/inventory",
          relatedEntityId: item.id,
          icon: "Package",
        };
        
        setNotifications(prev => [newNotification, ...prev]);
        addToastNotification(newNotification);
      });

    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [notifications]);

  const getRelativeTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return language === 'ar' ? 'الآن' : 'Just now';
    if (minutes < 60) return language === 'ar' ? `منذ ${minutes} دقيقة` : `${minutes}m ago`;
    if (hours < 24) return language === 'ar' ? `منذ ${hours} ساعة` : `${hours}h ago`;
    return language === 'ar' ? `منذ ${days} يوم` : `${days}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Toast Notifications */}
      <AnimatePresence>
        {toastNotifications.map((notification) => (
          <ToastNotification
            key={notification.id}
            notification={notification}
            onClose={() => removeToastNotification(notification.id)}
          />
        ))}
      </AnimatePresence>

      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500">
        <span>{t("dashboard")}</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{t("smartNotifications")}</span>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("smartNotifications")}</h1>
          <p className="text-gray-600 mt-1">
            {language === "ar" 
              ? "تنبيهات النظام للتأخير ونقص المخزون والمهام المعلقة"
              : "System alerts for delays, low stock, and pending tasks"
            }
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          {unreadCount > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={markAllAsRead}
              className="px-4 py-2 bg-green-primary text-white rounded-lg hover:bg-green-secondary transition-colors flex items-center space-x-2"
            >
              <CheckCheck className="w-4 h-4" />
              <span>{t("markAllAsRead")}</span>
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "totalNotifications", value: totalNotifications, icon: Bell, color: "blue" },
          { title: "unreadCount", value: unreadCount, icon: AlertTriangle, color: "red" },
          { title: "highPriority", value: highPriorityCount, icon: AlertTriangle, color: "orange" },
          { title: "todayCount", value: todayCount, icon: Clock, color: "green" },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">
                  {stat.title === "totalNotifications" ? (language === "ar" ? "إجمالي الإشعارات" : "Total Notifications") :
                   stat.title === "unreadCount" ? (language === "ar" ? "غير مقروءة" : "Unread") :
                   stat.title === "highPriority" ? (language === "ar" ? "أولوية عالية" : "High Priority") :
                   (language === "ar" ? "اليوم" : "Today")}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100 text-${stat.color}-600`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={language === "ar" ? "بحث في الإشعارات..." : "Search notifications..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent w-64"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent"
            >
              <option value="all">{language === "ar" ? "جميع الفئات" : "All Categories"}</option>
              {Object.entries(categoryConfig).map(([key, config]) => (
                <option key={key} value={key}>{config.label[language]}</option>
              ))}
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent"
            >
              <option value="all">{language === "ar" ? "جميع الأولويات" : "All Priorities"}</option>
              {Object.entries(priorityConfig).map(([key, config]) => (
                <option key={key} value={key}>{config.label[language]}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyUnread}
                onChange={(e) => setShowOnlyUnread(e.target.checked)}
                className="rounded text-green-primary focus:ring-green-primary"
              />
              <span className="text-sm text-gray-700">
                {language === "ar" ? "غير مقروءة فقط" : "Unread only"}
              </span>
            </label>
          </div>
        </div>
      </motion.div>

      {/* Notifications List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {language === "ar" ? "لا توجد إشعارات" : "No notifications found"}
            </h3>
            <p className="text-gray-600">
              {language === "ar" ? "لا توجد إشعارات تطابق المعايير المحددة" : "No notifications match the selected criteria"}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-lg border-2 transition-all duration-300 hover:shadow-md ${
                !notification.read ? priorityConfig[notification.priority].color : 'border-gray-200'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`p-3 rounded-lg ${categoryConfig[notification.category].color}`}>
                      <categoryConfig[notification.category].icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                          {notification.title[language]}
                        </h3>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                        <span className={`text-xs px-2 py-1 rounded-full ${categoryConfig[notification.category].color}`}>
                          {categoryConfig[notification.category].label[language]}
                        </span>
                        <span className="text-xs text-gray-500">
                          {priorityConfig[notification.priority].icon} {priorityConfig[notification.priority].label[language]}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3">
                        {notification.message[language]}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          {getRelativeTime(notification.timestamp)}
                        </span>
                        
                        <div className="flex items-center space-x-2">
                          <Link
                            to={notification.actionUrl}
                            className="inline-flex items-center px-3 py-1 text-sm bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            {language === "ar" ? "عرض" : "View"}
                          </Link>
                          
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="inline-flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                              <Check className="w-3 h-3 mr-1" />
                              {t("markAsRead")}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}