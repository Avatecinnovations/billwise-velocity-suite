
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Clock, Check, X } from "lucide-react";

const QuotesPage = () => {
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Quotes</h1>
        <Button>New Quote</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-500">Total Quotes</div>
              <FileText className="h-5 w-5 text-brand-primary" />
            </div>
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-gray-500 mt-1">All time</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-500">Pending</div>
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
            <div className="text-2xl font-bold">4</div>
            <div className="text-sm text-gray-500 mt-1">Awaiting response</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-500">Accepted</div>
              <Check className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold">5</div>
            <div className="text-sm text-gray-500 mt-1">Ready to invoice</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-500">Rejected/Expired</div>
              <X className="h-5 w-5 text-red-500" />
            </div>
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-gray-500 mt-1">No longer active</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-semibold">Recent Quotes</h2>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search quotes..."
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 text-left">Quote ID</th>
                  <th className="px-6 py-3 text-left">Client</th>
                  <th className="px-6 py-3 text-left">Date Created</th>
                  <th className="px-6 py-3 text-left">Expiry Date</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quotes.map((quote, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-brand-primary">{quote.id}</td>
                    <td className="px-6 py-4 text-sm">{quote.client}</td>
                    <td className="px-6 py-4 text-sm">{quote.date}</td>
                    <td className="px-6 py-4 text-sm">{quote.expiryDate}</td>
                    <td className="px-6 py-4 text-sm font-medium">{quote.amount}</td>
                    <td className="px-6 py-4">
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
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm">View</Button>
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
