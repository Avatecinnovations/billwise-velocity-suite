
import { FileText, Languages } from "lucide-react";

interface InvoiceSettingsProps {
  currency: string;
  setCurrency: (currency: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  taxType: string;
  setTaxType: (taxType: string) => void;
  taxRate: number;
  setTaxRate: (rate: number) => void;
  customTaxName: string;
  setCustomTaxName: (name: string) => void;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
}

const InvoiceSettings = ({
  currency,
  setCurrency,
  language,
  setLanguage,
  taxType,
  setTaxType,
  taxRate,
  setTaxRate,
  customTaxName,
  setCustomTaxName,
  selectedTemplate,
  setSelectedTemplate
}: InvoiceSettingsProps) => {
  return (
    <div className="w-full lg:w-80">
      <div className="bg-white rounded-lg shadow p-6 sticky top-6">
        <h3 className="text-lg font-medium mb-4">Invoice Settings</h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <select 
              className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="NGN">NGN - Nigerian Naira</option>
              <option value="ZAR">ZAR - South African Rand</option>
              <option value="KES">KES - Kenyan Shilling</option>
              <option value="GHS">GHS - Ghanaian Cedi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select 
              className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
              <option value="German">German</option>
              <option value="Chinese">Chinese</option>
              <option value="Japanese">Japanese</option>
              <option value="Arabic">Arabic</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Russian">Russian</option>
              <option value="Swahili">Swahili</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tax Type</label>
            <select 
              className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
              value={taxType}
              onChange={(e) => setTaxType(e.target.value)}
            >
              <option value="none">No Tax</option>
              <option value="vat">VAT</option>
              <option value="gst">GST</option>
              <option value="custom">Custom Tax</option>
            </select>
          </div>

          {taxType !== "none" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {taxType === 'custom' ? 'Custom Tax Name' : 'Tax Rate (%)'}
              </label>
              {taxType === 'custom' && (
                <input
                  type="text"
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary mb-2"
                  value={customTaxName}
                  onChange={(e) => setCustomTaxName(e.target.value)}
                  placeholder="e.g. Sales Tax"
                />
              )}
              <input
                type="number"
                className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                value={taxRate}
                onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                min="0"
                max="100"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
            <select className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary">
              <option value="due_on_receipt">Due on Receipt</option>
              <option value="net_15">Net 15</option>
              <option value="net_30" selected>Net 30</option>
              <option value="net_60">Net 60</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Template</label>
            <select 
              className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
            >
              <option value="standard">Standard</option>
              <option value="professional">Professional</option>
              <option value="modern">Modern</option>
              <option value="minimal">Minimal</option>
              <option value="bold">Bold</option>
            </select>
            <div className="mt-2 border rounded-md overflow-hidden">
              <img 
                src={`/placeholder.svg`} 
                alt="Template preview" 
                className="w-full h-32 object-cover" 
              />
            </div>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">Enable auto-reminders</span>
            </label>
            <p className="text-xs text-gray-500 ml-6 mt-1">
              Automatically remind clients about unpaid invoices
            </p>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">Enable late payment fee</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Late Fee (%)</label>
            <input
              type="number"
              className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
              defaultValue="5"
              min="0"
              max="100"
            />
          </div>

          <div className="border-t pt-4">
            <button className="flex items-center text-brand-primary text-sm">
              <FileText className="h-4 w-4 mr-1" />
              Preview Invoice Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSettings;
