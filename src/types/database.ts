export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "cancelled";
export type QuoteStatus =
  | "draft"
  | "sent"
  | "accepted"
  | "rejected"
  | "expired";

export interface Invoice {
  id: string;
  user_id: string;
  client_id: string;
  invoice_number: string;
  status: InvoiceStatus;
  issue_date: string;
  due_date: string;
  total_amount: number;
  tax_amount: number;
  notes?: string;
  terms?: string;
  created_at: string;
  updated_at: string;
}

export interface Quote {
  id: string;
  user_id: string;
  client_id: string;
  quote_number: string;
  status: QuoteStatus;
  issue_date: string;
  expiry_date: string;
  total_amount: number;
  tax_amount: number;
  notes?: string;
  terms?: string;
  created_at: string;
  updated_at: string;
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;
  amount: number;
  created_at: string;
}

export interface QuoteItem {
  id: string;
  quote_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;
  amount: number;
  created_at: string;
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      invoices: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          client_id: string;
          invoice_number: string;
          status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
          due_date: string;
          total_amount: number;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          client_id: string;
          invoice_number: string;
          status?: "draft" | "sent" | "paid" | "overdue" | "cancelled";
          due_date: string;
          total_amount: number;
          notes?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          client_id?: string;
          invoice_number?: string;
          status?: "draft" | "sent" | "paid" | "overdue" | "cancelled";
          due_date?: string;
          total_amount?: number;
          notes?: string | null;
        };
      };
      invoice_items: {
        Row: {
          id: string;
          created_at: string;
          invoice_id: string;
          description: string;
          quantity: number;
          unit_price: number;
          amount: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          invoice_id: string;
          description: string;
          quantity: number;
          unit_price: number;
          amount: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          invoice_id?: string;
          description?: string;
          quantity?: number;
          unit_price?: number;
          amount?: number;
        };
      };
      quotes: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          client_id: string;
          quote_number: string;
          status: "draft" | "sent" | "accepted" | "rejected" | "expired";
          valid_until: string;
          total_amount: number;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          client_id: string;
          quote_number: string;
          status?: "draft" | "sent" | "accepted" | "rejected" | "expired";
          valid_until: string;
          total_amount: number;
          notes?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          client_id?: string;
          quote_number?: string;
          status?: "draft" | "sent" | "accepted" | "rejected" | "expired";
          valid_until?: string;
          total_amount?: number;
          notes?: string | null;
        };
      };
      quote_items: {
        Row: {
          id: string;
          created_at: string;
          quote_id: string;
          description: string;
          quantity: number;
          unit_price: number;
          amount: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          quote_id: string;
          description: string;
          quantity: number;
          unit_price: number;
          amount: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          quote_id?: string;
          description?: string;
          quantity?: number;
          unit_price?: number;
          amount?: number;
        };
      };
      clients: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          user_id: string;
          name: string;
          email: string | null;
          phone: string | null;
          address: string | null;
          city: string | null;
          state: string | null;
          country: string | null;
          postal_code: string | null;
          tax_id: string | null;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id: string;
          name: string;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          country?: string | null;
          postal_code?: string | null;
          tax_id?: string | null;
          notes?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string;
          name?: string;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          country?: string | null;
          postal_code?: string | null;
          tax_id?: string | null;
          notes?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
