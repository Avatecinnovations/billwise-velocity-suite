import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Calendar,
  Settings,
  AlertCircle,
  FileText,
  Building,
  Mail,
  Phone,
  MapPin,
  Printer,
  Download,
  X,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import InvoiceItems from "./InvoiceItems";
import InvoiceSettings from "./InvoiceSettings";
import RecurringToggle from "./RecurringToggle";
import ScheduleInvoice from "./ScheduleInvoice";
import PaymentMethods from "./PaymentMethods";
import { clientService } from "@/integrations/supabase/services/clientService";
import { invoiceService } from "@/services/invoiceService";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "cancelled";

interface FormInvoiceItem {
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
  invoice_id?: string;
}

interface FormData {
  client_id: string;
  invoice_number: string;
  issue_date: string;
  due_date: string;
  status: InvoiceStatus;
  total_amount: number;
  tax_amount: number;
  notes: string;
  terms: string;
}

type Client = Database["public"]["Tables"]["clients"]["Row"];
type Invoice = Database["public"]["Tables"]["invoices"]["Row"];
type InvoiceItem = Database["public"]["Tables"]["invoice_items"]["Row"];

const InvoiceForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clients, setClients] = useState<
    Database["public"]["Tables"]["clients"]["Row"][]
  >([]);
  const [selectedClient, setSelectedClient] = useState<
    Database["public"]["Tables"]["clients"]["Row"] | null
  >(null);
  const [items, setItems] = useState<FormInvoiceItem[]>([]);
  const [formData, setFormData] = useState<FormData>({
    client_id: "",
    invoice_number: "",
    issue_date: new Date().toISOString().split("T")[0],
    due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    status: "draft",
    total_amount: 0,
    tax_amount: 0,
    notes: "",
    terms: "",
  });
  const [showSettings, setShowSettings] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState("monthly");
  const [currency, setCurrency] = useState(user?.currency || "USD");
  const [language, setLanguage] = useState("English");
  const [taxType, setTaxType] = useState("none");
  const [taxRate, setTaxRate] = useState(10);
  const [customTaxName, setCustomTaxName] = useState("");
  const [scheduleDate, setScheduleDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTemplate, setSelectedTemplate] = useState("standard");
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([
    "bank",
    "card",
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await clientService.getClients();
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
        toast.error("Failed to load clients");
      }
    };

    fetchClients();
  }, []);

  const handleClientSelect = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId) || null;
    setSelectedClient(client);
    setFormData((prev) => ({ ...prev, client_id: clientId }));
  };

  const handleItemChange = (
    index: number,
    field: keyof FormInvoiceItem,
    value: string | number
  ) => {
    setItems((prev) => {
      const newItems = [...prev];
      newItems[index] = {
        ...newItems[index],
        [field]: value,
      };
      return newItems;
    });
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        description: "",
        quantity: 1,
        unit_price: 0,
        amount: 0,
      },
    ]);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const calculateItemAmount = (quantity: number, unitPrice: number) => {
    return quantity * unitPrice;
  };

  const calculateTotalAmount = () => {
    return items.reduce(
      (sum, item) => sum + calculateItemAmount(item.quantity, item.unit_price),
      0
    );
  };

  const calculateTaxAmount = () => {
    const totalAmount = calculateTotalAmount();
    return totalAmount * (taxRate / 100);
  };

  const handleSave = async () => {
    if (!user) {
      toast.error("You must be logged in to save invoices");
      return;
    }

    setIsSubmitting(true);
    try {
      const totalAmount = calculateTotalAmount();
      const taxAmount = calculateTaxAmount();

      const invoiceData = {
        user_id: user.id,
        client_id: selectedClient?.id,
        invoice_number: formData.invoice_number,
        status: "draft" as InvoiceStatus,
        issue_date: formData.issue_date,
        due_date: formData.due_date,
        total_amount: totalAmount,
        notes: formData.notes,
        terms: formData.terms,
      };

      const savedInvoice = await invoiceService.createInvoice(
        invoiceData,
        items as any
      );
      toast.success("Invoice saved as draft");
      navigate(`/invoices/${savedInvoice.id}`);
    } catch (error) {
      console.error("Error saving invoice:", error);
      toast.error("Failed to save invoice");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSend = async () => {
    if (!user) {
      toast.error("You must be logged in to send invoices");
      return;
    }

    setIsSubmitting(true);
    try {
      const totalAmount = calculateTotalAmount();
      const taxAmount = calculateTaxAmount();

      const invoiceData = {
        user_id: user.id,
        client_id: selectedClient?.id,
        invoice_number: formData.invoice_number,
        status: "sent" as InvoiceStatus,
        issue_date: formData.issue_date,
        due_date: formData.due_date,
        total_amount: totalAmount,
        notes: formData.notes,
        terms: formData.terms,
      };

      const savedInvoice = await invoiceService.createInvoice(
        invoiceData,
        items as any
      );
      toast.success("Invoice sent successfully");
      navigate(`/invoices/${savedInvoice.id}`);
    } catch (error) {
      console.error("Error sending invoice:", error);
      toast.error("Failed to send invoice");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePaymentMethod = (method: string) => {
    setSelectedPaymentMethods((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    );
  };

  const handleDownload = async () => {
    try {
      const element = document.getElementById("invoice-preview");
      if (!element) return;

      const canvas = await html2canvas(element, {
        logging: false,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`invoice-${formData.invoice_number}.pdf`);
    } catch (error) {
      console.error("Error downloading invoice:", error);
      toast.error("Failed to download invoice");
    }
  };

  const a4Style = {
    width: "210mm",
    minHeight: "297mm",
    margin: "0 auto",
    padding: "20mm",
    backgroundColor: "white",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            to="/invoices"
            className="inline-flex items-center text-brand-primary hover:text-brand-primary/80"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Invoices
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold mb-6">Create New Invoice</h1>

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
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Business Name
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          className="pl-10"
                          value={user?.businessName || ""}
                          readOnly
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          className="pl-10"
                          value={user?.email || ""}
                          readOnly
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          className="pl-10"
                          value={user?.user_metadata?.address || ""}
                          readOnly
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          className="pl-10"
                          value={user?.user_metadata?.phone || ""}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Bill To</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Client
                      </label>
                      <Select onValueChange={handleClientSelect}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a client" />
                        </SelectTrigger>
                        <SelectContent>
                          {clients.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {selectedClient && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <Input value={selectedClient.email} readOnly />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                          </label>
                          <Input value={selectedClient.address} readOnly />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <Input value={selectedClient.phone} readOnly />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Invoice Number
                  </label>
                  <Input
                    value={formData.invoice_number}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        invoice_number: e.target.value,
                      }))
                    }
                    placeholder="INV-001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issue Date
                  </label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={formData.issue_date}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          issue_date: e.target.value,
                        }))
                      }
                    />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={formData.due_date}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          due_date: e.target.value,
                        }))
                      }
                    />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    placeholder="Additional notes for the client..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Terms & Conditions
                  </label>
                  <Textarea
                    value={formData.terms}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        terms: e.target.value,
                      }))
                    }
                    placeholder="Add terms and conditions"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">
                        ${calculateTotalAmount().toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">
                        {taxType === "vat" && "VAT"}
                        {taxType === "gst" && "GST"}
                        {taxType === "custom" && customTaxName}
                        {taxType !== "none" && ` (${taxRate}%)`}:
                      </span>
                      <span className="font-medium">
                        ${calculateTaxAmount().toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 font-bold text-lg">
                      <span>Total:</span>
                      <span>${calculateTotalAmount().toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex items-center mt-4 text-sm text-gray-600">
                    <AlertCircle className="h-4 w-4 mr-1 text-brand-yellow" />
                    <span>Tax rates can be adjusted in invoice settings</span>
                  </div>
                </div>
              </div>

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
                  className="w-full sm:w-auto px-6 py-3 bg-gray-700 rounded-lg text-white font-medium hover:bg-gray-800 disabled:opacity-50"
                  onClick={handleSave}
                  disabled={isSubmitting}
                >
                  Save as Draft
                </button>
                <button
                  className="w-full sm:w-auto px-6 py-3 bg-brand-primary rounded-lg text-white font-medium hover:bg-brand-primary/90 disabled:opacity-50"
                  onClick={() => setShowPreview(true)}
                  disabled={isSubmitting}
                >
                  Preview & Send
                </button>
              </div>
            </div>
          </div>

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

        {showPreview && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Invoice Preview</h2>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => window.print()}>
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                  <Button variant="outline" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" onClick={handleSend}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                  <Button variant="ghost" onClick={() => setShowPreview(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div
                style={a4Style}
                className="print:shadow-none print:border-0"
                id="invoice-preview"
              >
                <div className="mb-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl font-bold">Invoice</h1>
                      <p className="text-gray-500">
                        #{formData.invoice_number}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{user?.businessName}</p>
                      <p className="text-gray-500">{user?.email}</p>
                      <p className="text-gray-500">
                        {user?.user_metadata?.address}
                      </p>
                      <p className="text-gray-500">
                        {user?.user_metadata?.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceForm;
