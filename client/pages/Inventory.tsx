import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import AddStockModal from "../components/AddStockModal";
import UpdateStockModal from "../components/UpdateStockModal";
import ReorderStockModal from "../components/ReorderStockModal";
import systemData from "../data/systemData";
import {
  Package,
  Plus,
  AlertTriangle,
  TrendingDown,
  DollarSign,
  Archive,
  Search,
  Filter,
} from "lucide-react";

interface InventoryItem {
  type: string;
  color: string;
  quantity: number;
  unit: string;
  price: number;
}

export default function Inventory() {
  const { language, t } = useLanguage();
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showReorderModal, setShowReorderModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  // Calculate real inventory stats
  const inventoryItems = systemData.inventory;
  const lowStockThreshold = 1000;
  const lowStockItems = inventoryItems.filter(
    (item) => item.quantity < lowStockThreshold,
  );
  const totalItems = inventoryItems.length;
  const totalValue = inventoryItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  // Filter items
  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.color.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getStockStatus = (quantity: number) => {
    if (quantity < lowStockThreshold)
      return { status: "low", color: "bg-red-100 text-red-800" };
    if (quantity < lowStockThreshold * 2)
      return { status: "medium", color: "bg-yellow-100 text-yellow-800" };
    return { status: "good", color: "bg-green-100 text-green-800" };
  };

  const getProgressBarColor = (quantity: number) => {
    if (quantity < lowStockThreshold) return "bg-red-500";
    if (quantity < lowStockThreshold * 2) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500">
        <span>{t("dashboard")}</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{t("inventory")}</span>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t("inventoryManagement")}
          </h1>
          <p className="text-gray-600 mt-1">{t("manageFabricStock")}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddStockModal(true)}
          className={`mt-4 sm:mt-0 px-4 py-2 bg-green-primary text-white rounded-lg hover:bg-green-secondary transition-colors flex items-center ${language === "ar" ? "space-x-reverse space-x-2" : "space-x-2"}`}
        >
          <Plus className="w-4 h-4" />
          <span>{t("addStock")}</span>
        </motion.button>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-200 rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-800 font-medium">{t("lowStockAlert")}</p>
              <p className="text-3xl font-bold text-red-600">
                {lowStockItems.length}
              </p>
              <p className="text-red-600 text-sm">
                {t("itemsBelow")} {lowStockThreshold} {t("meters")}
              </p>
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
              <p className="text-blue-800 font-medium">{t("totalItems")}</p>
              <p className="text-3xl font-bold text-blue-600">{totalItems}</p>
              <p className="text-blue-600 text-sm">{t("fabricTypesInStock")}</p>
            </div>
            <Package className="w-12 h-12 text-blue-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-green-50 border border-green-200 rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-800 font-medium">{t("stockValue")}</p>
              <p className="text-3xl font-bold text-green-600">
                ${(totalValue / 1000).toFixed(1)}K
              </p>
              <p className="text-green-600 text-sm">
                {t("totalInventoryValue")}
              </p>
            </div>
            <DollarSign className="w-12 h-12 text-green-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-purple-50 border border-purple-200 rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-800 font-medium">{t("avgUnitPrice")}</p>
              <p className="text-3xl font-bold text-purple-600">
                $
                {(
                  totalValue /
                  inventoryItems.reduce((sum, item) => sum + item.quantity, 0)
                ).toFixed(2)}
              </p>
              <p className="text-purple-600 text-sm">{t("perMeterAverage")}</p>
            </div>
            <Archive className="w-12 h-12 text-purple-500" />
          </div>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div
            className={`flex items-center ${language === "ar" ? "space-x-reverse space-x-4" : "space-x-4"}`}
          >
            <div className="relative">
              <Search
                className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4`}
              />
              <input
                type="text"
                placeholder={t("searchFabrics")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`${language === "ar" ? "pr-10 pl-4" : "pl-10 pr-4"} py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent w-64`}
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent"
            >
              <option value="all">{t("allTypes")}</option>
              <option value="Jacquard">{t("jacquard")}</option>
              <option value="Velvet">{t("velvet")}</option>
              <option value="Nubuk">{t("nubuk")}</option>
              <option value="Babyface">{t("babyface")}</option>
              <option value="Bouclé">{t("boucle")}</option>
            </select>
          </div>
          <div
            className={`flex items-center ${language === "ar" ? "space-x-reverse space-x-3" : "space-x-3"}`}
          >
            <button
              className={`px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center ${language === "ar" ? "space-x-reverse space-x-2" : "space-x-2"}`}
            >
              <Filter className="w-4 h-4" />
              <span>{t("moreFilters")}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => {
          const stockStatus = getStockStatus(item.quantity);
          const progressBarColor = getProgressBarColor(item.quantity);
          const progressPercentage = Math.min(
            (item.quantity / (lowStockThreshold * 3)) * 100,
            100,
          );
          const totalItemValue = item.quantity * item.price;

          return (
            <motion.div
              key={`${item.type}-${item.color}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.type}</h3>
                    <p className="text-sm text-gray-600">{item.color}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}
                  >
                    {stockStatus.status === "low"
                      ? t("low")
                      : stockStatus.status === "medium"
                        ? t("medium")
                        : t("good")}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Quantity Info */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">{t("quantity")}</span>
                    <span className="font-medium">
                      {item.quantity.toLocaleString()} {t("meters")}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${progressBarColor} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  {item.quantity < lowStockThreshold && (
                    <p
                      className={`text-xs text-red-600 mt-1 flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}
                    >
                      <AlertTriangle
                        className={`w-3 h-3 ${language === "ar" ? "ml-1" : "mr-1"}`}
                      />
                      {t("belowMinimumThreshold")}
                    </p>
                  )}
                </div>

                {/* Pricing Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">{t("unitPrice")}</p>
                    <p className="font-medium">${item.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">{t("totalValue")}</p>
                    <p className="font-medium text-green-600">
                      ${totalItemValue.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div
                  className={`flex ${language === "ar" ? "space-x-reverse space-x-2" : "space-x-2"} pt-2 border-t border-gray-100`}
                >
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setShowReorderModal(true);
                    }}
                    className="flex-1 px-3 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                  >
                    {t("reorder")}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setShowUpdateModal(true);
                    }}
                    className="flex-1 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                  >
                    {t("update")}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-6"
        >
          <h3
            className={`text-lg font-semibold text-red-800 mb-4 flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}
          >
            <AlertTriangle
              className={`w-5 h-5 ${language === "ar" ? "ml-2" : "mr-2"}`}
            />
            {t("lowStockAlerts")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowStockItems.map((item, index) => (
              <div
                key={`alert-${item.type}-${item.color}`}
                className="bg-white rounded-lg p-4 border border-red-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.type} - {item.color}
                    </p>
                    <p className="text-sm text-red-600">
                      {t("onlyRemaining")}: {item.quantity} {t("meters")}{" "}
                      {t("remaining")}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setShowReorderModal(true);
                    }}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                  >
                    {t("reorder")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <AddStockModal
        isOpen={showAddStockModal}
        onClose={() => setShowAddStockModal(false)}
      />

      <UpdateStockModal
        isOpen={showUpdateModal}
        onClose={() => {
          setShowUpdateModal(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
      />

      <ReorderStockModal
        isOpen={showReorderModal}
        onClose={() => {
          setShowReorderModal(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
      />
    </div>
  );
}
