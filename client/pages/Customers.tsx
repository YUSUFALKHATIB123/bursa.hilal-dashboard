import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import AddCustomerModal from "../components/AddCustomerModal";
import {
  Users,
  Plus,
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";

export default function Customers() {
  const { language, t } = useLanguage();
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500">
        <span>{t("dashboard")}</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{t("customers")}</span>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("customers")}</h1>
          <p className="text-gray-600 mt-1">{t("customersDesc")}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddCustomerModal(true)}
          className={`mt-4 sm:mt-0 px-4 py-2 bg-green-primary text-white rounded-lg hover:bg-green-secondary transition-colors flex items-center ${language === "ar" ? "space-x-reverse space-x-2" : "space-x-2"}`}
        >
          <Plus className="w-4 h-4" />
          <span>{t("addCustomer")}</span>
        </motion.button>
      </motion.div>

      {/* Libya Textile Co. Featured Customer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-green-primary to-green-secondary p-6 text-white">
          <h3 className="text-xl font-bold">
            {language === "ar" ? "عميل مميز" : "Featured Customer"}
          </h3>
          <p className="text-green-100">
            {language === "ar" ? "ملف عميل مميز" : "Premium customer profile"}
          </p>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                LT
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900">
                  Libya Textile Co.
                </h4>
                <p className="text-gray-600">
                  {language === "ar" ? "عميل مميز" : "Premium Customer"}
                </p>
                <p className="text-sm text-gray-500">
                  {language === "ar" ? "عضو منذ 2022" : "Member since 2022"}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h5 className="font-semibold text-gray-900">
                {language === "ar" ? "معلومات الاتصال" : "Contact Information"}
              </h5>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">
                      {language === "ar" ? "الهاتف" : "Phone"}
                    </p>
                    <p className="font-medium">+218-912-345-678</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">
                      {language === "ar" ? "واتساب" : "WhatsApp"}
                    </p>
                    <p className="font-medium">218912345678</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">
                      {language === "ar" ? "البريد الإلكتروني" : "Email"}
                    </p>
                    <p className="font-medium">contact@libyatextile.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">
                      {language === "ar" ? "الموقع" : "Location"}
                    </p>
                    <p className="font-medium">
                      {language === "ar" ? "طرابلس، ليبيا" : "Tripoli, Libya"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold text-gray-900">
                {language === "ar" ? "الملخص المالي" : "Financial Summary"}
              </h5>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {language === "ar"
                      ? "إجمالي قيمة الطلبات"
                      : "Total Orders Value"}
                  </span>
                  <span className="font-bold text-lg text-gray-900">
                    $45,000
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {language === "ar" ? "المبلغ المدفوع" : "Amount Paid"}
                  </span>
                  <span className="font-semibold text-green-600">$30,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {language === "ar" ? "المتبقي" : "Outstanding"}
                  </span>
                  <span className="font-semibold text-orange-600">$15,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "67%" }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">
                  {language === "ar" ? "67% مدفوع" : "67% paid"}
                </p>
              </div>

              <h5 className="font-semibold text-gray-900 mt-4">
                {language === "ar" ? "الطلب الأخير" : "Recent Order"}
              </h5>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">
                    {language === "ar"
                      ? "ORD-001: مخمل جاكار"
                      : "ORD-001: Jacquard Velvet"}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {language === "ar" ? "قيد التنفيذ" : "Processing"}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    {language === "ar" ? "الكمية" : "Quantity"}:{" "}
                    {language === "ar" ? "1200 متر" : "1200 meters"}
                  </p>
                  <p>
                    {language === "ar" ? "الألوان" : "Colors"}:{" "}
                    {language === "ar"
                      ? "ذهبي، كريمي، بيج"
                      : "Gold, Cream, Beige"}
                  </p>
                  <p>
                    {language === "ar" ? "تاريخ الطلب" : "Order Date"}:{" "}
                    {language === "ar" ? "07 يوليو 2025" : "Jul 07, 2025"}
                  </p>
                  <p>
                    {language === "ar" ? "المرحلة الحالية" : "Current Stage"}:{" "}
                    {language === "ar" ? "أرسل للصباغة" : "Sent to Dyeing"}
                  </p>
                  <div className="mt-2 pt-2 border-t border-blue-200">
                    <p className="font-medium text-blue-800">
                      {language === "ar" ? "قيمة الطلب" : "Order Value"}:
                      $18,000
                    </p>
                    <p className="text-sm">
                      {language === "ar"
                        ? "مدفوع: $3,000 | متبقي: $15,000"
                        : "Paid: $3,000 | Remaining: $15,000"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={() =>
                alert(
                  language === "ar"
                    ? "تواصل مع العميل عبر واتساب/إيميل - قريباً!"
                    : "Contact customer via WhatsApp/Email - Coming soon!",
                )
              }
              className="px-4 py-2 bg-green-primary text-white rounded-lg hover:bg-green-secondary transition-colors"
            >
              {language === "ar" ? "تواصل مع العميل" : "Contact Customer"}
            </button>
            <button
              onClick={() =>
                alert(
                  language === "ar"
                    ? "عرض جميع طلبات العميل - قريباً!"
                    : "View all customer orders - Coming soon!",
                )
              }
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {language === "ar" ? "عرض جميع الطلبات" : "View All Orders"}
            </button>
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
          {language === "ar" ? "إدارة العملاء" : "Customer Management"}
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {language === "ar"
            ? "قاعدة بيانات كاملة للعملاء مع ملفات تعريف مفصلة وتاريخ الطلبات ومعلومات الاتصال وأدوات إدارة العلاقات."
            : "Complete customer database with detailed profiles, order history, contact information, and relationship management tools."}
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() =>
              alert(
                language === "ar"
                  ? "بحث عن العملاء - قريباً!"
                  : "Search customers - Coming soon!",
              )
            }
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>
              {language === "ar" ? "بحث عن العملاء" : "Search Customers"}
            </span>
          </button>
          <button
            onClick={() =>
              alert(
                language === "ar"
                  ? "تصفية العملاء - قريباً!"
                  : "Filter customers - Coming soon!",
              )
            }
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>{language === "ar" ? "تصفية" : "Filter"}</span>
          </button>
          <button
            onClick={() =>
              alert(
                language === "ar"
                  ? "تصدير العملاء - قريباً!"
                  : "Export customers - Coming soon!",
              )
            }
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>{language === "ar" ? "تصدير" : "Export"}</span>
          </button>
        </div>
      </motion.div>

      {/* Add Customer Modal */}
      <AddCustomerModal
        isOpen={showAddCustomerModal}
        onClose={() => setShowAddCustomerModal(false)}
      />
    </div>
  );
}
