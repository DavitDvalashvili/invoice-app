"use client";

import { useContext, useEffect } from "react";
import React, { useState } from "react";
import Image from "next/image";
import FilterBox from "@/components/FilterBox";
import AddInvoice from "@/public/AddInvoice.svg";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import useWindowWidth from "@/hooks/useWindowWidth";
import axios from "axios";
import { IInvoice } from "@/types/types";
import Invoice from "@/components/Invoice";
import InputBox from "@/components/InputBox";

export default function Home() {
  const [hideFilterBox, setHideFilterBox] = useState<boolean>(true);
  const [invoicesData, setInvoicesData] = useState<IInvoice[]>([]);
  const [selected, setSelected] = useState<string>("all");
  const [showInputBox, setShowInputBox] = useState<boolean>(false);

  const windowWidth = useWindowWidth();

  useEffect(() => {
    const FetchInvoices = async () => {
      try {
        const response = await axios.get(`api/invoices/${selected}`);
        const data = response.data;
        setInvoicesData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    FetchInvoices();
  }, [selected]);

  return (
    <section className="h-[100vh]  px-6 md:px-12 pt-8 md:pt-[61px] lg:pt-[77px]  pb-[105px] md:pb-[173px] lg:pb-[0px] tracking-[-0.75px] lg:overflow-y-hidden  ">
      <div
        id="interactiveBox"
        className="flex justify-between items-center dark:text-white text-RuinedSmores lg:w-[730px] lg:mx-auto "
      >
        <div id="title" className="h-10 md:h-[54px]">
          <h3 className="text-2xl md:text-[36px] font-bold leading-[22px] md:leading-[33px]">
            Invoices
          </h3>
          <span className="leading-[15px] text-[13px] font-medium text-PurpleImpression dark:text-StoicWhite">{`${
            invoicesData.length ? invoicesData.length : "No"
          } invoices`}</span>
        </div>
        <div
          id="filterBox"
          className="flex gap-3 md:gap-[15px] font-bold text-[15px] justify-between items-center cursor-pointer "
        >
          <div className="flex justify-center items-center gap-2 no-wrap relative">
            {windowWidth && (
              <div
                onClick={() => {
                  setHideFilterBox(!hideFilterBox);
                }}
              >
                {windowWidth < 768 ? "Filter" : "Filter By Status"}
              </div>
            )}
            {hideFilterBox && (
              <MdKeyboardArrowDown
                onClick={() => {
                  setHideFilterBox(!hideFilterBox);
                }}
                className="text-VenetianNights w-[20px] h-[30px]"
              />
            )}
            {!hideFilterBox && (
              <MdOutlineKeyboardArrowUp
                onClick={() => {
                  setHideFilterBox(!hideFilterBox);
                }}
                className="text-VenetianNights w-[20px] h-[30px]"
              />
            )}
            {!hideFilterBox && (
              <FilterBox selected={selected} setSelected={setSelected} />
            )}
          </div>
          <div
            className="flex justify-center items-center bg-VenetianNights gap-2 md:gap-4 p-1.5 md:p-2 rounded-3xl text-[15px] text-white pr-[15px] md:pr-[17px] leading-[15px] tracking-[-0.08px] md:tracking-[-0.20px] "
            onClick={() => {
              setShowInputBox(!showInputBox);
            }}
          >
            <Image src={AddInvoice} alt="AddInvoice" width="32" height="32" />
            {windowWidth && (
              <span>{windowWidth < 768 ? "New" : "New Invoice"}</span>
            )}
          </div>
        </div>
      </div>

      <section
        id="invoicesBox"
        className="mt-8 md:mt-[62px] flex flex-col gap-4 transition duration-500 ease-in-out  h-[100%] lg:h-[calc(100%-160px)] overflow-y-scroll"
      >
        {invoicesData.map((invoice) => (
          <Invoice
            key={invoice.id}
            id={invoice.id}
            paymentTerms={invoice.paymentTerms}
            clientName={invoice.clientName}
            status={invoice.status}
            invoiceDate={invoice.invoiceDate}
            items={invoice.items}
          />
        ))}
      </section>

      {showInputBox && (
        <section className=" w-[100%] lg:w-[calc(100%-104px)] bg-Black2  absolute top-[72px] md:top-[80px] lg:top-0 lg:left-[104px] left-0 max-h-[100vh] overflow-y-scroll">
          <InputBox setShowInputBox={setShowInputBox} />
        </section>
      )}
    </section>
  );
}
