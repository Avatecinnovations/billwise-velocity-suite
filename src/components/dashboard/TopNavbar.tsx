import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  Search,
  User,
  LogOut,
  Settings,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Logo } from "@/assets/images/logo";

const UserIcon = () => (
  <svg
    viewBox="0 0 1024 1024"
    className="h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="256" cy="256" r="128" className="fill-current" />
    <circle cx="768" cy="256" r="64" className="fill-current" />
    <circle cx="256" cy="768" r="64" className="fill-current" />
    <circle cx="768" cy="768" r="128" className="fill-current" />
    <path
      d="M512 512m-192 0a192 192 0 1 0 384 0 192 192 0 1 0-384 0"
      className="fill-current"
    />
  </svg>
);

const TopNavbar = () => {
  const { user, signOut } = useAuth();
  const { onboardingData } = useOnboarding();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="h-16 border-b bg-white flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex-1 max-w-md">
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
                <p className="text-sm text-gray-500">From Acme Corp</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-start gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 mt-2" />
              <div>
                <p className="font-medium">Payment received</p>
                <p className="text-sm text-gray-500">$1,234.00 from John Doe</p>
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
              className="relative h-8 w-8 rounded-full text-gray-700 hover:text-gray-900"
            >
              <UserIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
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
            <DropdownMenuItem
              onClick={handleSignOut}
              className="flex items-center"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopNavbar;
