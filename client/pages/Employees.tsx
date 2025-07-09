import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import EmployeeDetailModal from "../components/EmployeeDetailModal";
import systemData from "../data/systemData";
import {
  UserCheck,
  Plus,
  Users,
  Calendar,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle,
  BarChart3,
} from "lucide-react";

interface Employee {
  id: string;
  name: string;
  position: string;
  salary: number;
  paid: number;
  remaining: number;
  hoursWorked: number;
  shift: string;
  absences: number;
  overtime: number;
  status: "active" | "on_leave" | "absent";
  lastWorkDate: string;
}

// Extended employee data with additional fields for the modal
const mockEmployees: Employee[] = [
  {
    id: "EMP-001",
    name: "غيث الخطيب",
    position: "مشغل آلة",
    salary: 9000,
    paid: 5000,
    remaining: 4000,
    hoursWorked: 160,
    shift: "الصباحية",
    absences: 2,
    overtime: 12,
    status: "active",
    lastWorkDate: "2025-01-15",
  },
  {
    id: "EMP-002",
    name: "محمد حج محمد",
    position: "مراقب جودة",
    salary: 8500,
    paid: 8500,
    remaining: 0,
    hoursWorked: 168,
    shift: "المسائية",
    absences: 0,
    overtime: 8,
    status: "active",
    lastWorkDate: "2025-01-15",
  },
  {
    id: "EMP-003",
    name: "عبدالله الخطيب",
    position: "فني صيانة",
    salary: 7500,
    paid: 3000,
    remaining: 4500,
    hoursWorked: 152,
    shift: "الصباحية",
    absences: 3,
    overtime: 4,
    status: "on_leave",
    lastWorkDate: "2025-01-12",
  },
];

