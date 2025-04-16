
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FileText,
  Search,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  ChevronDown,
  MoreVertical
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="overflow-hidden border border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <span
            className={`inline-flex items-center text-xs font-medium ${
              change.trend === "up"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {change.trend === "up" ? (
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
            ) : (
              <ArrowDownRight className="mr-1 h-4 w-4 text-red-600" />
            )}
            {change.value}
          </span>
        </div>
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
};

interface Invoice {
  id: string;
  client: string;
  email: string;
  issueDate: string;
  dueDate: string;
  amount: string;
  status: "paid" | "pending" | "overdue";
}

const invoices: Invoice[] = [
  {
    id: "INV-0001",
    client: "Ethan Mitchell",
    email: "ethanmitchell@gmail.com",
    issueDate: "20 Nov, 2023",
    dueDate: "20 Nov, 2023",
    amount: "$632",
    status: "paid",
  },
  {
    id: "INV-0002",
    client: "Adrian Carter",
    email: "adriancarter@gmail.com",
    issueDate: "21 Nov, 2023",
    dueDate: "21 Nov, 2023",
    amount: "$632",
    status: "pending",
  },
  {
    id: "INV-0003",
    client: "Marcus Turner",
    email: "marcusturner@gmail.com",
    issueDate: "22 Nov, 2023",
    dueDate: "22 Nov, 2023",
    amount: "$632",
    status: "overdue",
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back, {user?.email || "roqueverse@gmail.com"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="h-10 gap-2"
            size="default"
          >
            <Download className="h-4 w-4" />
            <span>Download Report</span>
          </Button>
          <Button 
            asChild
            className="h-10 gap-2 bg-[#0f172a] hover:bg-[#0f172a]/90"
            size="default"
          >
            <Link to="/invoices/new">
              <Plus className="h-4 w-4" />
              <span>New Invoice</span>
            </Link>
          </Button>
        </div>
      </div>

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

      <div className="mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-semibold">Invoices</h2>
            <p className="text-sm text-gray-500">Manage and track all your invoices</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="h-10 gap-2"
              size="default"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            <Button 
              asChild
              className="h-10 gap-2 bg-[#0f172a] hover:bg-[#0f172a]/90"
              size="default"
            >
              <Link to="/invoices/new">
                <Plus className="h-4 w-4" />
                <span>New Invoice</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
          <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search invoices..."
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2 sm:ml-auto">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-10 gap-1"
                >
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-10 gap-1"
                >
                  Sort
                </Button>
                <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm">
                  <option>All Invoices</option>
                  <option>Draft</option>
                  <option>Pending</option>
                  <option>Paid</option>
                  <option>Overdue</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3 text-left">Invoice</th>
                  <th className="px-6 py-3 text-left">Client</th>
                  <th className="px-6 py-3 text-left hidden md:table-cell">Issue Date</th>
                  <th className="px-6 py-3 text-left hidden md:table-cell">Due Date</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <span className="text-sm font-medium">{invoice.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium">{invoice.client}</div>
                        <div className="text-xs text-gray-500">
                          {invoice.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                      {invoice.issueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                      {invoice.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {invoice.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        className={`${
                          invoice.status === "paid"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : invoice.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                        } rounded-full px-2.5 py-0.5 text-xs font-semibold`}
                      >
                        {invoice.status === "paid" ? "Paid" : 
                         invoice.status === "pending" ? "Pending" : "Overdue"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button>
                        <MoreVertical className="h-5 w-5 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
