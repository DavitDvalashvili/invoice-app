import mongoose, { Document } from "mongoose";

export interface IItem {
  itemName: string;
  itemQuantity: number | undefined;
  itemPrice: number | undefined;
  itemTotal: number;
  itemId: string;
}

export interface IInvoice extends Document {
  id: string;
  street: string;
  city: string;
  postCode: string;
  country: string;
  clientName: string;
  clientEmail: string;
  clientStreet: String;
  clientCity: String;
  clientPostCode: String;
  clientCountry: String;
  invoiceDate: Date;
  paymentTerms: Number;
  description: String;
  status: string;
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
