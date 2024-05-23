"use client";
import { InvoiceItemProps } from "@/types/types";
import { useContext } from "react";
import { ThemeContext } from "../layout";

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
