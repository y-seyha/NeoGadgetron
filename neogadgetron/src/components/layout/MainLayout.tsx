import { useState } from "react";
import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";
import { useTheme } from "@/components/Theme/theme-provider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { theme } = useTheme();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className={`${theme === "dark" ? "dark" : ""} flex flex-col h-screen`}>
      <Navbar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
      />

      <div className="flex flex-1 overflow-hidden relative z-50">
        <Sidebar
          sidebarOpen={sidebarOpen}
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
        />

        <main
          className="flex-1 overflow-auto p-6 
                         bg-gray-50 dark:bg-black
                         text-gray-900 dark:text-gray-100 
                         transition-colors duration-300 z-0"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
