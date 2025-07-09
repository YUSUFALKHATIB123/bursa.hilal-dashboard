import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useNotifications } from "../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Globe,
  ChevronDown,
  Package,
  DollarSign,
  AlertTriangle,
  UserCheck,
} from "lucide-react";

interface NavbarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Navbar({ sidebarOpen, toggleSidebar }: NavbarProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  // Close menus when clicking outside
  const handleClickOutside = () => {
    setUserMenuOpen(false);
    setNotificationsOpen(false);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return Package;
      case "payment":
        return DollarSign;
      case "inventory":
        return AlertTriangle;
      case "employee":
        return UserCheck;
      default:
        return Bell;
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else {
      return `${hours} hours ago`;
    }
  };

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
    setNotificationsOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-sm border-b border-gray-200 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </motion.button>

          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={language === "ar" ? "بحث..." : "Search..."}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent w-80"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Language toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-1"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">
              {language === "ar" ? "عربي" : "EN"}
            </span>
          </motion.button>

          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setNotificationsOpen(!notificationsOpen);
              }}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-medium"
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </motion.span>
              )}
            </motion.button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-40"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">
                      Notifications
                    </h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-8 text-center text-gray-500">
                        <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No notifications</p>
                      </div>
                    ) : (
                      notifications.slice(0, 6).map((notification) => {
                        const IconComponent = getNotificationIcon(
                          notification.type,
                        );
                        return (
                          <div
                            key={notification.id}
                            onClick={() =>
                              handleNotificationClick(notification)
                            }
                            className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-4 ${
                              notification.read
                                ? "border-transparent bg-white"
                                : notification.priority === "high"
                                  ? "border-red-400 bg-red-50"
                                  : notification.priority === "medium"
                                    ? "border-yellow-400 bg-yellow-50"
                                    : "border-blue-400 bg-blue-50"
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div
                                className={`p-1 rounded-full ${
                                  notification.type === "order"
                                    ? "bg-blue-100"
                                    : notification.type === "payment"
                                      ? "bg-green-100"
                                      : notification.type === "inventory"
                                        ? "bg-orange-100"
                                        : notification.type === "employee"
                                          ? "bg-purple-100"
                                          : "bg-gray-100"
                                }`}
                              >
                                <IconComponent className="w-3 h-3 text-gray-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-sm font-medium ${
                                    notification.read
                                      ? "text-gray-600"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {notification.title}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {getTimeAgo(notification.timestamp)}
                                </p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  {notifications.length > 6 && (
                    <div className="px-4 py-2 border-t border-gray-200">
                      <button
                        onClick={() => {
                          navigate("/notifications");
                          setNotificationsOpen(false);
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        View all {notifications.length} notifications
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User menu */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                setUserMenuOpen(!userMenuOpen);
              }}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-primary to-green-secondary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">{user?.name || "User"}</p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.role || "Role"}
                </p>
              </div>
              <ChevronDown className="w-4 h-4" />
            </motion.button>

            {/* Dropdown menu */}
            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-40"
                  onClick={(e) => e.stopPropagation()}
                >
                  {user?.email === "yusuf@bursahilal.com" && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Profile page - Coming soon!");
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                      >
                        <User className="w-4 h-4" />
                        <span>
                          {language === "ar" ? "الملف الشخصي" : "Profile"}
                        </span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Settings page - Coming soon!");
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                      >
                        <Settings className="w-4 h-4" />
                        <span>
                          {language === "ar" ? "الإعدادات" : "Settings"}
                        </span>
                      </button>
                    </>
                  )}
                  <hr className="my-1" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLogout();
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{language === "ar" ? "تسجيل الخروج" : "Logout"}</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Overlay to close menus when clicking outside */}
      {(notificationsOpen || userMenuOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setNotificationsOpen(false);
            setUserMenuOpen(false);
          }}
        />
      )}
    </motion.header>
  );
}
