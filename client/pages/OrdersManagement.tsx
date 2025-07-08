import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
  Package,
  X,
  MessageSquare,
  PlayCircle,
  PauseCircle,
  Truck,
  Scissors,
  Palette,
  Shield,
} from "lucide-react";

const orderStatuses = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  processing: { label: "Processing", color: "bg-blue-100 text-blue-800" },
  completed: { label: "Completed", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800" },
};

const mockOrders = [
  {
    id: "ORD-001",
    customer: "Ahmed Textiles Ltd.",
    date: "2024-01-15",
    status: "processing",
    total: 15420,
    items: 3,
    deadline: "2024-01-25",
  },
  {
    id: "ORD-002",
    customer: "Cairo Fashion House",
    date: "2024-01-14",
    status: "completed",
    total: 8750,
    items: 2,
    deadline: "2024-01-20",
  },
  {
    id: "ORD-003",
    customer: "Alexandria Garments",
    date: "2024-01-13",
    status: "pending",
    total: 22100,
    items: 5,
    deadline: "2024-01-30",
  },
  {
    id: "ORD-004",
    customer: "Modern Textiles Co.",
    date: "2024-01-12",
    status: "processing",
    total: 12300,
    items: 4,
    deadline: "2024-01-28",
  },
  {
    id: "ORD-005",
    customer: "Elite Fashion",
    date: "2024-01-11",
    status: "cancelled",
    total: 9800,
    items: 2,
    deadline: "2024-01-22",
  },
];

function StatusBadge({ status }: { status: keyof typeof orderStatuses }) {
  const statusConfig = orderStatuses[status];
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
    >
      {statusConfig.label}
    </span>
  );
}

interface TimelineStep {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  current?: boolean;
  notes?: string;
  icon: any;
  color: string;
}

interface OrderTimelineProps {
  orderId: string;
  onClose: () => void;
}

