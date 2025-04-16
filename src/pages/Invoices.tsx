
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Filter,
  Download,
  MoreHorizontal,
  Search,
  ChevronDown,
  FileText,
} from "lucide-react";
import { BadgeCustom } from "@/components/ui/badge-custom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Invoices = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  // Mock invoice data
  const invoices = [
    {
      invoiceNumber: "INV-001",
      client: "Acme Corp",
      date: "2024-03-15",
      amount: 1200.0,
      status: "paid" as const,
    },
    {
      invoiceNumber: "INV-002",
      client: "Tech Solutions Inc.",
      date: "2024-03-14",
      amount: 850.5,
      status: "pending" as const,
    },
    {
      invoiceNumber: "INV-003",
      client: "Global Enterprises",
      date: "2024-03-13",
      amount: 2500.0,
      status: "overdue" as const,
    },
  ];

  const statusColors = {
    paid: "success",
    pending: "warning",
    overdue: "destructive",
  };

  const statusLabels = {
    paid: "Paid",
    pending: "Pending",
    overdue: "Overdue",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">
            Manage and track all your invoices
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
            <Link to="/invoices/new">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Invoice</span>
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
                placeholder="Search invoices..."
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
                  Invoice
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Date
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {invoice.invoiceNumber}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.client}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                    {invoice.date}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <BadgeCustom variant={statusColors[invoice.status] as any}>
                      {statusLabels[invoice.status]}
                    </BadgeCustom>
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

export default Invoices;
