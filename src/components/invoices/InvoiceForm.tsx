
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Calendar, 
  Settings, 
  AlertCircle,
  FileText
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import InvoiceItems from "./InvoiceItems";
import InvoiceSettings from "./InvoiceSettings";
import RecurringToggle from "./RecurringToggle";
import ScheduleInvoice from "./ScheduleInvoice";
import PaymentMethods from "./PaymentMethods";

const InvoiceForm = () => {
  const [items, setItems] = useState([
    { id: 1, description: "", quantity: 1, rate: 0, amount: 0 }
  ]);
  const [showSettings, setShowSettings] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState("monthly");
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("English");
  const [taxType, setTaxType] = useState("none");
  const [taxRate, setTaxRate] = useState(10);
  const [customTaxName, setCustomTaxName] = useState("");
  const [scheduleDate, setScheduleDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTemplate, setSelectedTemplate] = useState("standard");
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState(["bank", "card"]);

  const calculateItemAmount = (item: any) => {
    return item.quantity * item.rate;
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + calculateItemAmount(item), 0);
  };

  const calculateTax = () => {
    if (taxType === "none") return 0;
    return calculateSubtotal() * (taxRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleItemChange = (id: number, field: string, value: any) => {
    setItems(
      items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'rate') {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate;
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const addItem = () => {
    const newId = Math.max(...items.map(item => item.id), 0) + 1;
    setItems([...items, { id: newId, description: "", quantity: 1, rate: 0, amount: 0 }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const togglePaymentMethod = (method: string) => {
    if (selectedPaymentMethods.includes(method)) {
      setSelectedPaymentMethods(selectedPaymentMethods.filter(m => m !== method));
    } else {
      setSelectedPaymentMethods([...selectedPaymentMethods, method]);
    }
  };

  const handleSaveAndSend = () => {
    // In a real app, this would send the invoice data to a backend
    toast.success("Invoice has been saved and scheduled for sending!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link to="/invoices" className="inline-flex items-center text-brand-primary hover:text-brand-primary/80">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Invoices
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Invoice Form */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold mb-6">Create New Invoice</h1>

              {/* Recurring Invoice Toggle */}
              <RecurringToggle 
                isRecurring={isRecurring} 
                setIsRecurring={setIsRecurring} 
                recurringFrequency={recurringFrequency}
                setRecurringFrequency={setRecurringFrequency}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Bill From</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                      <input
                        type="text"
                        className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                        defaultValue="Your Business Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                        defaultValue="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <textarea
                        className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                        rows={3}
                        defaultValue="123 Business Street
City, State, ZIP
Country"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Bill To</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                      <select className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary">
                        <option value="">Select a client</option>
                        <option value="acme">Acme Corp</option>
                        <option value="tech">Tech Solutions Inc.</option>
                        <option value="global">Global Enterprises</option>
                        <option value="webdesign">Webdesign Pro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                        placeholder="client.email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <textarea
                        className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                        rows={3}
                        placeholder="Client's Address"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
                  <input
                    type="text"
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                    defaultValue="INV-2023-009"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                      defaultValue={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Schedule Invoice */}
              <ScheduleInvoice 
                scheduleDate={scheduleDate}
                setScheduleDate={setScheduleDate}
              />

              <InvoiceItems 
                items={items}
                handleItemChange={handleItemChange}
                calculateItemAmount={calculateItemAmount}
                removeItem={removeItem}
                addItem={addItem}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                    rows={4}
                    placeholder="Additional notes for the client..."
                  />
                </div>
                <div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">
                        {taxType === 'vat' && 'VAT'}
                        {taxType === 'gst' && 'GST'}
                        {taxType === 'custom' && customTaxName}
                        {taxType !== 'none' && ` (${taxRate}%)`}:
                      </span>
                      <span className="font-medium">${calculateTax().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2 font-bold text-lg">
                      <span>Total:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex items-center mt-4 text-sm text-gray-600">
                    <AlertCircle className="h-4 w-4 mr-1 text-brand-yellow" />
                    <span>Tax rates can be adjusted in invoice settings</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <PaymentMethods 
                selectedPaymentMethods={selectedPaymentMethods} 
                togglePaymentMethod={togglePaymentMethod} 
              />

              <div className="flex flex-col sm:flex-row gap-3 items-center justify-end mt-8">
                <button
                  className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings className="h-5 w-5 inline mr-1" />
                  Invoice Settings
                </button>
                <button
                  className="w-full sm:w-auto px-6 py-3 bg-gray-700 rounded-lg text-white font-medium hover:bg-gray-800"
                >
                  Save as Draft
                </button>
                <button
                  className="w-full sm:w-auto px-6 py-3 bg-brand-primary rounded-lg text-white font-medium hover:bg-brand-primary/90"
                  onClick={handleSaveAndSend}
                >
                  Preview & Send
                </button>
              </div>
            </div>
          </div>

          {/* Invoice Settings (Conditionally Rendered) */}
          {showSettings && (
            <InvoiceSettings 
              currency={currency}
              setCurrency={setCurrency}
              language={language}
              setLanguage={setLanguage}
              taxType={taxType}
              setTaxType={setTaxType}
              taxRate={taxRate}
              setTaxRate={setTaxRate}
              customTaxName={customTaxName}
              setCustomTaxName={setCustomTaxName}
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
