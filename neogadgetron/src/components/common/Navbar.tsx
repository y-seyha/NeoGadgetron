import { Link } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "../Theme/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuth } from "../../hooks/useAuth";
import { getInitials } from "@/utils/helper";
import { useCart } from "@/hooks/useCart";
import Search from "../Homepage/Search";

type NavbarProps = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
};

export default function Navbar({
  sidebarOpen,
  toggleSidebar,
  mobileSidebarOpen,
  setMobileSidebarOpen,
}: NavbarProps) {
  const { setTheme } = useTheme();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const { totalQuantity } = useCart();
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-background border-b sticky top-0 z-50 overflow-visible">
      <div className="flex items-center gap-4">
        {/* Mobile Sidebar Toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden "
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        >
          {mobileSidebarOpen ? <X /> : <Menu />}
        </Button>

        {/* Desktop Sidebar Collapse Toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="hidden md:flex"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </Button>

        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight">
          Gadgetron
        </Link>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center w-full max-w-md mx-6 relative">
        <Search />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {" "}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link to="/cart" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -top-2 -right-2 text-xs bg-primary text-white rounded-full px-1.5 py-0.5 dark:text-black">
            {totalQuantity}
          </span>
        </Link>
        {isLoading ? (
          <div>Loading...</div>
        ) : isAuthenticated && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <div
                  className="
    h-6 w-6 rounded-full 
    bg-primary text-white 
    dark:bg-muted-foreground dark:text-muted 
    flex items-center justify-center 
    text-xs font-semibold
  "
                >
                  {getInitials(`${user.first_name} ${user.last_name}`)}
                </div>
                <span>{user.first_name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/profile">Edit Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to="/login">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Login
            </Button>
          </Link>
        )}
        {!isLoading && isAuthenticated && user ? (
          user.role === "seller" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="secondary">
                  Seller Dashboard
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/seller/me">Seller Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/seller/dashboard">Seller Dashboard</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/become-seller"
              className="hidden sm:block text-sm font-medium hover:text-primary transition"
            >
              Become Seller
            </Link>
          )
        ) : (
          <Link
            to="/become-seller"
            className="hidden sm:block text-sm font-medium hover:text-primary transition"
          >
            Become Seller
          </Link>
        )}
      </div>
    </header>
  );
}
