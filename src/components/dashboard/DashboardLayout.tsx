import React, { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import {
  Home,
  FileText,
  PieChart,
  Settings,
  ClipboardList,
  Plus,
  ChevronDown,
  Users,
  Calendar,
  PlusCircle,
  Bell,
  Search,
  User,
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
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { APP_LOGO, APP_LOGO_ALT, APP_NAME } from "@/lib/constants";

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
  const [searchQuery, setSearchQuery] = useState("");

  const isActive = (href: string) => location.pathname === href;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  const NavLink = ({ item }: { item: NavItem }) => (
    <Link
      to={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
        isActive(item.href)
          ? "text-[#0f172a] bg-gray-100"
          : "text-gray-600 hover:text-[#0f172a] hover:bg-gray-50"
      )}
    >
      {item.icon}
      {item.label}
    </Link>
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-[205.8px] h-[500px] border-r bg-white fixed left-0 top-0">
        {/* Logo */}
        <div className="px-6 py-4 border-b">
          <Link to="/" className="flex items-center gap-2">
            {onboardingData?.logo ? (
              <img
                src={onboardingData.logo}
                alt="Company Logo"
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-[#0f172a] flex items-center justify-center text-white font-bold">
                {onboardingData?.companyName?.[0] || "D"}
              </div>
            )}
            <span className="text-lg font-medium">
              {onboardingData?.companyName || "Delivoice"}
            </span>
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
                    >
                      List of Clients
                    </Link>
                    <Link
                      to="/clients/new"
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-[#0f172a] hover:bg-gray-50 rounded-md"
                    >
                      New Client
                    </Link>
                    <Link
                      to="/clients/aged-balance"
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-[#0f172a] hover:bg-gray-50 rounded-md"
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
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-[205.8px]">
        {/* Top Bar */}
        <div className="h-16 border-b bg-white">
          <div className="flex h-full items-center px-6">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            {/* Right Side Actions */}
            <div className="ml-auto flex items-center space-x-4">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                      3
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                    <div>
                      <p className="font-medium">New invoice received</p>
                      <p className="text-sm text-gray-500">
                        From {onboardingData?.companyName || "Acme Corp"}
                      </p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 mt-2" />
                    <div>
                      <p className="font-medium">Payment received</p>
                      <p className="text-sm text-gray-500">
                        $1,234.00 from John Doe
                      </p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2" />
                    <div>
                      <p className="font-medium">Quote accepted</p>
                      <p className="text-sm text-gray-500">
                        Quote #1234 was accepted
                      </p>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Profile */}
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
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {onboardingData?.fullName || user?.email}
                      </p>
                      <p className="text-xs leading-none text-gray-500">
                        {onboardingData?.role ||
                          user?.user_metadata?.role ||
                          "User"}
                      </p>
                    </div>
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
                      Help & Support
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={() => signOut()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
