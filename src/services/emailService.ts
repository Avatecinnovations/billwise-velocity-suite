import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/types/database";

type Invoice = Database["public"]["Tables"]["invoices"]["Row"] & {
  invoice_items: Database["public"]["Tables"]["invoice_items"]["Row"][];
  clients: Database["public"]["Tables"]["clients"]["Row"];
};

export const emailService = {
  async sendInvoiceEmail(invoice: Invoice) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const template = this.generateInvoiceEmailTemplate(invoice);

    const { error } = await supabase.functions.invoke("send-email", {
      body: {
        to: invoice.clients.email,
        subject: `Invoice #${invoice.invoice_number} from ${user.email}`,
        html: template,
        attachments: [
          {
            filename: `invoice-${invoice.invoice_number}.pdf`,
            content: await this.generateInvoicePDF(invoice),
          },
        ],
      },
    });

    if (error) throw error;
  },

  generateInvoiceEmailTemplate(invoice: Invoice): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .invoice-details { margin-bottom: 30px; }
            .table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            .table th, .table td { padding: 10px; border: 1px solid #ddd; }
            .table th { background-color: #f5f5f5; }
            .total { text-align: right; font-weight: bold; }
            .footer { margin-top: 30px; text-align: center; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Invoice #${invoice.invoice_number}</h1>
              <p>Date: ${new Date(invoice.created_at).toLocaleDateString()}</p>
              <p>Due Date: ${new Date(
                invoice.due_date
              ).toLocaleDateString()}</p>
            </div>

            <div class="invoice-details">
              <h2>Bill To:</h2>
              <p>${invoice.clients.name}</p>
              ${
                invoice.clients.address
                  ? `<p>${invoice.clients.address}</p>`
                  : ""
              }
              ${
                invoice.clients.city
                  ? `<p>${invoice.clients.city}, ${invoice.clients.state} ${invoice.clients.postal_code}</p>`
                  : ""
              }
              ${
                invoice.clients.country
                  ? `<p>${invoice.clients.country}</p>`
                  : ""
              }
            </div>

            <table class="table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                ${invoice.invoice_items
                  .map(
                    (item) => `
                  <tr>
                    <td>${item.description}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.unit_price.toFixed(2)}</td>
                    <td>$${item.amount.toFixed(2)}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="total">Total:</td>
                  <td>$${invoice.total_amount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>

            ${
              invoice.notes
                ? `
              <div class="notes">
                <h3>Notes:</h3>
                <p>${invoice.notes}</p>
              </div>
            `
                : ""
            }

            <div class="footer">
              <p>Thank you for your business!</p>
              <p>Please find the attached PDF invoice for your records.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  },

  async generateInvoicePDF(invoice: Invoice): Promise<string> {
    // This is a placeholder - you'll need to implement actual PDF generation
    // You might want to use a library like @react-pdf/renderer or pdfkit
    return "";
  },
};
