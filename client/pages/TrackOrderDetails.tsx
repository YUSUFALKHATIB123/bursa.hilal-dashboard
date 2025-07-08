import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Package,
  Palette,
  Scissors,
  Shield,
  PlayCircle,
  Truck,
  CheckCircle,
  Clock,
  Calendar,
  MessageSquare,
  User,
  DollarSign,
  Edit,
  Save,
  X,
} from "lucide-react";

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

interface OrderDetails {
  id: string;
  customer: string;
  product: string;
  quantity: string;
  colors: string;
  date: string;
  total: number;
  depositPaid: number;
  remaining: number;
  paymentMethod: string;
  notes: string;
  status: string;
}

// Mock data - would come from API in real app
const getOrderDetails = (orderId: string): OrderDetails | null => {
  const orders: { [key: string]: OrderDetails } = {
    "ORD-001": {
      id: "ORD-001",
      customer: "Libya Textile Co.",
      product: "Jacquard Velvet",
      quantity: "1200 meters",
      colors: "Gold, Cream, Beige",
      date: "2025-07-07",
      total: 18000,
      depositPaid: 3000,
      remaining: 15000,
      paymentMethod: "Wire Transfer",
      notes: "Special packaging requested",
      status: "processing",
    },
    "ORD-002": {
      id: "ORD-002",
      customer: "Ahmed Textiles Ltd.",
      product: "Cotton Blend",
      quantity: "800 meters",
      colors: "White, Blue",
      date: "2025-07-05",
      total: 12000,
      depositPaid: 5000,
      remaining: 7000,
      paymentMethod: "Bank Transfer",
      notes: "Rush order",
      status: "processing",
    },
  };
  return orders[orderId] || null;
};

const getTimelineSteps = (orderId: string): TimelineStep[] => {
  // Libya Textile Co. specific timeline
  if (orderId === "ORD-001") {
    return [
      {
        id: "1",
        title: "Order Received",
        date: "Jul 07, 2025 - 09:30 AM",
        completed: true,
        icon: Package,
        color: "bg-blue-500",
        notes:
          "Order confirmed with customer requirements. Special packaging requested noted.",
      },
      {
        id: "2",
        title: "Sent to Dyeing",
        date: "Jul 08, 2025 - 11:00 AM",
        completed: true,
        current: true,
        icon: Palette,
        color: "bg-purple-500",
        notes:
          "Materials sent to dyeing department - Colors: Gold, Cream, Beige. Estimated completion: 3 days.",
      },
      {
        id: "3",
        title: "Back from Dyeing",
        date: "Expected: Jul 11, 2025",
        completed: false,
        icon: CheckCircle,
        color: "bg-green-500",
      },
      {
        id: "4",
        title: "Sent to Stitching",
        date: "Expected: Jul 12, 2025",
        completed: false,
        icon: Scissors,
        color: "bg-orange-500",
      },
      {
        id: "5",
        title: "Quality Check",
        date: "Expected: Jul 18, 2025",
        completed: false,
        icon: Shield,
        color: "bg-yellow-500",
      },
      {
        id: "6",
        title: "Ready for Delivery",
        date: "Expected: Jul 20, 2025",
        completed: false,
        icon: PlayCircle,
        color: "bg-indigo-500",
      },
      {
        id: "7",
        title: "Delivered",
        date: "Expected: Jul 25, 2025",
        completed: false,
        icon: Truck,
        color: "bg-gray-500",
      },
    ];
  }

  // Default timeline for other orders
  return [
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
      notes: "Materials sent to dyeing department",
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
      date: "Expected: Jan 22, 2024",
      completed: false,
      icon: Shield,
      color: "bg-yellow-500",
    },
    {
      id: "6",
      title: "Ready for Delivery",
      date: "Expected: Jan 24, 2024",
      completed: false,
      icon: PlayCircle,
      color: "bg-indigo-500",
    },
    {
      id: "7",
      title: "Delivered",
      date: "Expected: Jan 25, 2024",
      completed: false,
      icon: Truck,
      color: "bg-gray-500",
    },
  ];
};

