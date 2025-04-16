import React, { useState, useEffect } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import {
  Home,
  FileText,
  PieChart,
  Settings,
  ClipboardList,
  Menu as MenuIcon,
  X,
  ChevronDown,
  Users,
  LogOut,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Logo } from "@/assets/images/logo";
import { APP_NAME } from "@/lib/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import TopNavbar from "./TopNavbar";
import { Sidebar } from "./Sidebar";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const mainNav: NavItem[] = [
  { icon: <Home className="h-5 w-5" />, label: "Home", href: "/dashboard" },
  {
    icon: <FileText className="h-5 w-5" />,
    label: "Invoices",
    href: "/invoices",
  },
  {
    icon: <ClipboardList className="h-5 w-5" />,
    label: "Quotes",
    href: "/quotes",
  },
  {
    icon: <PieChart className="h-5 w-5" />,
    label: "Reports",
    href: "/reports",
  },
];

const secondaryNav: NavItem[] = [
  {
    icon: <Settings className="h-5 w-5" />,
    label: "Settings",
    href: "/settings",
  },
];

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { onboardingData } = useOnboarding();
  const [clientsExpanded, setClientsExpanded] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const isActive = (href: string) => location.pathname === href;

  const NavLink = ({ item }: { item: NavItem }) => (
    <Link
      to={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
        isActive(item.href)
          ? "text-[#0f172a] bg-gray-100"
          : "text-gray-600 hover:text-[#0f172a] hover:bg-gray-50"
      )}
      onClick={() => isMobile && setSidebarOpen(false)}
    >
      {item.icon}
      {item.label}
    </Link>
  );

  // Sidebar component to avoid duplication
  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="px-6 py-4 border-b">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="h-8 w-auto" />
        </Link>
      </div>

      {/* Navigation */}
      <div className="px-6 py-4">
        <nav className="space-y-6">
          <div>
            <div className="mb-2">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Menu
              </h2>
            </div>
            <div className="space-y-1">
              {mainNav.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Clients
              </h2>
            </div>
            <div className="space-y-1">
              <button
                onClick={() => setClientsExpanded(!clientsExpanded)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#0f172a] hover:bg-gray-50 rounded-md"
              >
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5" />
                  Clients
                </div>
                <ChevronDown
                  className={`h-4 w-4 transform ${
                    clientsExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {clientsExpanded && (
                <div className="ml-10 space-y-1 mt-1">
                  <Link
                    to="/clients"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-[#0f172a] hover:bg-gray-50 rounded-md"
                    onClick={() => isMobile && setSidebarOpen(false)}
                  >
                    List of Clients
                  </Link>
                  <Link
                    to="/clients/new"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-[#0f172a] hover:bg-gray-50 rounded-md"
                    onClick={() => isMobile && setSidebarOpen(false)}
                  >
                    New Client
                  </Link>
                  <Link
                    to="/clients/aged-balance"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-[#0f172a] hover:bg-gray-50 rounded-md"
                    onClick={() => isMobile && setSidebarOpen(false)}
                  >
                    Aged Balance
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="mb-2">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Settings
              </h2>
            </div>
            <div className="space-y-1">
              {secondaryNav.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Sidebar Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <MenuIcon className="h-6 w-6" />
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:pl-64">
        <TopNavbar />
        <main className="pt-16 min-h-screen">
          <div className="container mx-auto p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
