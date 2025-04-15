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

const Invoices = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-500 mt-1">
            Manage and track all your invoices
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Download className="h-5 w-5 mr-2" />
            Export
          </button>
          <Link
            to="/invoices/new"
            className="flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-white bg-[#0f172a] hover:bg-[#0f172a]/90"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Invoice
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="w-full md:w-72 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                placeholder="Search invoices..."
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Sort
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <InvoiceTableRow
                invoiceNumber="INV-001"
                client="Acme Corp"
                date="2024-03-15"
                amount={1200.0}
                status="paid"
              />
              <InvoiceTableRow
                invoiceNumber="INV-002"
                client="Tech Solutions Inc."
                date="2024-03-14"
                amount={850.5}
                status="pending"
              />
              <InvoiceTableRow
                invoiceNumber="INV-003"
                client="Global Enterprises"
                date="2024-03-13"
                amount={2500.0}
                status="overdue"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface InvoiceTableRowProps {
  invoiceNumber: string;
  client: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
}

const InvoiceTableRow = ({
  invoiceNumber,
  client,
  date,
  amount,
  status,
}: InvoiceTableRowProps) => {
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
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            <FileText className="h-5 w-5 text-gray-600" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {invoiceNumber}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {client}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${amount.toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <BadgeCustom variant={statusColors[status] as any}>
          {statusLabels[status]}
        </BadgeCustom>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-gray-400 hover:text-gray-500">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
};

export default Invoices;
