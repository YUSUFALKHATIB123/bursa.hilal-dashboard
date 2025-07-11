import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import systemData from "../data/systemData";
import {
  CreateInvoiceModal,
  UploadInvoiceModal,
} from "../components/InvoiceModals";
import EditInvoiceModal from "../components/EditInvoiceModal";
import {
  FileText,
  Plus,
  Upload,
  Download,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
} from "lucide-react";

interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  date: string;
  dueDate: string;
  type: "sales" | "purchase";
  typeLabel: string;
  items: Array<{
    id: number;
    description: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  amountReceived: number;
  amountRemaining: number;
  paymentStatus: "paid" | "unpaid" | "partial";
  paymentMethod: "cash" | "bank_transfer" | "wire_transfer";
  notes: string;
  createdDate: string;
  lastPaymentDate: string | null;
  isOverdue: boolean;
}

const paymentStatusConfig = {
  paid: {
    label: { en: "Paid", ar: "مدفوع" },
    color: "bg-green-100 text-green-800",
  },
  unpaid: {
    label: { en: "Unpaid", ar: "غير مدفوع" },
    color: "bg-red-100 text-red-800",
  },
  partial: {
    label: { en: "Partially Paid", ar: "مدفوع جزئياً" },
    color: "bg-yellow-100 text-yellow-800",
  },
};

const paymentMethodConfig = {
  cash: { en: "Cash", ar: "نقداً" },
  bank_transfer: { en: "Bank Transfer", ar: "حوالة بنكية" },
  wire_transfer: { en: "Wire Transfer", ar: "حوالة مصرفية" },
};

function StatusBadge({
  status,
  language,
}: {
  status: keyof typeof paymentStatusConfig;
  language: "en" | "ar";
}) {
  const statusConfig = paymentStatusConfig[status];
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
    >
      {statusConfig.label[language]}
    </span>
  );
}

