
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FileText,
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
    email: "ethanmitchell@gmail.com",
    date: "20 Nov, 2023",
    amount: "$632",
    status: "paid",
  },
  {
    id: "INV-0002",
    client: "Adrian Carter",
    email: "adriancarter@gmail.com",
    date: "21 Nov, 2023",
    amount: "$632",
    status: "pending",
  },
  {
    id: "INV-0003",
    client: "Marcus Turner",
    email: "marcusturner@gmail.com",
    date: "22 Nov, 2023",
    amount: "$632",
    status: "overdue",
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, {user?.email}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="h-9 gap-1.5" size="sm">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Report</span>
          </Button>
          <Button className="h-9 gap-1.5" size="sm">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Invoice</span>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        <CardHeader className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pb-4">
          <div>
            <CardTitle>Invoices</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Manage and track all your invoices
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" className="h-9 gap-1.5" size="sm">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button className="h-9 gap-1.5" size="sm">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Invoice</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="w-full sm:w-72 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search invoices..."
                className="pl-8"
              />
            </div>
            <div className="flex flex-wrap gap-2 sm:ml-auto">
              <Button variant="outline" size="sm" className="h-8 gap-1.5">
                <Filter className="h-3.5 w-3.5" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                Sort
              </Button>
              <select className="h-8 rounded-md border border-input bg-background px-3 py-1 text-xs sm:text-sm shadow-sm">
                <option>All Invoices</option>
                <option>Draft</option>
                <option>Pending</option>
                <option>Paid</option>
                <option>Overdue</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-md border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Issue Date
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Due Date
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{invoice.id}</span>
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium">{invoice.client}</div>
                        <div className="text-xs text-gray-500 md:hidden">
                          {invoice.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                      {invoice.date}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                      {invoice.date}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                      {invoice.amount}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <Badge
                        variant={
                          invoice.status === "paid"
                            ? "default"
                            : invoice.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                        className="text-xs"
                      >
                        {invoice.status.charAt(0).toUpperCase() +
                          invoice.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
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
