import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Upload, FileText, Calendar, DollarSign } from "lucide-react";

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UploadInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateInvoiceModal({
  isOpen,
  onClose,
}: CreateInvoiceModalProps) {
  const [formData, setFormData] = useState({
    customer: "",
    orderId: "",
    amount: "",
    dueDate: "",
    description: "",
    status: "unpaid",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New invoice:", formData);
    alert("Invoice created successfully!");
    onClose();
    setFormData({
      customer: "",
      orderId: "",
      amount: "",
      dueDate: "",
      description: "",
      status: "unpaid",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-green-primary to-green-secondary text-white">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6" />
                <h2 className="text-xl font-bold">Create New Invoice</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer *
                  </label>
                  <select
                    name="customer"
                    value={formData.customer}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent"
                  >
                    <option value="">Select Customer</option>
                    <option value="Libya Textile Co.">Libya Textile Co.</option>
                    <option value="Ahmed Textiles Ltd.">
                      Ahmed Textiles Ltd.
                    </option>
                    <option value="Cairo Fashion House">
                      Cairo Fashion House
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Related Order
                  </label>
                  <select
                    name="orderId"
                    value={formData.orderId}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent"
                  >
                    <option value="">Select Order</option>
                    <option value="ORD-001">ORD-001 - Jacquard Velvet</option>
                    <option value="ORD-002">ORD-002 - Cotton Blend</option>
                    <option value="ORD-003">ORD-003 - Silk Fabric</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount ($) *
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="18000"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent"
                  >
                    <option value="unpaid">Unpaid</option>
                    <option value="partial">Partial</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Invoice description..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent resize-none"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Invoice</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function UploadInvoiceModal({
  isOpen,
  onClose,
}: UploadInvoiceModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload");
      return;
    }
    console.log("Uploading file:", file.name);
    alert("Invoice uploaded successfully!");
    onClose();
    setFile(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-green-primary to-green-secondary text-white">
              <div className="flex items-center space-x-3">
                <Upload className="w-6 h-6" />
                <h2 className="text-xl font-bold">Upload Invoice</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-green-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                {file ? (
                  <div>
                    <p className="text-green-600 font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">File selected</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-2">
                      Drop invoice file here or
                    </p>
                    <label className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 cursor-pointer">
                      Browse Files
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                      Supports PDF, JPG, PNG
                    </p>
                  </div>
                )}
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <Upload className="w-5 h-5" />
                  <span>Upload Invoice</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
