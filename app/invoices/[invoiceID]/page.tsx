"use client";

import { IInvoiceItemParams } from "@/types/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { IInvoice } from "@/types/types";
import Loader from "@/components/Loader";
import NotFound from "@/app/not-found";
import Link from "next/link";

const Invoice = ({ params }: IInvoiceItemParams) => {
  const [invoiceData, setInvoiceData] = useState<IInvoice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`/api/invoice/${params.invoiceID}`);
        const data: IInvoice = response.data;
        setInvoiceData(data);
      } catch (error) {
        console.error("Error fetching invoices data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [params.invoiceID]);

  return (
    <div className="">
      {loading ? (
        <Loader />
      ) : invoiceData ? (
        <>
          <Link href="/invoices">Go back</Link>
          <span>{invoiceData.clientName}</span>
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Invoice;
