import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import {
  Search,
  X,
  Package,
  Users,
  FileText,
  ShoppingCart,
  UserCheck,
  Building2,
} from "lucide-react";
import systemData from "../data/systemData";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  path: string;
  icon: React.ElementType;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchInData = (query: string): SearchResult[] => {
    if (!query.trim()) return [];

    const searchResults: SearchResult[] = [];
    const lowercaseQuery = query.toLowerCase();

    // Search in Orders
    systemData.orders.forEach((order) => {
      if (
        order.customer.toLowerCase().includes(lowercaseQuery) ||
        order.id.toLowerCase().includes(lowercaseQuery) ||
        order.status.toLowerCase().includes(lowercaseQuery)
      ) {
        searchResults.push({
          id: order.id,
          title: `${language === "ar" ? "طلب" : "Order"} ${order.id}`,
          subtitle: `${order.customer} - $${order.total.toLocaleString()}`,
          type: language === "ar" ? "طلبات" : "Orders",
          path: `/orders`,
          icon: ShoppingCart,
        });
      }
    });

    // Search in Customers
    systemData.customers.forEach((customer) => {
      if (
        customer.name.toLowerCase().includes(lowercaseQuery) ||
        customer.email.toLowerCase().includes(lowercaseQuery) ||
        customer.company.toLowerCase().includes(lowercaseQuery)
      ) {
        searchResults.push({
          id: customer.id,
          title: customer.name,
          subtitle: `${customer.company} - ${customer.email}`,
          type: language === "ar" ? "عملاء" : "Customers",
          path: `/customers`,
          icon: Users,
        });
      }
    });

    // Search in Invoices
    systemData.invoices.forEach((invoice) => {
      if (
        invoice.invoiceNumber.toLowerCase().includes(lowercaseQuery) ||
        invoice.customer.toLowerCase().includes(lowercaseQuery) ||
        invoice.paymentStatus.toLowerCase().includes(lowercaseQuery)
      ) {
        searchResults.push({
          id: invoice.id,
          title: invoice.invoiceNumber,
          subtitle: `${invoice.customer} - $${invoice.total.toLocaleString()}`,
          type: language === "ar" ? "فواتير" : "Invoices",
          path: `/invoices`,
          icon: FileText,
        });
      }
    });

    // Search in Inventory
    systemData.inventory.forEach((item) => {
      if (
        item.name.toLowerCase().includes(lowercaseQuery) ||
        item.category.toLowerCase().includes(lowercaseQuery) ||
        item.sku.toLowerCase().includes(lowercaseQuery)
      ) {
        searchResults.push({
          id: item.id,
          title: item.name,
          subtitle: `${language === "ar" ? "المخزون:" : "Stock:"} ${item.quantity} ${item.unit}`,
          type: language === "ar" ? "مخزون" : "Inventory",
          path: `/inventory`,
          icon: Package,
        });
      }
    });

    // Search in Employees
    systemData.employees.forEach((employee) => {
      if (
        employee.name.toLowerCase().includes(lowercaseQuery) ||
        employee.position.toLowerCase().includes(lowercaseQuery) ||
        employee.department.toLowerCase().includes(lowercaseQuery)
      ) {
        searchResults.push({
          id: employee.id,
          title: employee.name,
          subtitle: `${employee.position} - ${employee.department}`,
          type: language === "ar" ? "موظفين" : "Employees",
          path: `/employees`,
          icon: UserCheck,
        });
      }
    });

    // Search in Suppliers
    systemData.suppliers.forEach((supplier) => {
      if (
        supplier.name.toLowerCase().includes(lowercaseQuery) ||
        supplier.category.toLowerCase().includes(lowercaseQuery) ||
        supplier.contact.toLowerCase().includes(lowercaseQuery)
      ) {
        searchResults.push({
          id: supplier.id,
          title: supplier.name,
          subtitle: `${supplier.category} - ${supplier.contact}`,
          type: language === "ar" ? "موردين" : "Suppliers",
          path: `/suppliers`,
          icon: Building2,
        });
      }
    });

    return searchResults.slice(0, 10); // Limit to 10 results
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      const timeoutId = setTimeout(() => {
        const searchResults = searchInData(searchQuery);
        setResults(searchResults);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [searchQuery, language]);

  const handleResultClick = (result: SearchResult) => {
    navigate(result.path);
    onClose();
    setSearchQuery("");
  };

  const handleClose = () => {
    onClose();
    setSearchQuery("");
    setResults([]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20 px-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -20 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === "ar"
                    ? "ابحث في جميع الأقسام..."
                    : "Search across all sections..."
                }
                className="flex-1 text-lg outline-none bg-transparent"
                autoFocus
              />
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-primary mx-auto"></div>
                <p className="text-gray-500 mt-3">
                  {language === "ar" ? "جاري البحث..." : "Searching..."}
                </p>
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((result, index) => (
                  <motion.div
                    key={`${result.type}-${result.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleResultClick(result)}
                    className="flex items-center space-x-4 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <result.icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">
                          {result.title}
                        </h3>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {result.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{result.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : searchQuery.trim() ? (
              <div className="p-8 text-center">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">
                  {language === "ar"
                    ? "لم يتم العثور على نتائج"
                    : "No results found"}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {language === "ar"
                    ? "جرب كلمات مختلفة أو تحقق من الإملاء"
                    : "Try different keywords or check spelling"}
                </p>
              </div>
            ) : (
              <div className="p-8 text-center">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">
                  {language === "ar"
                    ? "ابدأ بكتابة للبحث"
                    : "Start typing to search"}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {language === "ar"
                    ? "ابحث في الطلبات، العملاء، الفواتير والمزيد"
                    : "Search in orders, customers, invoices and more"}
                </p>
              </div>
            )}
          </div>

          {/* Search Tips */}
          {!searchQuery.trim() && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <p className="text-xs text-gray-500 text-center">
                {language === "ar" ? "اضغط ESC للإغلاق" : "Press ESC to close"}
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GlobalSearch;
