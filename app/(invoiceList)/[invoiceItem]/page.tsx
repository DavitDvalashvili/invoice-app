"use client";
import { InvoiceItemProps } from "@/types/types";

const InvoiceItem = ({ params }: InvoiceItemProps) => {
  console.log(params);
  return <div>invoice Item {params.invoiceItem}</div>;
};

export default InvoiceItem;
