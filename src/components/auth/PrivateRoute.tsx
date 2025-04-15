
import { Navigate, Outlet, useLocation } from "react-router-dom";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";

export const PrivateRoute = () => {
  const { user, loading, isAdmin, userRole, onboardingCompleted } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-brand-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if the path is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin') || 
                       location.pathname.startsWith('/dashboard/team') || 
                       location.pathname.startsWith('/dashboard/clients') || 
                       location.pathname.startsWith('/dashboard/today') ||
                       location.pathname.startsWith('/dashboard/transactions') ||
                       location.pathname.startsWith('/dashboard/invoices') ||
                       location.pathname.startsWith('/dashboard/reminders') ||
                       location.pathname.startsWith('/dashboard/aged-balance') ||
                       location.pathname.startsWith('/dashboard/settings/') ||
                       location.pathname.startsWith('/dashboard/company/');

  // Check if the path is an accountant route
  const isAccountantRoute = location.pathname.startsWith('/accountant');

  // Check if the path is a client portal route
  const isClientRoute = location.pathname.startsWith('/client-portal');

  // Check if the path is the onboarding route
  const isOnboardingRoute = location.pathname === '/onboarding';
  
  // Check if 2FA is required
  // This is a placeholder. In a real implementation, you would check if the user
  // has completed 2FA for this session
  const requires2FA = user && !isAdmin && location.pathname !== '/2fa' && false; // Set to true to test 2FA flow
  
  if (requires2FA) {
    return <Navigate to="/2fa" state={{ from: location, email: user.email }} replace />;
  }
  
  // Redirect to onboarding if user is authenticated but hasn't completed onboarding
  // Skip this check for admin users and when already on the onboarding route
  if (user && !isAdmin && !onboardingCompleted && !isOnboardingRoute && !isAdminRoute) {
    return <Navigate to="/onboarding" state={{ from: location }} replace />;
  }

  // For admin routes, only allow access to admin users
  if (isAdminRoute && !isAdmin) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  // For accountant routes, allow only accountants and admins
  if (isAccountantRoute && userRole !== 'accountant' && !isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // For client portal routes, allow only clients, accountants, and admins
  if (isClientRoute && userRole !== 'client' && userRole !== 'accountant' && !isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // For regular routes, allow access to authenticated users based on their role
  if ((user && !isAdminRoute && !isAccountantRoute && !isClientRoute) || 
      (isAdmin && isAdminRoute) || 
      (userRole === 'accountant' && (isAccountantRoute || isClientRoute)) || 
      (userRole === 'client' && isClientRoute)) {
    return <Outlet />;
  }

  // Redirect unauthenticated users to the appropriate login page
  if (isAdminRoute) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};
