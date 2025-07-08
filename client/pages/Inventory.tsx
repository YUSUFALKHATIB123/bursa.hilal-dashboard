import { useState } from "react";
import { motion } from "framer-motion";
import AddStockModal from "../components/AddStockModal";
import { Package, Plus, AlertTriangle, TrendingDown } from "lucide-react";

export default function Inventory() {
  const [showAddStockModal, setShowAddStockModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500">
        <span>Dashboard</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Inventory</span>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
          <p className="text-gray-600 mt-1">
            Manage stock by fabric type/color with low stock alerts
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddStockModal(true)}
          className="mt-4 sm:mt-0 px-4 py-2 bg-green-primary text-white rounded-lg hover:bg-green-secondary transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Stock</span>
        </motion.button>
      </motion.div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-200 rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-800 font-medium">Low Stock Alert</p>
              <p className="text-3xl font-bold text-red-600">12</p>
              <p className="text-red-600 text-sm">Items below threshold</p>
            </div>
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-800 font-medium">Total Items</p>
              <p className="text-3xl font-bold text-blue-600">567</p>
              <p className="text-blue-600 text-sm">In stock</p>
            </div>
            <Package className="w-12 h-12 text-blue-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-orange-50 border border-orange-200 rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-800 font-medium">Stock Value</p>
              <p className="text-3xl font-bold text-orange-600">$89.2K</p>
              <p className="text-orange-600 text-sm">Total inventory value</p>
            </div>
            <TrendingDown className="w-12 h-12 text-orange-500" />
          </div>
        </motion.div>
      </div>

      {/* Placeholder Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 p-12 text-center"
      >
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Inventory Management
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          This page will contain detailed inventory tracking by fabric type and
          color, automated low stock alerts, and inventory valuation reports.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[
            "Cotton - White",
            "Silk - Blue",
            "Wool - Gray",
            "Linen - Beige",
          ].map((fabric, index) => (
            <div
              key={fabric}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <h4 className="font-medium text-gray-900">{fabric}</h4>
              <p className="text-sm text-gray-600 mt-1">45 yards</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${75 - index * 15}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
