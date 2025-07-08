import { useState } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";

const monthlyData = [
  { month: "Jan", revenue: 45000, expenses: 32000, profit: 13000 },
  { month: "Feb", revenue: 52000, expenses: 35000, profit: 17000 },
  { month: "Mar", revenue: 48000, expenses: 38000, profit: 10000 },
  { month: "Apr", revenue: 61000, expenses: 41000, profit: 20000 },
  { month: "May", revenue: 55000, expenses: 39000, profit: 16000 },
  { month: "Jun", revenue: 67000, expenses: 44000, profit: 23000 },
];

const expenseCategories = [
  { category: "Raw Materials", amount: 25000, color: "bg-blue-500" },
  { category: "Labor", amount: 18000, color: "bg-green-500" },
  { category: "Utilities", amount: 8000, color: "bg-yellow-500" },
  { category: "Equipment", amount: 12000, color: "bg-purple-500" },
  { category: "Other", amount: 5000, color: "bg-red-500" },
];

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
            <span className="text-gray-500 text-sm ml-1">vs last month</span>
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
  const maxValue = Math.max(...monthlyData.map((d) => d.revenue));

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Monthly Revenue & Expenses
        </h3>
        <button className="flex items-center space-x-2 text-green-primary hover:text-green-secondary">
          <Download className="w-4 h-4" />
          <span>Export</span>
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
          <span className="text-gray-600">Revenue</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-400 rounded-full" />
          <span className="text-gray-600">Expenses</span>
        </div>
      </div>
    </div>
  );
}

function ExpensePieChart() {
  const total = expenseCategories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Expense Breakdown
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
                <span className="text-gray-700">{category.category}</span>
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
  const [timeRange, setTimeRange] = useState("month");

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500">
        <span>Dashboard</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Financial Dashboard</span>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Financial Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Track earnings, expenses, and profit/loss with detailed analytics
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Generate CSV/PDF export
              const csvContent =
                "data:text/csv;charset=utf-8," +
                "Month,Revenue,Expenses,Profit\n" +
                "Jan,45000,32000,13000\n" +
                "Feb,52000,35000,17000\n" +
                "Mar,48000,38000,10000\n" +
                "Apr,61000,41000,20000\n" +
                "May,55000,39000,16000\n" +
                "Jun,67000,44000,23000";

              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", "financial_report.csv");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-4 py-2 bg-green-primary text-white rounded-lg hover:bg-green-secondary transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value="$67,200"
          change="+12.5%"
          icon={DollarSign}
          color="bg-green-500"
        />
        <MetricCard
          title="Total Expenses"
          value="$44,800"
          change="+8.2%"
          icon={TrendingDown}
          color="bg-red-500"
        />
        <MetricCard
          title="Net Profit"
          value="$22,400"
          change="+18.7%"
          icon={TrendingUp}
          color="bg-blue-500"
        />
        <MetricCard
          title="Profit Margin"
          value="33.3%"
          change="+2.1%"
          icon={PieChart}
          color="bg-purple-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
            Top Countries by Revenue
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                {country.orders} orders
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
            Monthly Financial Summary
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Expenses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Profit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Growth
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

      {/* Admin Notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 border border-blue-200 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          Financial Notes (Admin Only)
        </h3>
        <textarea
          placeholder="Add financial notes and insights..."
          className="w-full h-24 p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white"
        />
        <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Save Notes
        </button>
      </motion.div>
    </div>
  );
}
