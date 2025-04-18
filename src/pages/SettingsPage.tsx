
import { useState } from "react";
import { Settings, Building, DollarSign, Bell, Palette, CreditCard } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BusinessSettings from "@/components/settings/BusinessSettings";
import TaxSettings from "@/components/settings/TaxSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("business");

  return (
    <div className="container max-w-6xl mx-auto py-4 md:py-8 px-4">
      <div className="flex items-center mb-4 md:mb-6">
        <Settings className="h-5 w-5 md:h-6 md:w-6 mr-2 text-gray-700" />
        <h1 className="text-xl md:text-2xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="business" value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-8">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full mb-4 md:mb-8 overflow-x-auto">
          <TabsTrigger value="business" className="flex items-center gap-2 px-2 md:px-4">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">Business</span>
          </TabsTrigger>
          <TabsTrigger value="tax" className="flex items-center gap-2 px-2 md:px-4">
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">Tax</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2 px-2 md:px-4">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2 px-2 md:px-4">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Templates</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2 px-2 md:px-4">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Payment</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="business">
          <BusinessSettings />
        </TabsContent>

        <TabsContent value="tax">
          <TaxSettings />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="templates">
          <div className="bg-white p-4 md:p-8 rounded-lg shadow text-center">
            <Palette className="h-12 w-12 md:h-16 md:w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-lg md:text-xl font-semibold mb-2">Invoice Templates</h2>
            <p className="text-gray-600 mb-4 md:mb-6">
              Customize the look and feel of your invoices with our template editor.
            </p>
            <button className="bg-brand-primary text-white px-4 py-2 rounded hover:bg-brand-primary/90">
              Open Template Editor
            </button>
          </div>
        </TabsContent>

        <TabsContent value="payment">
          <div className="bg-white p-4 md:p-8 rounded-lg shadow text-center">
            <CreditCard className="h-12 w-12 md:h-16 md:w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-lg md:text-xl font-semibold mb-2">Payment Integrations</h2>
            <p className="text-gray-600 mb-4 md:mb-6">
              Connect your payment processors to accept online payments.
            </p>
            <a href="/payment-integration" className="bg-brand-primary text-white px-4 py-2 rounded hover:bg-brand-primary/90 inline-block">
              Manage Payment Integrations
            </a>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
