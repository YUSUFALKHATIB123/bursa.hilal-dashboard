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
  const [sidebarOpen, setSidebarOpen] = useState(false); // Start closed on mobile
  const [isMobile, setIsMobile] = useState(false);
  const { language, dir } = useLanguage();

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      const isMobileScreen = window.innerWidth < 768;
      setIsMobile(isMobileScreen);
      // Auto-close sidebar on mobile, auto-open on desktop
      if (!isMobileScreen) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 ${language === "ar" ? "font-arabic" : ""}`}
      style={{ direction: dir }}
    >
      <div
        className={`flex h-screen ${language === "ar" ? "flex-row-reverse" : ""}`}
      >
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <>
              {/* Mobile Overlay */}
              {isMobile && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-black/50 z-40"
                  onClick={closeSidebar}
                  style={{ touchAction: "none" }}
                />
              )}

              {/* Sidebar Container */}
              <motion.div
                initial={{
                  x: language === "ar" ? "100%" : "-100%",
                  opacity: isMobile ? 0 : 1,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                exit={{
                  x: language === "ar" ? "100%" : "-100%",
                  opacity: isMobile ? 0 : 1,
                }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 200,
                  duration: 0.3,
                }}
                className={`
                  ${
                    isMobile
                      ? `fixed ${language === "ar" ? "right-0" : "left-0"} top-0 bottom-0 z-50`
                      : "relative"
                  }
                  w-64 bg-white border-r border-gray-200 flex-shrink-0
                `}
                style={{
                  touchAction: "pan-y",
                  WebkitTouchCallout: "none",
                  WebkitUserSelect: "none",
                }}
              >
                <Sidebar onItemClick={closeSidebar} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Navbar */}
          <div className="bg-white border-b border-gray-200 z-30 relative">
            <Navbar
              sidebarOpen={sidebarOpen}
              toggleSidebar={toggleSidebar}
              isMobile={isMobile}
            />
          </div>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={`p-4 md:p-6 max-w-7xl w-full ${language === "ar" ? "mr-auto" : "mx-auto"}`}
              style={{
                touchAction: "pan-y",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {children || <Outlet />}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
