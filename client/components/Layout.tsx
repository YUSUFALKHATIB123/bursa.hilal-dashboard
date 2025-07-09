import { useState } from "react";
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
  const { language, dir } = useLanguage();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div
      className={`min-h-screen bg-gray-50 ${dir === "rtl" ? "rtl" : "ltr"}`}
      dir={dir}
    >
      <div className="flex">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: language === "ar" ? 300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: language === "ar" ? 300 : -300, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-y-0 z-40 md:relative"
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 flex flex-col min-h-screen">
          <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

          <main className="flex-1 p-6 overflow-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-7xl mx-auto"
            >
              {children || <Outlet />}
            </motion.div>
          </main>
        </div>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
