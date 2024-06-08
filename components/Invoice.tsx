import React from "react";
import { IInvoiceProp } from "@/types/types";
import { MdKeyboardArrowRight } from "react-icons/md";
import { format } from "date-fns";
import useWindowWidth from "@/hooks/useWindowWidth";
import { IItem } from "@/types/types";

const Invoice = ({
  id,
  number,
  paymentTerms,
  clientName,
  status,
  invoiceDate,
  items,
}: IInvoiceProp) => {
  const windowWidth = useWindowWidth();

  const invoiceDateConverter = (invoiceDate: Date, paymentTerms: number) => {
    const timeStamp = new Date(invoiceDate).getTime();
    const newTimeStamp = timeStamp + paymentTerms * 24 * 60 * 60 * 1000;
    const formattedDateString = format(newTimeStamp, "dd MMM yyyy");
    return formattedDateString;
  };

  const CalculateTotal = (items: IItem[]) => {
    const total = items.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.itemTotal;
    }, 0);

    return total.toFixed(2);
  };

  return (
    <div className="  cursor-pointer hover:border-VenetianNights border-[1px] border-transparent   bg-white dark:bg-Kon dark:text-white rounded-lg flex flex-col md:justify-evenly md:flex-row gap-[24px] md:gap-[50px] pt-[25px] px-[24px] pb-[22px] md:py-4 lg:w-[730px] lg:mx-auto  ">
      <div className="flex justify-between items-center md:gap-[28px] md:flex-grow md:justify-between">
        <p className="text-[15px] font-bold leading-[15px] tracking-[-0.25px]">
          <span className="text-TrueLavender">#</span>
          {number}
        </p>
        {windowWidth && windowWidth < 768 && (
          <h3 className="text-[13px] font-medium leading-[15px] tracking-[-0.1px] capitalize text-PurpleImpression dark:text-white">
            {clientName}
          </h3>
        )}
        {windowWidth && windowWidth >= 768 && (
          <p className="text-[13px] font-medium leading-[15px] tracking-[-0.1px] capitalize text-PurpleImpression dark:text-StoicWhite">
            {invoiceDateConverter(invoiceDate, paymentTerms)}
          </p>
        )}
      </div>
      <div className="flex justify-between items-center md:flex-grow  md:gap-[40px] md:justify-evenly">
        <div className="flex flex-col md:flex-row md: gap-[9px] md:justify-evenly md:flex-grow items-start md:items-center">
          {windowWidth && windowWidth < 768 && (
            <p className="text-[13px] font-medium leading-[15px] tracking-[-0.1px] capitalize text-PurpleImpression dark:text-StoicWhite">
              {invoiceDateConverter(invoiceDate, paymentTerms)}
            </p>
          )}
          {windowWidth && windowWidth >= 768 && (
            <h3 className="text-[13px] font-medium leading-[15px] tracking-[-0.1px] capitalize text-PurpleImpression dark:text-white  ">
              {clientName}
            </h3>
          )}
          {items.length && (
            <div
              id="total"
              className="text-[15px] font-bold leading-[24px] tracking-[-0.25px]"
            >
              <span>£</span> {CalculateTotal(items)}
            </div>
          )}
        </div>
        <p
          className={`${
            status === "draft"
              ? "bg-CarbonBlue2 text-CarbonBlue dark:text-StoicWhite dark:bg-StoicWhite2"
              : status === "pending"
              ? "bg-PrincetonOrange2 text-PrincetonOrange"
              : "text-DarkShamrock bg-DarkShamrock2"
          } text-[15px] font-bold leading-[15px] tracking-[-0.25px] pt-[14px] pr-[19px] pb-[11px] pl-[18px] gap-2 flex justify-center items-center capitalize w-[104px] h-[40px] rounded-md`}
        >
          <span className="text-[21px] w-2 h-2 flex justify-center items-center">
            &bull;
          </span>
          <span>{status}</span>
        </p>
        {windowWidth && windowWidth > 768 && (
          <MdKeyboardArrowRight className="text-VenetianNights ml-[-20px] text-[22px]" />
        )}
      </div>
    </div>
  );
};

export default Invoice;
