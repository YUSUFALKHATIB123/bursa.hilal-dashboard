import { motion } from "framer-motion";
import { Users, Plus, Search, Filter, Download } from "lucide-react";

export default function Customers() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500">
        <span>Dashboard</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Customers</span>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">
            Manage customer profiles, order history, and contact information
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 sm:mt-0 px-4 py-2 bg-green-primary text-white rounded-lg hover:bg-green-secondary transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Customer</span>
        </motion.button>
      </motion.div>

      {/* Libya Textile Co. Featured Customer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-green-primary to-green-secondary p-6 text-white">
          <h3 className="text-xl font-bold">Featured Customer</h3>
          <p className="text-green-100">Recent high-value order</p>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                LT
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  Libya Textile Co.
                </h4>
                <p className="text-gray-600">Premium Customer</p>
                <p className="text-sm text-gray-500">Member since 2022</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Orders Value</p>
              <p className="text-2xl font-bold text-green-600">$45,000</p>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h5 className="font-semibold text-gray-900 mb-3">Recent Order</h5>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">ORD-001: Jacquard Velvet</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Processing
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <p>Quantity: 1200 meters</p>
                  <p>Colors: Gold, Cream, Beige</p>
                </div>
                <div>
                  <p>Order Date: Jul 07, 2025</p>
                  <p>Current: Sent to Dyeing</p>
                </div>
                <div>
                  <p>Total: $18,000</p>
                  <p>Deposit: $3,000 paid</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Placeholder Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 p-12 text-center"
      >
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Customer Management
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Complete customer database with detailed profiles, order history,
          contact information, and relationship management tools.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <span>Search Customers</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
