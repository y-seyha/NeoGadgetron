import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "../Theme/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-background border-b sticky top-0 z-50">
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
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search products..." className="pl-9" />
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
        <Link
          to="/seller"
          className="hidden sm:block text-sm font-medium hover:text-primary transition"
        >
          Become Seller
        </Link>
        <Link to="/cart" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -top-2 -right-2 text-xs bg-primary text-white rounded-full px-1.5 py-0.5">
            2
          </span>
        </Link>
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
      </div>
    </header>
  );
}
