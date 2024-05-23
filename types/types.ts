import mongoose, { Document } from "mongoose";

// Define TypeScript interfaces for the schemas
export interface IClientAddress {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface IItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface IInvoice extends Document {
  id: string;
  createdAt: Date;
  paymentDue: Date;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: "draft" | "pending" | "paid";
  clientAddress: IClientAddress;
  items: IItem[];
  total: number;
}

export interface InvoiceItemParams {
  invoiceItem: string;
}

export interface InvoiceItemProps {
  params: InvoiceItemParams;
}

export interface ThemeContextProps {
  theme: string;
  setTheme: (value: string) => void;
}
