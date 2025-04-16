
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
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-200 ease-in-out md:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 border-b flex items-center justify-between px-6">
            <Link to="/" className="flex items-center gap-2">
              <Logo className="h-8 w-auto" />
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <SidebarContent />
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block w-64 border-r bg-white sticky top-0 h-screen">
        <SidebarContent />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-white border-b md:hidden">
          <div className="flex h-16 items-center px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100 mr-4"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
            <div className="flex-1 flex justify-center">
              <Logo className="h-8 w-auto" />
            </div>
            <div className="ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    {onboardingData?.profilePicture ? (
                      <img
                        src={onboardingData.profilePicture}
                        alt="Profile"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <Users className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {onboardingData?.fullName || user?.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/help" className="flex items-center">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Help
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Desktop nav bar */}
        <div className="hidden md:block">
          <TopNavbar />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
