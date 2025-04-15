import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/types/database";
import { emailService } from "./emailService";

type Invoice = Database["public"]["Tables"]["invoices"]["Row"];
type InvoiceInsert = Database["public"]["Tables"]["invoices"]["Insert"];
type InvoiceItem = Database["public"]["Tables"]["invoice_items"]["Row"];
type InvoiceItemInsert =
  Database["public"]["Tables"]["invoice_items"]["Insert"];

type Quote = Database["public"]["Tables"]["quotes"]["Row"];
type QuoteInsert = Database["public"]["Tables"]["quotes"]["Insert"];
type QuoteItem = Database["public"]["Tables"]["quote_items"]["Row"];
type QuoteItemInsert = Database["public"]["Tables"]["quote_items"]["Insert"];

export const invoiceService = {
  // Invoice operations
  async createInvoice(invoice: InvoiceInsert, items: InvoiceItemInsert[]) {
    const { data: newInvoice, error: invoiceError } = await supabase
      .from("invoices")
      .insert(invoice)
      .select()
      .single();

    if (invoiceError) throw invoiceError;

    const { error: itemsError } = await supabase
      .from("invoice_items")
      .insert(items.map((item) => ({ ...item, invoice_id: newInvoice.id })));

    if (itemsError) throw itemsError;

    return newInvoice;
  },

  async getInvoices(userId: string) {
    const { data, error } = await supabase
      .from("invoices")
      .select(
        `
        *,
        invoice_items (*),
        clients (*)
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getInvoice(id: string) {
    const { data, error } = await supabase
      .from("invoices")
      .select(
        `
        *,
        invoice_items (*),
        clients (*)
      `
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async updateInvoice(id: string, updates: Partial<InvoiceInsert>) {
    const { data, error } = await supabase
      .from("invoices")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteInvoice(id: string) {
    const { error } = await supabase.from("invoices").delete().eq("id", id);

    if (error) throw error;
  },

  // Quote operations
  async createQuote(quote: QuoteInsert, items: QuoteItemInsert[]) {
    const { data: newQuote, error: quoteError } = await supabase
      .from("quotes")
      .insert(quote)
      .select()
      .single();

    if (quoteError) throw quoteError;

    const { error: itemsError } = await supabase
      .from("quote_items")
      .insert(items.map((item) => ({ ...item, quote_id: newQuote.id })));

    if (itemsError) throw itemsError;

    return newQuote;
  },

  async getQuotes(userId: string) {
    const { data, error } = await supabase
      .from("quotes")
      .select(
        `
        *,
        quote_items (*),
        clients (*)
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getQuote(id: string) {
    const { data, error } = await supabase
      .from("quotes")
      .select(
        `
        *,
        quote_items (*),
        clients (*)
      `
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async updateQuote(id: string, updates: Partial<QuoteInsert>) {
    const { data, error } = await supabase
      .from("quotes")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteQuote(id: string) {
    const { error } = await supabase.from("quotes").delete().eq("id", id);

    if (error) throw error;
  },

  // Admin operations
  async getAllInvoices() {
    const { data, error } = await supabase
      .from("invoices")
      .select(
        `
        *,
        invoice_items (*),
        clients (*),
        users:user_id (*)
      `
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getAllQuotes() {
    const { data, error } = await supabase
      .from("quotes")
      .select(
        `
        *,
        quote_items (*),
        clients (*),
        users:user_id (*)
      `
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async sendInvoice(id: string) {
    const { data: invoice, error } = await supabase
      .from("invoices")
      .select(
        `
        *,
        invoice_items (*),
        clients (*)
      `
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    if (!invoice) throw new Error("Invoice not found");

    // Send email
    await emailService.sendInvoiceEmail(invoice);

    // Update invoice status
    const { error: updateError } = await supabase
      .from("invoices")
      .update({ status: "sent" })
      .eq("id", id);

    if (updateError) throw updateError;

    return invoice;
  },
};