function EmployeeCard({
  employee,
  onClick,
}: {
  employee: Employee;
  onClick: () => void;
}) {
  const { language } = useLanguage();
  const paymentPercentage = (employee.paid / employee.salary) * 100;
  const performanceScore = Math.floor(
    85 + Math.random() * 15 - employee.absences * 3,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Header */}
      <div
        className={`p-4 ${employee.status === "active" ? "bg-green-50" : employee.status === "on_leave" ? "bg-yellow-50" : "bg-red-50"}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{employee.name}</h3>
            <p className="text-sm text-gray-600">{employee.position}</p>
          </div>
          <div
            className={`p-2 rounded-lg ${
              employee.status === "active"
                ? "bg-green-500"
                : employee.status === "on_leave"
                  ? "bg-yellow-500"
                  : "bg-red-500"
            } text-white`}
          >
            <UserCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Salary Info */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">
              {language === "ar" ? "الراتب" : "Salary"}
            </span>
            <span className="font-medium">
              {employee.paid.toLocaleString()} /{" "}
              {employee.salary.toLocaleString()}{" "}
              {language === "ar" ? "ج.م" : "EGP"}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${paymentPercentage}%` }}
            />
          </div>
          {employee.remaining > 0 && (
            <p className="text-xs text-orange-600 mt-1">
              {language === "ar" ? "متبقي" : "Remaining"}:{" "}
              {employee.remaining.toLocaleString()}{" "}
              {language === "ar" ? "ج.م" : "EGP"}
            </p>
          )}
        </div>

        {/* Work Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">
              {language === "ar" ? "ساعات العمل" : "Hours Worked"}
            </p>
            <p className="font-medium flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {employee.hoursWorked}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              {language === "ar" ? "الوردية" : "Shift"}
            </p>
            <p className="font-medium">
              {language === "ar"
                ? employee.shift
                : employee.shift === "الصباحية"
                  ? "Morning"
                  : employee.shift === "المسائية"
                    ? "Evening"
                    : "Night"}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              {language === "ar" ? "الغيابات" : "Absences"}
            </p>
            <p
              className={`font-medium flex items-center ${employee.absences > 2 ? "text-red-600" : "text-green-600"}`}
            >
              <AlertCircle className="w-4 h-4 mr-1" />
              {employee.absences}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              {language === "ar" ? "الإضافي" : "Overtime"}
            </p>
            <p className="font-medium text-blue-600">
              {employee.overtime} {language === "ar" ? "ساعة" : "hours"}
            </p>
          </div>
        </div>

        {/* Performance Indicator */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600">
              {language === "ar" ? "مؤشر الأداء" : "Performance"}
            </span>
            <span className="font-medium">{performanceScore}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all duration-500 ${
                performanceScore >= 90
                  ? "bg-green-500"
                  : performanceScore >= 70
                    ? "bg-blue-500"
                    : "bg-orange-500"
              }`}
              style={{ width: `${performanceScore}%` }}
            />
          </div>
        </div>

        {/* Status and Actions */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                employee.status === "active"
                  ? "bg-green-100 text-green-800"
                  : employee.status === "on_leave"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {employee.status === "active"
                ? language === "ar"
                  ? "نشط"
                  : "Active"
                : employee.status === "on_leave"
                  ? language === "ar"
                    ? "إجازة"
                    : "On Leave"
                  : language === "ar"
                    ? "غائب"
                    : "Absent"}
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {language === "ar" ? "آخر عمل" : "Last work"}:{" "}
            {employee.lastWorkDate}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Employees() {
  const { language, t } = useLanguage();
  const [employees] = useState<Employee[]>(mockEmployees);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [showEmployeeDetail, setShowEmployeeDetail] = useState(false);

  const totalSalaries = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const totalPaid = employees.reduce((sum, emp) => sum + emp.paid, 0);
  const totalRemaining = employees.reduce((sum, emp) => sum + emp.remaining, 0);

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeDetail(true);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500">
        <span>{t("dashboard")}</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{t("employees")}</span>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("employees")}</h1>
          <p className="text-gray-600 mt-1">
            {language === "ar"
              ? "��دارة بيانات الموظفين والرواتب والمهام اليومية"
              : "Manage employee data, salaries, and daily tasks"}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="mt-4 sm:mt-0 px-4 py-2 bg-green-primary text-white rounded-lg hover:bg-green-secondary transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>{language === "ar" ? "إضافة موظف" : "Add Employee"}</span>
        </motion.button>
      </motion.div>

      {/* Stats Overview */}
      <div className="responsive-grid container-safe">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">
                {language === "ar" ? "إجمالي الموظفين" : "Total Employees"}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {employees.length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
              <Users className="w-6 h-6" />
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
                {language === "ar" ? "إجمالي الرواتب" : "Total Salaries"}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {totalSalaries.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-100 text-green-600">
              <DollarSign className="w-6 h-6" />
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
                {language === "ar" ? "المدفوع" : "Paid"}
              </p>
              <p className="text-2xl font-bold text-green-600">
                {totalPaid.toLocaleString()}
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
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">
                {language === "ar" ? "المتبقي" : "Remaining"}
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {totalRemaining.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-orange-100 text-orange-600">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Employees Grid */}
      <div className="responsive-grid container-safe">
        {employees.map((employee, index) => (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <EmployeeCard
              employee={employee}
              onClick={() => handleEmployeeClick(employee)}
            />
          </motion.div>
        ))}
      </div>

      {/* Add Employee Form Modal */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowAddForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {language === "ar" ? "إضافة موظف جديد" : "Add New Employee"}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder={language === "ar" ? "اسم الموظف" : "Employee Name"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent"
              />
              <input
                type="text"
                placeholder={language === "ar" ? "المنصب" : "Position"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent"
              />
              <input
                type="number"
                placeholder={language === "ar" ? "الراتب" : "Salary"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent"
              />
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent">
                <option>{language === "ar" ? "الوردية" : "Shift"}</option>
                <option>{language === "ar" ? "الصباحية" : "Morning"}</option>
                <option>{language === "ar" ? "المسائ��ة" : "Evening"}</option>
                <option>{language === "ar" ? "الليلية" : "Night"}</option>
              </select>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {language === "ar" ? "إضافة" : "Add"}
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {language === "ar" ? "إلغاء" : "Cancel"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Employee Detail Modal */}
      <EmployeeDetailModal
        isOpen={showEmployeeDetail}
        onClose={() => {
          setShowEmployeeDetail(false);
          setSelectedEmployee(null);
        }}
        employee={selectedEmployee}
      />
    </div>
  );
}
