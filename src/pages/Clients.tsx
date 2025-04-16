
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Plus, 
  Filter, 
  Download,
  MoreHorizontal,
  Search,
  ChevronDown,
  Users,
} from "lucide-react";
import { BadgeCustom } from "@/components/ui/badge-custom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Clients = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  // Mock client data
  const clients = [
    {
      name: "Acme Corp",
      email: "contact@acmecorp.com",
      phone: "(555) 123-4567",
      status: "active" as const,
      totalInvoices: 12,
    },
    {
      name: "Tech Solutions Inc.",
      email: "info@techsolutions.com",
      phone: "(555) 987-6543",
      status: "active" as const,
      totalInvoices: 8,
    },
    {
      name: "Global Enterprises",
      email: "support@globalent.com",
      phone: "(555) 456-7890",
      status: "inactive" as const,
      totalInvoices: 5,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">
            Manage and track all your clients
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="h-9 px-3 gap-1.5"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button 
            asChild
            size="sm"
            className="h-9 px-3 gap-1.5 bg-[#0f172a] hover:bg-[#0f172a]/90"
          >
            <Link to="/clients/new">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Client</span>
            </Link>
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="px-4 py-4 md:px-6 md:py-5 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-full sm:w-72 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                className="pl-8 pr-3 py-2"
                placeholder="Search clients..."
              />
            </div>
            <div className="flex flex-wrap gap-2 sm:ml-auto">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center justify-center gap-1"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="h-4 w-4" />
                Filter
                <ChevronDown className="h-3 w-3" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center justify-center gap-1"
              >
                Sort
                <ChevronDown className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Email
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Phone
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Total Invoices
                </th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map((client, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <Users className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
                      </div>
                      <div className="ml-3 md:ml-4">
                        <div className="text-sm font-medium text-gray-900">{client.name}</div>
                        <div className="text-xs text-gray-500 md:hidden">{client.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                    {client.email}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                    {client.phone}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <BadgeCustom variant={client.status === "active" ? "primary" : "default"}>
                      {client.status === "active" ? "Active" : "Inactive"}
                    </BadgeCustom>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                    {client.totalInvoices}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Clients;
