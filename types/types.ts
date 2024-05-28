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
  id: string;
}

export interface IInvoice extends Document {
  id: string;
  createdAt: Date;
  paymentDue: Date;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
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

export interface IFilterBox {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

export interface ICheckBox {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  status: string;
}

export interface IInvoiceProp {
  id: string;
  paymentDue: Date;
  clientName: string;
  status: string;
  total: number;
}
