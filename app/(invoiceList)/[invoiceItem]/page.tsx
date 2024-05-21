"use client";
import { InvoiceItemProps } from "@/types/types";
import { useContext } from "react";
import { ThemeContext } from "@/context/context";

const InvoiceItem = ({ params }: InvoiceItemProps) => {
  const themeContext = useContext(ThemeContext);
  return (
    <div>
      invoice Item {params.invoiceItem}
      <div>{themeContext.theme}</div>
    </div>
  );
};

export default InvoiceItem;
