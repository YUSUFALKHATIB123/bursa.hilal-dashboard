import { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  DollarSign,
  Calendar,
  Clock,
  User,
  AlertTriangle,
  Plus,
  Minus,
  Save,
  Edit,
  CheckCircle,
  FileText,
  TrendingUp,
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

interface EmployeeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
}

export default function EmployeeDetailModal({
  isOpen,
  onClose,
  employee,
}: EmployeeDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [salaryAdjustment, setSalaryAdjustment] = useState(0);
  const [adjustmentReason, setAdjustmentReason] = useState("");
  const [employeeNotes, setEmployeeNotes] = useState("");
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [attendanceStatus, setAttendanceStatus] = useState("present");

  if (!isOpen || !employee) return null;

  const performanceScore = Math.floor(
    85 + Math.random() * 15 - employee.absences * 3,
  );

  const tabs = [
    { id: "overview", label: "نظرة عامة", icon: User },
    { id: "salary", label: "الراتب", icon: DollarSign },
    { id: "attendance", label: "الحضور", icon: Clock },
    { id: "notes", label: "الملاحظات", icon: FileText },
    { id: "performance", label: "الأداء", icon: TrendingUp },
  ];

  return (
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
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-primary to-green-secondary text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">{employee.name}</h2>
              <p className="text-green-100">{employee.position}</p>
              <div className="flex items-center mt-2 space-x-4 text-green-100">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  آخر عمل: {employee.lastWorkDate}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    employee.status === "active"
                      ? "bg-green-500"
                      : employee.status === "on_leave"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                >
                  {employee.status === "active"
                    ? "نشط"
                    : employee.status === "on_leave"
                      ? "إجازة"
                      : "غائب"}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-green-primary text-green-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm">ساعات العمل</p>
                      <p className="text-2xl font-bold text-blue-800">
                        {employee.hoursWorked}
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm">الراتب المدفوع</p>
                      <p className="text-2xl font-bold text-green-800">
                        {employee.paid.toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-600 text-sm">الغيابات</p>
                      <p className="text-2xl font-bold text-orange-800">
                        {employee.absences}
                      </p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  معلومات الوردية
                </h4>
                <p className="text-gray-600">الوردية: {employee.shift}</p>
                <p className="text-gray-600">
                  ساعات إضافية: {employee.overtime} ساعة
                </p>
              </div>
            </div>
          )}

          {activeTab === "salary" && (
            <div className="space-y-6">
              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-4">
                  تفاصيل الراتب
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">الراتب الأساسي</p>
                    <p className="text-xl font-bold text-gray-900">
                      {employee.salary.toLocaleString()} ج.م
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">المدفوع</p>
                    <p className="text-xl font-bold text-green-600">
                      {employee.paid.toLocaleString()} ج.م
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">المتبقي</p>
                    <p className="text-xl font-bold text-orange-600">
                      {employee.remaining.toLocaleString()} ج.م
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">نسبة الدفع</p>
                    <p className="text-xl font-bold text-blue-600">
                      {((employee.paid / employee.salary) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  تعديل الراتب
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      مبلغ ��لتعديل
                    </label>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          setSalaryAdjustment(
                            Math.max(salaryAdjustment - 100, -5000),
                          )
                        }
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        value={salaryAdjustment}
                        onChange={(e) =>
                          setSalaryAdjustment(Number(e.target.value))
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent text-center"
                      />
                      <button
                        onClick={() =>
                          setSalaryAdjustment(
                            Math.min(salaryAdjustment + 100, 5000),
                          )
                        }
                        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      سبب التعديل
                    </label>
                    <select
                      value={adjustmentReason}
                      onChange={(e) => setAdjustmentReason(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent"
                    >
                      <option value="">اختر السبب</option>
                      <option value="bonus">مكافأة</option>
                      <option value="deduction">خصم</option>
                      <option value="overtime">ساعات إضافية</option>
                      <option value="absence">غياب</option>
                    </select>
                  </div>
                  <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>حفظ التعديل</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "attendance" && (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-4">
                  تسجيل الحضور
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      التاريخ
                    </label>
                    <input
                      type="date"
                      value={attendanceDate}
                      onChange={(e) => setAttendanceDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الحالة
                    </label>
                    <select
                      value={attendanceStatus}
                      onChange={(e) => setAttendanceStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="present">حاضر</option>
                      <option value="absent">غائب</option>
                      <option value="late">متأخر</option>
                      <option value="leave">إجازة</option>
                    </select>
                  </div>
                </div>
                <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  تسجيل الحضور
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  سجل الحضور (آخر 7 أيام)
                </h4>
                <div className="space-y-2">
                  {[...Array(7)].map((_, index) => {
                    const date = new Date();
                    date.setDate(date.getDate() - index);
                    const status = Math.random() > 0.8 ? "absent" : "present";
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-gray-900">
                          {date.toLocaleDateString("ar-EG")}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            status === "present"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {status === "present" ? "حاضر" : "غائب"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="space-y-6">
              <div className="bg-yellow-50 rounded-lg p-6">
                <h4 className="font-semibold text-yellow-800 mb-4">
                  ملاحظات خاصة
                </h4>
                <textarea
                  value={employeeNotes}
                  onChange={(e) => setEmployeeNotes(e.target.value)}
                  placeholder="اكتب ملاحظات خاصة عن الموظف..."
                  className="w-full h-32 p-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                />
                <button className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>حفظ الملاحظات</span>
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  سجل المخالفات والمكافآت
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium text-red-800">تأخر 3 مرات</p>
                      <p className="text-sm text-red-600">2025-01-10</p>
                    </div>
                    <span className="text-red-600 font-medium">-200 ج.م</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-800">
                        إنجاز مميز في المشروع
                      </p>
                      <p className="text-sm text-green-600">2025-01-05</p>
                    </div>
                    <span className="text-green-600 font-medium">+500 ج.م</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "performance" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-purple-800 mb-4">
                  مؤشر الأداء
                </h4>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">الأداء العام</span>
                      <span className="font-medium">{performanceScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${performanceScore}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className={`text-3xl font-bold ${
                        performanceScore >= 90
                          ? "text-green-600"
                          : performanceScore >= 70
                            ? "text-blue-600"
                            : "text-orange-600"
                      }`}
                    >
                      {performanceScore >= 90
                        ? "ممتاز"
                        : performanceScore >= 70
                          ? "جيد"
                          : "متوسط"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {employee.hoursWorked}
                    </div>
                    <p className="text-sm text-gray-600">ساعات العمل</p>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.max(0, 30 - employee.absences)}
                    </div>
                    <p className="text-sm text-gray-600">أيام الحضور</p>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {employee.overtime}
                    </div>
                    <p className="text-sm text-gray-600">ساعات إضافية</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            إغلاق
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Edit className="w-4 h-4" />
            <span>تحديث البيانات</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
