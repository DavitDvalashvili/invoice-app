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
