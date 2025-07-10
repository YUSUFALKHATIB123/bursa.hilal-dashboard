import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile); // Open on desktop, closed on mobile
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setIsMobile(true) && setSidebarOpen(false);

  return (
    <div
      className={`min-h-screen bg-gray-50 ${language === "ar" ? "font-arabic" : ""}`}
    >
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      <div className="flex h-screen">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: language === "ar" ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: language === "ar" ? "100%" : "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`
                ${isMobile ? "fixed z-50" : "relative z-10"}
                ${language === "ar" ? "right-0" : "left-0"}
                h-full w-64 bg-white border-r border-gray-200 shadow-lg
              `}
            >
              <Sidebar onItemClick={closeSidebar} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <Navbar
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
            isMobile={isMobile}
          />

          {/* Page Content */}
          <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-7xl mx-auto w-full"
            >
              {children || <Outlet />}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
