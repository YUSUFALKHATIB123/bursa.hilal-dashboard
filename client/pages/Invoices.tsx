import { motion } from "framer-motion";
import { FileText, Plus, Upload, Download } from "lucide-react";

export default function Invoices() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500">
        <span>Dashboard</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Invoices</span>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600 mt-1">
            Upload, archive invoices and track payment status
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => alert("Upload invoice file - Coming soon!")}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Invoice</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => alert("Create new invoice - Coming soon!")}
            className="px-4 py-2 bg-green-primary text-white rounded-lg hover:bg-green-secondary transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Invoice</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Placeholder Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 p-12 text-center"
      >
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Invoice Management
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          This page will contain invoice upload functionality, payment status
          tracking (Paid/Partial/Unpaid), and invoice archival system.
        </p>
        <div className="flex justify-center space-x-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">23</div>
            <p className="text-green-800 text-sm">Paid</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">8</div>
            <p className="text-yellow-800 text-sm">Partial</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">5</div>
            <p className="text-red-800 text-sm">Unpaid</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
