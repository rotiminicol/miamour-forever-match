
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TransactionHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  
  // Sample transaction data
  const transactions = [
    {
      id: "INV-001",
      date: "May 15, 2025",
      description: "Basic Plan Subscription",
      amount: 19.99,
      status: "paid",
      type: "subscription"
    },
    {
      id: "INV-002",
      date: "Apr 15, 2025",
      description: "Basic Plan Subscription",
      amount: 19.99,
      status: "paid",
      type: "subscription"
    },
    {
      id: "INV-003",
      date: "Mar 15, 2025",
      description: "Profile Boost Add-on",
      amount: 9.99,
      status: "paid",
      type: "add-on"
    },
    {
      id: "INV-004",
      date: "Mar 10, 2025",
      description: "Therapy Session",
      amount: 49.99,
      status: "paid",
      type: "service"
    },
    {
      id: "INV-005",
      date: "Feb 15, 2025",
      description: "Basic Plan Subscription",
      amount: 19.99,
      status: "paid",
      type: "subscription"
    },
    {
      id: "INV-006",
      date: "Jan 15, 2025",
      description: "Basic Plan Subscription",
      amount: 19.99,
      status: "paid",
      type: "subscription"
    },
    {
      id: "INV-007",
      date: "Jan 05, 2025",
      description: "Date Planning Service",
      amount: 29.99,
      status: "paid",
      type: "service"
    }
  ];
  
  // Filter transactions based on search term and filter type
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || transaction.type === filterType;
    return matchesSearch && matchesFilter;
  });
  
  // Calculate total spent
  const totalSpent = transactions.reduce((total, transaction) => total + transaction.amount, 0);
  
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-miamour-burgundy mb-4">Transaction History</h1>
          <p className="text-miamour-charcoal text-lg">
            View and manage your payment history and receipts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Spent</CardDescription>
              <CardTitle className="text-2xl font-bold text-miamour-burgundy">${totalSpent.toFixed(2)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Lifetime spending on miamour services</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Subscription</CardDescription>
              <CardTitle className="text-2xl font-bold text-miamour-burgundy">Basic Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Renews on Jun 15, 2025</p>
                <Badge>$19.99/mo</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Payment Method</CardDescription>
              <CardTitle className="text-2xl font-bold text-miamour-burgundy">Visa ****4242</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Expires 12/25</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-10">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-xl font-serif font-medium text-miamour-burgundy">Transaction History</CardTitle>
                <CardDescription>View your past payments and invoices</CardDescription>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>Export CSV</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search transactions..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-[180px]">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2 text-gray-400" />
                      <SelectValue placeholder="Filter by" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Transactions</SelectItem>
                    <SelectItem value="subscription">Subscriptions</SelectItem>
                    <SelectItem value="service">Services</SelectItem>
                    <SelectItem value="add-on">Add-ons</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="rounded-md border">
              <div className="hidden md:grid grid-cols-5 py-3 px-4 border-b bg-gray-50">
                <div className="font-medium text-sm text-gray-600">Invoice</div>
                <div className="font-medium text-sm text-gray-600">Date</div>
                <div className="font-medium text-sm text-gray-600 col-span-2">Description</div>
                <div className="font-medium text-sm text-gray-600 text-right">Amount</div>
              </div>
              
              <div className="divide-y">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <div key={transaction.id} className="grid grid-cols-1 md:grid-cols-5 py-4 px-4 hover:bg-gray-50 transition-colors">
                      <div className="md:hidden font-medium mb-1">Invoice</div>
                      <div className="mb-2 md:mb-0">
                        <span className="font-medium md:font-normal">{transaction.id}</span>
                      </div>
                      
                      <div className="md:hidden font-medium mb-1">Date</div>
                      <div className="mb-2 md:mb-0 text-gray-600">{transaction.date}</div>
                      
                      <div className="md:hidden font-medium mb-1">Description</div>
                      <div className="mb-2 md:mb-0 md:col-span-2 flex items-center">
                        {transaction.description}
                        {transaction.status === "paid" && (
                          <Badge variant="outline" className="ml-2 text-green-600 border-green-300 text-xs">Paid</Badge>
                        )}
                      </div>
                      
                      <div className="md:hidden font-medium mb-1">Amount</div>
                      <div className="font-medium md:text-right">${transaction.amount.toFixed(2)}</div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">No transactions found</p>
                  </div>
                )}
              </div>
            </div>
            
            {filteredTransactions.length > 0 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-500">
                  Showing {Math.min(10, filteredTransactions.length)} of {filteredTransactions.length} results
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="font-medium">
                    {currentPage}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    disabled={filteredTransactions.length <= 10}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="bg-miamour-blush/20 p-6 rounded-lg">
          <h2 className="text-xl font-serif font-medium text-miamour-burgundy mb-4">Need Help?</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="font-medium text-miamour-burgundy mb-2">Billing Questions</h3>
              <p className="text-sm text-gray-600 mb-4">
                If you have questions about a charge or need to update your payment information,
                our support team is here to help.
              </p>
              <Button variant="outline" size="sm" className="border-miamour-burgundy text-miamour-burgundy">
                Contact Billing Support
              </Button>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-miamour-burgundy mb-2">Receipts & Invoices</h3>
              <p className="text-sm text-gray-600 mb-4">
                Need a receipt for your records? Click on any transaction to download a PDF receipt
                or request a formal invoice.
              </p>
              <Button variant="outline" size="sm" className="border-miamour-burgundy text-miamour-burgundy">
                Request Invoice
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
