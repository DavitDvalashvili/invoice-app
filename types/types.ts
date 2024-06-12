import mongoose, { Document } from "mongoose";

export interface IItem {
  itemName: string;
  itemQuantity: number | undefined;
  itemPrice: number | undefined;
  itemTotal: number;
  itemId: string;
}

export interface IInvoice extends Document {
  number: string;
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
  paymentTerms: number;
  description: String;
  status: string;
  items: IItem[];
}

export interface IInvoiceItemParams {
  params: {
    invoiceID: string;
  };
}

export interface ThemeContextProps {
  theme: string;
  setTheme: (value: string) => void;
}

export interface IFilterBox {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  hideFilterBox: boolean;
  setHideFilterBox: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IInputBox {
  setShowInputBox: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ICheckBox {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  status: string;
}

export interface IInvoiceProp {
  id: string;
  number: string;
  paymentTerms: number;
  clientName: string;
  status: string;
  invoiceDate: Date;
  items: IItem[];
}

export interface InvoiceDetailsProps {
  invoiceData: IInvoice;
}

export interface IConfirmDeleteProps {
  number: string | undefined;
  id: string;
  showDelete: boolean;
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>;
}
