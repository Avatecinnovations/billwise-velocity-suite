
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Clock, Check, X, Search, MoreHorizontal, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const QuotesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const quotes = [
    {
      id: "QUO-2023-001",
      client: "Tech Solutions Inc.",
      date: "15 Nov, 2023",
      expiryDate: "15 Dec, 2023",
      amount: "$3,500.00",
      status: "pending"
    },
    {
      id: "QUO-2023-002",
      client: "Global Enterprises",
      date: "10 Nov, 2023",
      expiryDate: "10 Dec, 2023",
      amount: "$5,700.00",
      status: "accepted"
    },
    {
      id: "QUO-2023-003",
      client: "Acme Corp",
      date: "05 Nov, 2023",
      expiryDate: "05 Dec, 2023",
      amount: "$2,800.00",
      status: "rejected"
    },
    {
      id: "QUO-2023-004",
      client: "Webdesign Pro",
      date: "01 Nov, 2023",
      expiryDate: "01 Dec, 2023",
      amount: "$1,950.00",
      status: "expired"
    },
    {
      id: "QUO-2023-005",
      client: "Smith Consulting",
      date: "28 Oct, 2023",
      expiryDate: "28 Nov, 2023",
      amount: "$4,200.00",
      status: "pending"
    }
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Quotes</h1>
        <Button 
          asChild
          size="sm"
          className="h-9 px-3 gap-1.5"
        >
          <Link to="/quotes/new">
            <span className="hidden sm:inline">New Quote</span>
            <span className="sm:hidden">New</span>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-2 md:mb-4">
              <div className="text-xs md:text-sm font-medium text-gray-500">Total Quotes</div>
              <FileText className="h-4 w-4 md:h-5 md:w-5 text-brand-primary" />
            </div>
            <div className="text-xl md:text-2xl font-bold">12</div>
            <div className="text-xs md:text-sm text-gray-500 mt-1">All time</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-2 md:mb-4">
              <div className="text-xs md:text-sm font-medium text-gray-500">Pending</div>
              <Clock className="h-4 w-4 md:h-5 md:w-5 text-amber-500" />
            </div>
            <div className="text-xl md:text-2xl font-bold">4</div>
            <div className="text-xs md:text-sm text-gray-500 mt-1">Awaiting response</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-2 md:mb-4">
              <div className="text-xs md:text-sm font-medium text-gray-500">Accepted</div>
              <Check className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
            </div>
            <div className="text-xl md:text-2xl font-bold">5</div>
            <div className="text-xs md:text-sm text-gray-500 mt-1">Ready to invoice</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-2 md:mb-4">
              <div className="text-xs md:text-sm font-medium text-gray-500">Rejected/Expired</div>
              <X className="h-4 w-4 md:h-5 md:w-5 text-red-500" />
            </div>
            <div className="text-xl md:text-2xl font-bold">3</div>
            <div className="text-xs md:text-sm text-gray-500 mt-1">No longer active</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="px-4 md:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="font-semibold">Recent Quotes</h2>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search quotes..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left">Quote ID</th>
                  <th className="px-3 sm:px-6 py-3 text-left">Client</th>
                  <th className="px-3 sm:px-6 py-3 text-left hidden md:table-cell">Date Created</th>
                  <th className="px-3 sm:px-6 py-3 text-left hidden lg:table-cell">Expiry Date</th>
                  <th className="px-3 sm:px-6 py-3 text-left">Amount</th>
                  <th className="px-3 sm:px-6 py-3 text-left">Status</th>
                  <th className="px-3 sm:px-6 py-3 text-left"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quotes.map((quote, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 text-sm font-medium text-brand-primary">{quote.id}</td>
                    <td className="px-3 sm:px-6 py-4 text-sm">
                      {quote.client}
                      <div className="text-xs text-gray-500 md:hidden">
                        {quote.date}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-sm hidden md:table-cell">{quote.date}</td>
                    <td className="px-3 sm:px-6 py-4 text-sm hidden lg:table-cell">{quote.expiryDate}</td>
                    <td className="px-3 sm:px-6 py-4 text-sm font-medium">{quote.amount}</td>
                    <td className="px-3 sm:px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        quote.status === 'accepted' 
                          ? 'bg-green-100 text-green-800' 
                          : quote.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : quote.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
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
};

export default QuotesPage;
