import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Home,
  Package,
  Users,
  Settings,
  BarChart2,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import type { AxiosError } from "axios";

const sidebarLinks = [
  { name: "Dashboard", icon: Home, path: "/dashboard" },
  { name: "Products", icon: Package, path: "/products" },
  { name: "Orders", icon: ShoppingCart, path: "/orders" },
  { name: "Customers", icon: Users, path: "/customers" },
  { name: "Reports", icon: BarChart2, path: "/reports" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

type SidebarProps = {
  sidebarOpen: boolean;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
};

export default function Sidebar({
  sidebarOpen,
  mobileSidebarOpen,
  setMobileSidebarOpen,
}: SidebarProps) {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Logout failed");
    } finally {
      setMobileSidebarOpen(false);
    }
  };

  // Desktop sidebar
  const desktopSidebar = (
    <aside
      className={`hidden md:flex flex-col bg-background border-r transition-all duration-300 z-50 ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex-1 flex flex-col justify-between h-full">
        <nav className="mt-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition hover:bg-muted ${
                  isActive
                    ? "bg-primary text-white font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                <link.icon className="h-5 w-5" />
                {sidebarOpen && <span>{link.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom logout only when sidebarOpen is true */}
        {sidebarOpen && (
          <div className="px-4 py-4 border-t">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </aside>
  );

  // Mobile sidebar overlay
  const mobileSidebar = mobileSidebarOpen && (
    <div className="md:hidden fixed inset-0 z-50 bg-black/30">
      <aside className="fixed left-0 top-0 h-full w-64 bg-background border-r shadow-lg z-50 transition-transform">
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <span className="font-bold text-lg">Gadgetron</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileSidebarOpen(false)}
          >
            X
          </Button>
        </div>
        <nav className="flex-1 mt-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition hover:bg-muted ${
                  isActive
                    ? "bg-primary text-white font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
          <div className="absolute bottom-0 left-0 w-full px-4 py-4 border-t bg-background">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </nav>
      </aside>
    </div>
  );

  return (
    <>
      {desktopSidebar}
      {mobileSidebar}
    </>
  );
}