export default function TrackOrderDetails() {
  const { orderId } = useParams<{ orderId: string }>();
  const [timelineSteps, setTimelineSteps] = useState<TimelineStep[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [newNote, setNewNote] = useState("");
  const [editingStep, setEditingStep] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      setOrderDetails(getOrderDetails(orderId));
      setTimelineSteps(getTimelineSteps(orderId));
    }
  }, [orderId]);

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Order Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The order ID "{orderId}" could not be found.
          </p>
          <Link
            to="/track-order"
            className="text-green-primary hover:text-green-secondary"
          >
            Return to Track Orders
          </Link>
        </div>
      </div>
    );
  }

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

  const completedSteps = timelineSteps.filter((s) => s.completed).length;
  const progressPercentage = (completedSteps / timelineSteps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-700">
          Dashboard
        </Link>
        <span className="mx-2">/</span>
        <Link to="/track-order" className="hover:text-gray-700">
          Track Orders
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Order Details</span>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <Link
            to="/track-order"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
            <p className="text-gray-600">Order ID: {orderDetails.id}</p>
          </div>
        </div>
      </motion.div>

      {/* Order Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-green-primary to-green-secondary p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">{orderDetails.customer}</h2>
              <p className="text-green-100">{orderDetails.product}</p>
            </div>
            <div className="text-right">
              <p className="text-green-100">Total Amount</p>
              <p className="text-2xl font-bold">
                ${orderDetails.total.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600">Quantity</p>
              <p className="font-semibold">{orderDetails.quantity}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Colors</p>
              <p className="font-semibold">{orderDetails.colors}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Order Date</p>
              <p className="font-semibold">{orderDetails.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment Method</p>
              <p className="font-semibold">{orderDetails.paymentMethod}</p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Payment Status</h3>
            <div className="flex items-center justify-between">
              <div className="flex space-x-6">
                <div>
                  <p className="text-sm text-gray-600">Deposit Paid</p>
                  <p className="font-semibold text-green-600">
                    ${orderDetails.depositPaid.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Remaining</p>
                  <p className="font-semibold text-orange-600">
                    ${orderDetails.remaining.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${(orderDetails.depositPaid / orderDetails.total) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Order Notes */}
          {orderDetails.notes && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Order Notes:</strong> {orderDetails.notes}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Progress Overview</h3>
          <span className="text-sm text-gray-600">
            {completedSteps} of {timelineSteps.length} steps completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-gradient-to-r from-green-primary to-green-secondary h-3 rounded-full"
          />
        </div>
        <p className="text-sm text-gray-600">
          {progressPercentage.toFixed(0)}% complete
        </p>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Order Timeline
        </h3>

        <div className="space-y-8">
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
                <div className="absolute left-8 top-16 w-0.5 h-24 bg-gray-200" />
              )}

              <div className="flex items-start space-x-6">
                {/* Step Icon */}
                <motion.div
                  className={`relative z-10 w-16 h-16 rounded-full ${step.color} flex items-center justify-center text-white shadow-lg`}
                  animate={{
                    scale: step.current ? [1, 1.05, 1] : 1,
                    boxShadow: step.current
                      ? "0 0 30px rgba(34, 197, 94, 0.4)"
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
                  <step.icon className="w-8 h-8" />
                  {step.completed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white"
                    >
                      <CheckCircle className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </motion.div>

                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4
                      className={`text-xl font-semibold ${
                        step.completed ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                      {step.current && (
                        <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          Current Step
                        </span>
                      )}
                    </h4>
                    {!step.completed && (
                      <button
                        onClick={() => markStepComplete(step.id)}
                        className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    {step.date}
                  </p>

                  {/* Notes Section */}
                  <div className="mt-4">
                    {step.notes && editingStep !== step.id ? (
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-start justify-between">
                          <p className="text-gray-700 flex-1">
                            <MessageSquare className="w-5 h-5 inline mr-2" />
                            {step.notes}
                          </p>
                          <button
                            onClick={() => {
                              setEditingStep(step.id);
                              setNewNote(step.notes || "");
                            }}
                            className="text-blue-600 hover:text-blue-800 ml-3 p-1"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : editingStep === step.id ? (
                      <div className="space-y-3">
                        <textarea
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          placeholder="Add notes for this step..."
                          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent resize-none"
                          rows={3}
                        />
                        <div className="flex space-x-3">
                          <button
                            onClick={() => addNote(step.id, newNote)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save</span>
                          </button>
                          <button
                            onClick={() => {
                              setEditingStep(null);
                              setNewNote("");
                            }}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2"
                          >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditingStep(step.id)}
                        className="text-blue-600 hover:text-blue-800 flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <MessageSquare className="w-5 h-5" />
                        <span>Add note</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Admin Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-yellow-50 border border-yellow-200 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          Admin Controls
        </h3>
        <p className="text-yellow-700 text-sm mb-4">
          Update order progress and add internal notes visible only to
          administrators.
        </p>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
            Edit Order Details
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:blue-yellow-700 transition-colors">
            Send Update to Customer
          </button>
        </div>
      </motion.div>
    </div>
  );
}