function InvoiceDetailModal({
  invoice,
  isOpen,
  onClose,
}: {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { language, t } = useLanguage();

  if (!isOpen || !invoice) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-primary to-green-secondary text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {invoice.invoiceNumber}
              </h2>
              <p className="text-green-100">{invoice.typeLabel}</p>
              <p className="text-green-100 text-sm mt-1">{invoice.customer}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Customer Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                {t("customer")}
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>{t("name")}:</strong> {invoice.customer}
                </p>
                <p>
                  <strong>{t("email")}:</strong> {invoice.customerEmail}
                </p>
                <p>
                  <strong>{t("phone")}:</strong> {invoice.customerPhone}
                </p>
                <p>
                  <strong>{t("address")}:</strong> {invoice.customerAddress}
                </p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                {t("paymentStatus")}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{t("total")}:</span>
                  <span className="font-medium">
                    ${invoice.total.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t("amountReceived")}:</span>
                  <span className="font-medium text-green-600">
                    ${invoice.amountReceived.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t("amountRemaining")}:</span>
                  <span className="font-medium text-orange-600">
                    ${invoice.amountRemaining.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span>{t("status")}:</span>
                  <StatusBadge
                    status={invoice.paymentStatus}
                    language={language}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">{t("items")}</h3>
            <div className="table-responsive">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      {t("description")}
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      {t("quantity")}
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      {t("price")}
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      {t("total")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {invoice.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {item.description}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        ${item.unitPrice}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900 font-medium">
                        ${item.total.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">{t("notes")}</h3>
              <p className="text-blue-700 text-sm">{invoice.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t("close")}
          </button>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>PDF</span>
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Edit className="w-4 h-4" />
              <span>{t("edit")}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Invoices() {
  const { language, t } = useLanguage();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const invoices = systemData.invoices as Invoice[];

  // Calculate stats
  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(
    (inv) => inv.paymentStatus === "paid",
  ).length;
  const partialInvoices = invoices.filter(
    (inv) => inv.paymentStatus === "partial",
  ).length;
  const unpaidInvoices = invoices.filter(
    (inv) => inv.paymentStatus === "unpaid",
  ).length;
  const overdueInvoices = invoices.filter((inv) => inv.isOverdue).length;

  // Filter invoices
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || invoice.paymentStatus === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleInvoiceClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500">
        <span>{t("dashboard")}</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{t("invoices")}</span>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("invoices")}</h1>
          <p className="text-gray-600 mt-1">
            {language === "ar"
              ? "رفع وأرشفة الفواتير وتتبع حالة الدفع"
              : "Upload, archive invoices and track payment status"}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>{t("uploadInvoice")}</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-green-primary text-white rounded-lg hover:bg-green-secondary transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>{t("createInvoice")}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {[
          {
            title: "totalInvoices",
            value: totalInvoices,
            icon: FileText,
            color: "blue",
          },
          {
            title: "paid",
            value: paidInvoices,
            icon: CheckCircle,
            color: "green",
          },
          {
            title: "partiallyPaid",
            value: partialInvoices,
            icon: Clock,
            color: "yellow",
          },
          {
            title: "unpaid",
            value: unpaidInvoices,
            icon: AlertTriangle,
            color: "red",
          },
          {
            title: "overdue",
            value: overdueInvoices,
            icon: Calendar,
            color: "purple",
          },
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
                <p className="text-gray-600 text-sm">{t(stat.title)}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div
                className={`p-3 rounded-lg bg-${stat.color}-100 text-${stat.color}-600`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={
                  language === "ar"
                    ? "بحث في الفواتير..."
                    : "Search invoices..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent w-64"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent"
            >
              <option value="all">
                {language === "ar" ? "جميع الحالات" : "All Status"}
              </option>
              <option value="paid">{t("paid")}</option>
              <option value="partial">{t("partiallyPaid")}</option>
              <option value="unpaid">{t("unpaid")}</option>
            </select>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>{t("filter")}</span>
            </button>
            <button
              onClick={() => {
                // Generate CSV export
                const csvContent = [
                  "Invoice Number,Customer,Date,Due Date,Total,Amount Received,Amount Remaining,Status",
                  ...filteredInvoices.map(
                    (invoice) =>
                      `${invoice.invoiceNumber},${invoice.customer},${invoice.date},${invoice.dueDate},${invoice.total},${invoice.amountReceived},${invoice.amountRemaining},${invoice.paymentStatus}`,
                  ),
                ].join("\n");

                const blob = new Blob([csvContent], { type: "text/csv" });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `invoices_export_${new Date().toISOString().split("T")[0]}.csv`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>{t("export")}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Invoices Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
      >
        <div className="table-responsive">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("invoiceNumber")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("customer")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("date")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("dueDate")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("total")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("status")}
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider actions-column">
                  {language === "ar" ? "الإجراءات" : "Actions"}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice, index) => (
                <motion.tr
                  key={invoice.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.invoiceNumber}
                    {invoice.isOverdue && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        {t("overdue")}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-primary to-green-secondary rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {invoice.customer}
                        </div>
                        <div className="text-sm text-gray-500">
                          {invoice.typeLabel}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {invoice.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    ${invoice.total.toLocaleString()}
                    {invoice.amountRemaining > 0 && (
                      <div className="text-xs text-orange-600">
                        {t("amountRemaining")}: $
                        {invoice.amountRemaining.toLocaleString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge
                      status={invoice.paymentStatus}
                      language={language}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center actions-column">
                    <div className="action-buttons">
                      <button
                        onClick={() => handleInvoiceClick(invoice)}
                        className="text-green-primary hover:text-green-secondary p-1 rounded transition-colors inline-flex items-center"
                        title={t("view")}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          const newCustomer = prompt(
                            `${t("edit")} ${invoice.invoiceNumber}\n${t("customer")} (${language === "ar" ? "الحالي" : "current"}: ${invoice.customer}):`,
                            invoice.customer,
                          );
                          const newAmount = prompt(
                            `${t("total")} (${language === "ar" ? "الحالي" : "current"}: $${invoice.total}):`,
                            invoice.total.toString(),
                          );

                          if (newCustomer && newAmount) {
                            alert(
                              `${language === "ar" ? "تم تحديث الفاتورة" : "Invoice updated"}:\n` +
                                `${t("invoiceNumber")}: ${invoice.invoiceNumber}\n` +
                                `${t("customer")}: ${newCustomer}\n` +
                                `${t("total")}: $${newAmount}\n` +
                                `${language === "ar" ? "تم الحفظ بنجاح!" : "Changes saved successfully!"}`,
                            );
                          }
                        }}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                        title={t("edit")}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              `${language === "ar" ? "هل أنت متأكد من حذف" : "Are you sure you want to delete"} ${invoice.invoiceNumber}?`,
                            )
                          ) {
                            alert(`${t("delete")} ${invoice.invoiceNumber}`);
                          }
                        }}
                        className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                        title={t("delete")}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Invoice Detail Modal */}
      <InvoiceDetailModal
        invoice={selectedInvoice}
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedInvoice(null);
        }}
      />

      {/* Invoice Modals */}
      <CreateInvoiceModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
      <UploadInvoiceModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />
    </div>
  );
}
