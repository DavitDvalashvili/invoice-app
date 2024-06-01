"use client";
import { InvoiceItemProps } from "@/types/types";
import { useContext } from "react";

const InvoiceItem = ({ params }: InvoiceItemProps) => {
  return (
    <div>
      invoice Item {params.invoiceItem}
      <div>test</div>
    </div>
  );
};

export default InvoiceItem;
