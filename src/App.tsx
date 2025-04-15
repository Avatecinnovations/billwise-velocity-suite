import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { supabase } from "./integrations/supabase/client";
import { AuthProvider } from "./contexts/AuthContext";
import { OnboardingProvider } from "./contexts/OnboardingContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import NewClient from "./pages/NewClient";
import Quotes from "./pages/Quotes";
import CreateQuote from "./pages/CreateQuote";
import Reports from "./pages/Reports";
import Security from "./pages/Security";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Invoices from "./pages/Invoices";
import CreateInvoice from "./pages/CreateInvoice";
import PaymentIntegration from "./pages/PaymentIntegration";
import SettingsPage from "./pages/SettingsPage";
import PaymentHistoryPage from "./pages/PaymentHistoryPage";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import { AdminLayout } from "@/components/admin/AdminLayout";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminUsers from "@/pages/admin/Users";
import AdminInvoices from "@/pages/admin/Invoices";
import AdminReports from "@/pages/admin/Reports";
import AdminSettings from "@/pages/admin/Settings";
import { TestConnection } from "@/components/TestConnection";

const App = () => {
  return (
    <AuthProvider>
      <OnboardingProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />

            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/update-password" element={<UpdatePassword />} />

            {/* Admin routes */}
            <Route path="/admin">
              <Route path="login" element={<AdminLogin />} />
              <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="invoices" element={<AdminInvoices />} />
                <Route path="reports" element={<AdminReports />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Route>

            {/* Protected routes with DashboardLayout */}
            <Route element={<PrivateRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/clients/new" element={<NewClient />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/invoices/new" element={<CreateInvoice />} />
                <Route path="/quotes" element={<Quotes />} />
                <Route path="/quotes/new" element={<CreateQuote />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route
                  path="/payment-history"
                  element={<PaymentHistoryPage />}
                />
                <Route
                  path="/payment-integration"
                  element={<PaymentIntegration />}
                />
                <Route path="/security" element={<Security />} />
                <Route path="/two-factor-auth" element={<TwoFactorAuth />} />
              </Route>
            </Route>

            {/* Onboarding and not found */}
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </OnboardingProvider>
      <TestConnection />
    </AuthProvider>
  );
};

export default App;
