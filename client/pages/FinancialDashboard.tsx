import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage, Language } from "../contexts/LanguageContext";
import systemData from "../data/systemData";
import { realFinancialData } from "../utils/financialCalculations";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  BarChart3,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";

// Use real monthly data from calculations
const monthlyData = realFinancialData.monthlyData;

// Use real expense breakdown from calculations
const expenseCategories = realFinancialData.expenseBreakdown;

const topCountries = [
  {
    country: "Libya",
    orders: 3,
    revenue: 45000,
    flag: "🇱🇾",
    growth: "+15%",
  },
  {
    country: "Algeria",
    orders: 2,
    revenue: 28000,
    flag: "🇩🇿",
    growth: "+8%",
  },
  {
    country: "Egypt",
    orders: 1,
    revenue: 15000,
    flag: "🇪🇬",
    growth: "New",
  },
  {
    country: "Tunisia",
    orders: 1,
    revenue: 12000,
    flag: "🇹🇳",
    growth: "New",
  },
];

function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  change: string;
  icon: any;
  color: string;
}) {
  const { language } = useLanguage();
  const isPositive = change.startsWith("+");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center mt-2">
            {isPositive ? (
              <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span
              className={`text-sm font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}
            >
              {change}
            </span>
            <span className="text-gray-500 text-sm ml-1">
              {language === "ar" ? "مقارنة بالشهر الماضي" : "vs last month"}
            </span>
          </div>
        </div>
        <div className={`p-4 rounded-lg ${color}`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

function SimpleBarChart() {
  const { language, t } = useLanguage();
  const maxValue = Math.max(...monthlyData.map((d) => d.revenue));

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {t("monthlyRevenue")} & {language === "ar" ? "المصروفات" : "Expenses"}
        </h3>
        <button className="flex items-center space-x-2 text-green-primary hover:text-green-secondary">
          <Download className="w-4 h-4" />
          <span>{t("export")}</span>
        </button>
      </div>

      <div className="space-y-4">
        {monthlyData.map((data, index) => (
          <motion.div
            key={data.month}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-4"
          >
            <div className="w-8 text-sm font-medium text-gray-600">
              {data.month}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.revenue / maxValue) * 100}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    className="bg-green-500 h-2 rounded-full"
                  />
                </div>
                <span className="text-sm font-medium text-green-600 w-16">
                  ${(data.revenue / 1000).toFixed(0)}K
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.expenses / maxValue) * 100}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                    className="bg-red-400 h-2 rounded-full"
                  />
                </div>
                <span className="text-sm font-medium text-red-600 w-16">
                  ${(data.expenses / 1000).toFixed(0)}K
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-gray-600">
            {language === "ar" ? "الإيرادات" : "Revenue"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-400 rounded-full" />
          <span className="text-gray-600">
            {language === "ar" ? "المصروفات" : "Expenses"}
          </span>
        </div>
      </div>
    </div>
  );
}

function ExpensePieChart() {
  const { language, t } = useLanguage();
  const total = expenseCategories.reduce((sum, cat) => sum + cat.amount, 0);

  const getTranslatedCategory = (category: string) => {
    switch (category) {
      case "Labor":
        return t("labor");
      case "Raw Materials":
        return t("rawMaterials");
      case "Utilities":
        return t("utilities");
      case "Equipment & Maintenance":
        return `${t("equipment")} & ${t("maintenance")}`;
      case "Miscellaneous":
        return t("miscellaneous");
      default:
        return category;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        {t("expenseBreakdown")}
      </h3>

      <div className="space-y-4">
        {expenseCategories.map((category, index) => {
          const percentage = ((category.amount / total) * 100).toFixed(1);
          return (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                <span className="text-gray-700">
                  {getTranslatedCategory(category.category)}
                </span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">
                  ${category.amount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">{percentage}%</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Total Expenses</span>
          <span className="text-xl font-bold text-gray-900">
            ${total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function FinancialDashboard() {
  const { language, t } = useLanguage();
  const [timeRange, setTimeRange] = useState("month");

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500">
        <span>{t("dashboard")}</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{t("financial")}</span>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("financial")}</h1>
          <p className="text-gray-600 mt-1">{t("financialDesc")}</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent"
          >
            <option value="week">
              {language === "ar" ? "هذا الأسبوع" : "This Week"}
            </option>
            <option value="month">
              {language === "ar" ? "هذا الشهر" : "This Month"}
            </option>
            <option value="quarter">
              {language === "ar" ? "هذا الربع" : "This Quarter"}
            </option>
            <option value="year">
              {language === "ar" ? "هذا العام" : "This Year"}
            </option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Generate CSV export with real data
              const csvContent = [
                "Month,Revenue,Expenses,Profit",
                ...monthlyData.map(
                  (data) =>
                    `${data.month},${data.revenue},${data.expenses},${data.profit}`,
                ),
                "",
                "Expense Breakdown",
                "Category,Amount",
                ...expenseCategories.map(
                  (cat) => `${cat.category},${cat.amount}`,
                ),
              ].join("\n");

              const blob = new Blob([csvContent], { type: "text/csv" });
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `financial_report_${new Date().toISOString().split("T")[0]}.csv`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              window.URL.revokeObjectURL(url);
            }}
            className="px-4 py-2 bg-green-primary text-white rounded-lg hover:bg-green-secondary transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>{t("exportReport")}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="responsive-grid container-safe">
        <MetricCard
          title={t("totalRevenue")}
          value={`$${(realFinancialData.totalRevenue / 1000).toFixed(1)}K`}
          change="+12.5%"
          icon={DollarSign}
          color="bg-green-500"
        />
        <MetricCard
          title={t("totalExpenses")}
          value={`$${(realFinancialData.totalExpenses / 1000).toFixed(1)}K`}
          change="+8.2%"
          icon={TrendingDown}
          color="bg-red-500"
        />
        <MetricCard
          title={t("netProfit")}
          value={`$${(realFinancialData.netProfit / 1000).toFixed(1)}K`}
          change={realFinancialData.netProfit > 0 ? "+18.7%" : "-5.2%"}
          icon={realFinancialData.netProfit > 0 ? TrendingUp : TrendingDown}
          color={
            realFinancialData.netProfit > 0 ? "bg-green-600" : "bg-red-600"
          }
        />
        <MetricCard
          title={t("profitMargin")}
          value={`${realFinancialData.profitMargin.toFixed(1)}%`}
          change={realFinancialData.profitMargin > 20 ? "+2.1%" : "-1.8%"}
          icon={PieChart}
          color={
            realFinancialData.profitMargin > 20
              ? "bg-green-500"
              : "bg-orange-500"
          }
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 container-safe">
        <div className="lg:col-span-2">
          <SimpleBarChart />
        </div>
        <div>
          <ExpensePieChart />
        </div>
      </div>

      {/* Top Countries Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            {language === "ar"
              ? "أهم البلدان من حيث الإيرادات"
              : "Top Countries by Revenue"}
          </h3>
        </div>
        <div className="responsive-grid container-safe gap-4">
          {topCountries.map((country, index) => (
            <motion.div
              key={country.country}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{country.flag}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    country.growth === "New"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {country.growth}
                </span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">
                {country.country}
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                {country.orders} {language === "ar" ? "طلبات" : "orders"}
              </p>
              <p className="font-bold text-lg text-gray-900">
                ${(country.revenue / 1000).toFixed(0)}K
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Financial Summary Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {language === "ar"
              ? "الملخص المالي الشهري"
              : "Monthly Financial Summary"}
          </h3>
        </div>
        <div className="table-responsive">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {language === "ar" ? "الشهر" : "Month"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {language === "ar" ? "الإيرادات" : "Revenue"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {language === "ar" ? "المصروفات" : "Expenses"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {language === "ar" ? "الربح" : "Profit"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {language === "ar" ? "النمو" : "Growth"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {monthlyData.map((data, index) => {
                const growth =
                  index > 0
                    ? (
                        ((data.profit - monthlyData[index - 1].profit) /
                          monthlyData[index - 1].profit) *
                        100
                      ).toFixed(1)
                    : "0.0";
                const isPositiveGrowth = parseFloat(growth) >= 0;

                return (
                  <motion.tr
                    key={data.month}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {data.month}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      ${data.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      ${data.expenses.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-green-600">
                      ${data.profit.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`flex items-center ${
                          isPositiveGrowth ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {isPositiveGrowth ? (
                          <ArrowUpRight className="w-4 h-4 mr-1" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 mr-1" />
                        )}
                        {Math.abs(parseFloat(growth))}%
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Invoice and Payment Statistics */}
      <div className="responsive-grid container-safe">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">
                {language === "ar" ? "فواتير مدفوعة" : "Paid Invoices"}
              </p>
              <p className="text-2xl font-bold text-green-600">
                {realFinancialData.paidInvoices}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-100 text-green-600">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">
                {language === "ar" ? "فواتير غير مدفوعة" : "Unpaid Invoices"}
              </p>
              <p className="text-2xl font-bold text-red-600">
                {realFinancialData.unpaidInvoices}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-red-100 text-red-600">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">
                {language === "ar" ? "مدفوعات معلقة" : "Outstanding Payments"}
              </p>
              <p className="text-2xl font-bold text-orange-600">
                ${realFinancialData.outstandingPayments.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-orange-100 text-orange-600">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">
                {language === "ar" ? "فواتير متأخرة" : "Overdue Invoices"}
              </p>
              <p className="text-2xl font-bold text-red-600">
                ${realFinancialData.overdueAmount.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                {realFinancialData.overdueCount}{" "}
                {language === "ar" ? "فاتورة" : "invoices"}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-red-100 text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Admin Notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 border border-blue-200 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          {language === "ar"
            ? "ملاحظات مالية (مدير فقط)"
            : "Financial Notes (Admin Only)"}
        </h3>
        <textarea
          placeholder={
            language === "ar"
              ? "إضافة ملاحظات ورؤى مالية..."
              : "Add financial notes and insights..."
          }
          className="w-full h-24 p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white"
        />
        <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          {language === "ar" ? "حفظ الملاحظات" : "Save Notes"}
        </button>
      </motion.div>
    </div>
  );
}
