import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "order" | "payment" | "inventory" | "employee" | "system";
  timestamp: Date;
  read: boolean;
  priority: "low" | "medium" | "high";
  actionUrl?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (
    notification: Omit<Notification, "id" | "timestamp" | "read">,
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New order received",
      message: "Libya Textile Co. placed a new order for Jacquard Velvet",
      type: "order",
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      read: false,
      priority: "high",
      actionUrl: "/orders",
    },
    {
      id: "2",
      title: "Low stock alert",
      message: "Cotton fabric running low - only 15 yards remaining",
      type: "inventory",
      timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      read: false,
      priority: "medium",
      actionUrl: "/inventory",
    },
    {
      id: "3",
      title: "Payment received",
      message: "Ahmed Textiles paid $5,000 for order ORD-002",
      type: "payment",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      read: false,
      priority: "medium",
      actionUrl: "/financial",
    },
    {
      id: "4",
      title: "Employee absence",
      message: "عبدالله الخطيب marked absent today",
      type: "employee",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      read: true,
      priority: "low",
      actionUrl: "/employees",
    },
    {
      id: "5",
      title: "Production milestone",
      message: "Order ORD-001 completed dyeing stage",
      type: "order",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      read: true,
      priority: "low",
      actionUrl: "/track-order/ORD-001/details",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );
  };

  const addNotification = (
    notificationData: Omit<Notification, "id" | "timestamp" | "read">,
  ) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };

    setNotifications((prev) => [newNotification, ...prev]);
  };

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Random chance to add a new notification
      if (Math.random() < 0.1) {
        // 10% chance every 30 seconds
        const randomNotifications = [
          {
            title: "Order status updated",
            message: "Order processing stage completed",
            type: "order" as const,
            priority: "medium" as const,
            actionUrl: "/orders",
          },
          {
            title: "Inventory threshold reached",
            message: "Silk fabric needs restocking",
            type: "inventory" as const,
            priority: "high" as const,
            actionUrl: "/inventory",
          },
          {
            title: "New customer inquiry",
            message: "Potential customer contacted for quote",
            type: "system" as const,
            priority: "low" as const,
            actionUrl: "/customers",
          },
        ];

        const randomIndex = Math.floor(
          Math.random() * randomNotifications.length,
        );
        addNotification(randomNotifications[randomIndex]);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
}
