import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Home,
  ShoppingBag,
  Package,
  FileText,
  PieChart,
  Store,
  Percent,
  Search,
  Bell,
  MoreVertical,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface MetricCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    trend: "up" | "down";
  };
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <span
            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
              change.trend === "up"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {change.trend === "up" ? "↑" : "↓"} {change.value}
          </span>
        </div>
        <p className="mt-2 text-3xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
};

interface InvoiceRowProps {
  id: string;
  client: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
}

const InvoiceRow: React.FC<InvoiceRowProps> = ({
  id,
  client,
  amount,
  status,
  dueDate,
}) => {
  const statusColors = {
    paid: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    overdue: "bg-red-100 text-red-800",
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-4 pl-4">
        <input type="checkbox" className="rounded border-gray-300" />
      </td>
      <td className="py-4 font-medium">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-500" />
          {id}
        </div>
      </td>
      <td className="py-4">{client}</td>
      <td className="py-4">${amount.toFixed(2)}</td>
      <td className="py-4">
        <Badge
          variant={
            status === "paid"
              ? "default"
              : status === "pending"
              ? "secondary"
              : "destructive"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </td>
      <td className="py-4">{new Date(dueDate).toLocaleDateString()}</td>
      <td className="py-4 pr-4">
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  );
};

interface Tab {
  label: string;
  count?: number;
  status: "all" | "draft" | "unpaid" | "paid" | "pending";
}

const tabs: Tab[] = [
  { label: "All Invoices", status: "all" },
  { label: "Drafts", count: 3, status: "draft" },
  { label: "Unpaid", count: 4, status: "unpaid" },
  { label: "Paid", count: 7, status: "paid" },
  { label: "Pending", count: 8, status: "pending" },
];

interface Invoice {
  id: string;
  client: string;
  email: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "overdue";
}

const invoices: Invoice[] = [
  {
    id: "INV-0001",
    client: "Ethan Mitchell",
    email: "@ethanmitchell@gmail.com",
    date: "20 Nov, 2023",
    amount: "$632",
    status: "paid",
  },
  {
    id: "INV-0002",
    client: "Adrian Carter",
    email: "@adriancarter@gmail.com",
    date: "21 Nov, 2023",
    amount: "$632",
    status: "pending",
  },
  {
    id: "INV-0003",
    client: "Marcus Turner",
    email: "@marcusturner@gmail.com",
    date: "22 Nov, 2023",
    amount: "$632",
    status: "overdue",
  },
  // Add more invoices as needed
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, {user?.email}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value="$45,231.89"
          change={{ value: "20.1%", trend: "up" }}
        />
        <MetricCard
          title="Paid Invoices"
          value="23"
          change={{ value: "8%", trend: "up" }}
        />
        <MetricCard
          title="Pending Amount"
          value="$12,234.00"
          change={{ value: "4.5%", trend: "down" }}
        />
        <MetricCard
          title="Overdue Invoices"
          value="7"
          change={{ value: "2.3%", trend: "up" }}
        />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Invoices</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Manage and track all your invoices
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Invoice
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="w-full md:w-72 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search invoices..."
                className="pl-8"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                Sort
              </Button>
              <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                <option>All Invoices</option>
                <option>Draft</option>
                <option>Pending</option>
                <option>Paid</option>
                <option>Overdue</option>
              </select>
            </div>
          </div>

          <div className="rounded-md border">
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
                    Issue Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
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
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{invoice.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium">{invoice.client}</div>
                        <div className="text-sm text-gray-500">
                          {invoice.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {invoice.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {invoice.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {invoice.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={
                          invoice.status === "paid"
                            ? "default"
                            : invoice.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {invoice.status.charAt(0).toUpperCase() +
                          invoice.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
