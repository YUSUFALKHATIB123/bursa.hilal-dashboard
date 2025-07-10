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
  const [sidebarOpen, setSidebarOpen] = useState(true); // Start open on desktop
  const [isMobile, setIsMobile] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Set initial sidebar state based on device type
      if (mobile) {
        setSidebarOpen(false); // Closed on mobile
      } else {
        setSidebarOpen(true); // Open on desktop
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Close sidebar only on mobile - desktop keeps it open
  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
    // On desktop, do nothing - sidebar stays open
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 ${language === "ar" ? "font-arabic" : ""}`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={closeSidebar}
            style={{ touchAction: "none" }}
          />
        )}
      </AnimatePresence>

      <div
        className={`flex h-screen ${language === "ar" ? "flex-row-reverse" : "flex-row"}`}
      >
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.div
              initial={{
                x: language === "ar" ? "100%" : "-100%",
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: language === "ar" ? "100%" : "-100%",
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
                opacity: { duration: 0.2 },
              }}
              className={`
                ${isMobile ? "fixed z-50" : "relative z-10"}
                ${language === "ar" ? (isMobile ? "right-0" : "") : isMobile ? "left-0" : ""}
                h-full ${isMobile ? "w-80 max-w-[80vw]" : "w-64"}
                bg-white shadow-2xl
                ${language === "ar" ? "border-l border-gray-200" : "border-r border-gray-200"}
              `}
            >
              <Sidebar onItemClick={closeSidebar} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Navbar */}
          <Navbar
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
            isMobile={isMobile}
          />

          {/* Page Content */}
          <main
            className={`
              flex-1 overflow-auto bg-gray-50 p-4 md:p-6
              transition-all duration-300 ease-out
              ${
                !isMobile && sidebarOpen
                  ? language === "ar"
                    ? "mr-0"
                    : "ml-0"
                  : ""
              }
            `}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`
                max-w-7xl w-full
                ${language === "ar" ? "mr-auto ml-auto" : "mx-auto"}
              `}
            >
              {children || <Outlet />}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
