
import { Plus, Trash2 } from "lucide-react";

interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoiceItemsProps {
  items: InvoiceItem[];
  handleItemChange: (id: number, field: string, value: any) => void;
  calculateItemAmount: (item: InvoiceItem) => number;
  removeItem: (id: number) => void;
  addItem: () => void;
}

const InvoiceItems = ({ 
  items, 
  handleItemChange, 
  calculateItemAmount, 
  removeItem, 
  addItem 
}: InvoiceItemsProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-4">Items</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full">
                Item Description
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Qty
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rate
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map(item => (
              <tr key={item.id}>
                <td className="px-3 py-3 whitespace-nowrap">
                  <input
                    type="text"
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                    placeholder="Item description"
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                  />
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <input
                    type="number"
                    className="block w-20 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                  />
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-1">$</span>
                    <input
                      type="number"
                      className="block w-24 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                      min="0"
                      step="0.01"
                      value={item.rate}
                      onChange={(e) => handleItemChange(item.id, 'rate', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <div className="text-gray-900 font-medium">
                    ${calculateItemAmount(item).toFixed(2)}
                  </div>
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-right">
                  <button
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="mt-4 inline-flex items-center text-brand-primary hover:text-brand-primary/80"
        onClick={addItem}
      >
        <Plus className="h-4 w-4 mr-1" />
        Add Item
      </button>
    </div>
  );
};

export default InvoiceItems;