function OrderTimeline({ orderId, onClose }: OrderTimelineProps) {
  // Mock data - in real app this would come from API based on orderId
  const [timelineSteps, setTimelineSteps] = useState<TimelineStep[]>([
    {
      id: "1",
      title: "Order Received",
      date: "Jan 15, 2024 - 09:30 AM",
      completed: true,
      icon: Package,
      color: "bg-blue-500",
      notes: "Order confirmed with customer requirements",
    },
    {
      id: "2",
      title: "Sent to Dyeing",
      date: "Jan 16, 2024 - 11:00 AM",
      completed: true,
      icon: Palette,
      color: "bg-purple-500",
      notes: "Materials sent to dyeing department - Color: Navy Blue",
    },
    {
      id: "3",
      title: "Back from Dyeing",
      date: "Jan 18, 2024 - 02:15 PM",
      completed: true,
      icon: CheckCircle,
      color: "bg-green-500",
      notes: "Dyeing completed successfully",
    },
    {
      id: "4",
      title: "Sent to Stitching",
      date: "Jan 19, 2024 - 08:45 AM",
      completed: true,
      current: true,
      icon: Scissors,
      color: "bg-orange-500",
      notes: "Assigned to stitching team A",
    },
    {
      id: "5",
      title: "Quality Check",
      date: "Jan 22, 2024",
      completed: false,
      icon: Shield,
      color: "bg-yellow-500",
    },
    {
      id: "6",
      title: "Ready for Delivery",
      date: "Jan 24, 2024",
      completed: false,
      icon: PlayCircle,
      color: "bg-indigo-500",
    },
    {
      id: "7",
      title: "Delivered",
      date: "Jan 25, 2024",
      completed: false,
      icon: Truck,
      color: "bg-gray-500",
    },
  ]);

  const [newNote, setNewNote] = useState("");
  const [editingStep, setEditingStep] = useState<string | null>(null);

  const addNote = (stepId: string, note: string) => {
    setTimelineSteps((steps) =>
      steps.map((step) =>
        step.id === stepId ? { ...step, notes: note } : step,
      ),
    );
    setEditingStep(null);
    setNewNote("");
  };

  const markStepComplete = (stepId: string) => {
    const currentDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    setTimelineSteps((steps) =>
      steps.map((step) => {
        if (step.id === stepId) {
          return {
            ...step,
            completed: true,
            current: false,
            date: step.completed ? step.date : currentDate,
          };
        }
        // Set next step as current
        const stepIndex = steps.findIndex((s) => s.id === stepId);
        const nextStep = steps[stepIndex + 1];
        if (nextStep && step.id === nextStep.id) {
          return { ...step, current: true };
        }
        return { ...step, current: false };
      }),
    );
  };

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
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-green-primary to-green-secondary text-white">
          <div>
            <h2 className="text-xl font-bold">Order Progress Timeline</h2>
            <p className="text-green-100">Order ID: {orderId}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Timeline Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-6">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connection line */}
                {index < timelineSteps.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200" />
                )}

                <div className="flex items-start space-x-4">
                  {/* Step Icon */}
                  <motion.div
                    className={`relative z-10 w-12 h-12 rounded-full ${step.color} flex items-center justify-center text-white shadow-lg`}
                    animate={{
                      scale: step.current ? [1, 1.1, 1] : 1,
                      boxShadow: step.current
                        ? "0 0 20px rgba(34, 197, 94, 0.5)"
                        : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    transition={{
                      scale: {
                        repeat: step.current ? Infinity : 0,
                        duration: 2,
                      },
                      boxShadow: { duration: 0.3 },
                    }}
                  >
                    <step.icon className="w-6 h-6" />
                    {step.completed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <CheckCircle className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-lg font-semibold ${
                          step.completed ? "text-gray-900" : "text-gray-500"
                        }`}
                      >
                        {step.title}
                        {step.current && (
                          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Current
                          </span>
                        )}
                      </h3>
                      {!step.completed && (
                        <button
                          onClick={() => markStepComplete(step.id)}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors text-sm"
                        >
                          Mark Complete
                        </button>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mt-1 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {step.date}
                    </p>

                    {/* Notes Section */}
                    <div className="mt-3">
                      {step.notes && editingStep !== step.id ? (
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <div className="flex items-start justify-between">
                            <p className="text-sm text-gray-700 flex-1">
                              <MessageSquare className="w-4 h-4 inline mr-2" />
                              {step.notes}
                            </p>
                            <button
                              onClick={() => {
                                setEditingStep(step.id);
                                setNewNote(step.notes || "");
                              }}
                              className="text-blue-600 hover:text-blue-800 text-sm ml-2"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      ) : editingStep === step.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Add notes for this step..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent resize-none"
                            rows={2}
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={() => addNote(step.id, newNote)}
                              className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingStep(null);
                                setNewNote("");
                              }}
                              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setEditingStep(step.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                        >
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Add note
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              {timelineSteps.filter((s) => s.completed).length} of{" "}
              {timelineSteps.length} steps completed
            </span>
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function OrdersManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [showTimeline, setShowTimeline] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500">
        <span>Dashboard</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Orders Management</span>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Orders Management
          </h1>
          <p className="text-gray-600 mt-1">
            View, add, track, and manage customer orders
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowTimeline(!showTimeline)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
          >
            <Clock className="w-4 h-4" />
            <span>Timeline</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-green-primary text-white rounded-lg hover:bg-green-secondary transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Order</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Total Orders", value: "142", icon: Package, color: "blue" },
          { title: "Processing", value: "28", icon: Clock, color: "yellow" },
          {
            title: "Completed",
            value: "89",
            icon: CheckCircle,
            color: "green",
          },
          { title: "Cancelled", value: "8", icon: AlertCircle, color: "red" },
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
                <p className="text-gray-600 text-sm">{stat.title}</p>
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

      {/* Timeline (conditional) */}
      {showTimeline && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <OrderTimeline />
        </motion.div>
      )}

      {/* Filters and Search */}
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
                placeholder="Search orders..."
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
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deadline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-primary to-green-secondary rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.customer}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {order.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge
                      status={order.status as keyof typeof orderStatuses}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    ${order.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.deadline}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => setSelectedOrderId(order.id)}
                      className="text-green-primary hover:text-green-secondary p-1 rounded transition-colors"
                      title="View Timeline"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800 p-1 rounded transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Admin Notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-yellow-50 border border-yellow-200 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          Admin Notes
        </h3>
        <textarea
          placeholder="Add notes visible only to administrators..."
          className="w-full h-24 p-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none bg-white"
        />
        <button className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
          Save Notes
        </button>
      </motion.div>

      {/* Order Timeline Modal */}
      <AnimatePresence>
        {selectedOrderId && (
          <OrderTimeline
            orderId={selectedOrderId}
            onClose={() => setSelectedOrderId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
