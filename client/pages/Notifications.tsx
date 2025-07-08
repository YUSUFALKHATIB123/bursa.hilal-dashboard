import { motion } from "framer-motion";
import { Bell, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export default function Notifications() {
  return (
    <div className="space-y-6">
      <nav className="flex text-sm text-gray-500">
        <span>Dashboard</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Smart Notifications</span>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Smart Notifications
          </h1>
          <p className="text-gray-600 mt-1">
            System alerts for delays, low stock, and pending tasks
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 p-12 text-center"
      >
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bell className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Smart Notifications
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Intelligent alerts and notifications for system events, delays, low
          stock, and pending tasks.
        </p>
      </motion.div>
    </div>
  );
}
