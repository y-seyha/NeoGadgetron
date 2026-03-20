import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Home,
  Package,
  Users,
  Settings,
  BarChart2,
  ShoppingCart,
} from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { useState } from "react";

type LinkItem = {
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
  path?: string;
  children?: LinkItem[];
};

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
  const { user, logout } = useAuth();
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

  const [sellerOpen, setSellerOpen] = useState(true);

  const baseLinks: LinkItem[] = [
    { name: "Profile", icon: CiUser, path: "/profile" },
    { name: "Home", icon: Home, path: "/" },
    { name: "Cart", icon: Package, path: "/cart" },
    { name: "Orders", icon: ShoppingCart, path: "/orders" },
    { name: "Review", icon: Users, path: "/review" },
    { name: "Wishlist", icon: FaHeart, path: "/wishlist" },
    { name: "Reports", icon: BarChart2, path: "/reports" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  const adminLinks: LinkItem[] = [
    { name: "Admin Dashboard", icon: Home, path: "/admin" },
    { name: "Manage Users", icon: Users, path: "/admin/users" },
    { name: "Manage Products", icon: Package, path: "/admin/products" },
    { name: "Reports", icon: BarChart2, path: "/admin/reports" },
  ];

  const linksToShow: LinkItem[] = [...baseLinks];

  if (user?.role === "seller") {
    linksToShow.push({
      name: "Seller",
      icon: Home, 
      children: [
        { name: "Dashboard", icon: Home, path: "/seller/dashboard" },
        { name: "Products", icon: Package, path: "/seller/products" },
        { name: "Orders", icon: ShoppingCart, path: "/seller/orders" },
        { name: "Analytics", icon: BarChart2, path: "/seller/analytics" },
      ],
    });
  } else if (user?.role === "admin") {
    linksToShow.push(...adminLinks);
  }

  const renderLinks = () =>
    linksToShow.map((link) => {
      const isActive = location.pathname === link.path;

      if (link.children) {
        return (
          <div key={link.name} className="space-y-1">
            <button
              onClick={() => setSellerOpen(!sellerOpen)}
              className={`flex items-center gap-3 w-full px-4 py-3 text-sm rounded-lg transition
                text-muted-foreground hover:bg-muted dark:text-muted-foreground-dark dark:hover:bg-muted-dark
                ${isActive ? "bg-primary text-white font-semibold dark:bg-primary-dark" : ""}
              `}
            >
              {link.icon && <link.icon className="h-5 w-5" />}
              {sidebarOpen && <span>{link.name}</span>}
              {sidebarOpen && (
                <span className="ml-auto">{sellerOpen ? "▲" : "▼"}</span>
              )}
            </button>

            {sellerOpen && (
              <div className="space-y-1 pl-4">
                {link.children.map((child) => {
                  const childActive = location.pathname === child.path;
                  return (
                    <Link
                      key={child.path}
                      to={child.path!}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition
                        ${
                          childActive
                            ? "bg-primary text-white font-semibold dark:bg-primary-dark"
                            : "text-muted-foreground hover:bg-muted dark:text-muted-foreground-dark dark:hover:bg-muted-dark"
                        }`}
                    >
                      {child.icon && <child.icon className="h-5 w-5" />}
                      {sidebarOpen && <span>{child.name}</span>}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      }

      return (
        <Link
          key={link.path}
          to={link.path!}
          onClick={() => setMobileSidebarOpen(false)}
          className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition
            ${
              isActive
                ? "bg-primary text-white font-semibold dark:bg-primary-dark"
                : "text-muted-foreground hover:bg-muted dark:text-muted-foreground-dark dark:hover:bg-muted-dark"
            }`}
        >
          {link.icon && <link.icon className="h-5 w-5" />}
          {sidebarOpen && <span>{link.name}</span>}
        </Link>
      );
    });

  const desktopSidebar = (
    <aside
      className={`hidden md:flex flex-col bg-background border-r transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex-1 flex flex-col justify-between h-full">
        <nav className="mt-4 space-y-1">{renderLinks()}</nav>
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
        <nav className="flex-1 mt-4 space-y-1">{renderLinks()}</nav>
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
