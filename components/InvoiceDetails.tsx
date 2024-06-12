import React from "react";
import { InvoiceDetailsProps } from "@/types/types";
import { format } from "date-fns";
import useWindowWidth from "@/hooks/useWindowWidth";
import { IItem } from "@/types/types";

const InvoiceDetails = ({ invoiceData }: InvoiceDetailsProps) => {
  const WindowWidth = useWindowWidth();

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
    <section className="bg-white dark:bg-Kon rounded-[8px] px-[24px] pt-[25px] pb-[25px] md:pt-[33px] md:pb-[31px] md:px-[32px]  lg:pt-[49px] lg:pb-[48px] lg:px-[48px] drop-shadow-[0_10px_10px_-10px_rgba(72, 84, 159, 0.10)]">
      <div className="flex flex-col justify-start gap-[30px] md:flex-row md:justify-between">
        <div>
          <h2 className="text-[15px] leading-[15px] md:leading-[24px] font-bold tracking-[-0.25px] text-RuinedSmores dark:text-white mb-[4px] md:mb-[7px]">
            <span className="text-TrueLavender">#</span>
            {invoiceData.number}
          </h2>
          <p className="text-[13px] leading-[15px] font-medium tracking-[-0.1px] text-TrueLavender dark:text-StoicWhite">
            {invoiceData.description}
          </p>
        </div>
        <div className="text-[13px] leading-[18px] font-medium tracking-[-0.1px] text-TrueLavender dark:text-StoicWhite md:text-right">
          <p>{invoiceData.street}</p>
          <p>{invoiceData.city}</p>
          <p>{invoiceData.postCode}</p>
          <p>{invoiceData.country}</p>
        </div>
      </div>
      <div className="flex justify-start items-start flex-wrap gap-x-[60px] md:gap-[117px]">
        <div>
          <div className="mb-[31px]">
            <h3 className="text-[13px] leading-[15px] font-medium tracking-[-0.1px] text-TrueLavender dark:text-StoicWhite mb-[13px]">
              Invoice Date
            </h3>
            <p className="text-[15px] leading-[20px] font-bold tracking-[-0.25px] text-RuinedSmores dark:text-white ">
              {format(
                new Date(invoiceData.invoiceDate).getTime(),
                "dd MMM yyyy"
              )}
            </p>
          </div>
          <div>
            <h3 className="text-[13px] leading-[15px] font-medium tracking-[-0.1px] text-TrueLavender dark:text-StoicWhite mb-[13px]">
              Payment Due
            </h3>
            <p className="text-[15px] leading-[20px] font-bold tracking-[-0.25px] text-RuinedSmores dark:text-white ">
              {invoiceDateConverter(
                invoiceData.invoiceDate,
                invoiceData.paymentTerms
              )}
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-[13px] leading-[15px] font-medium tracking-[-0.1px] text-TrueLavender dark:text-StoicWhite mb-[13px]">
            Bill To
          </h3>
          <p className="text-[15px] leading-[20px] font-bold tracking-[-0.25px] text-RuinedSmores dark:text-white mb-[7px]">
            {invoiceData.clientName}
          </p>
          <div className="text-[13px] leading-[18px] font-medium tracking-[-0.1px] text-TrueLavender dark:text-StoicWhite">
            <p>{invoiceData.clientStreet}</p>
            <p>{invoiceData.clientCity}</p>
            <p>{invoiceData.postCode}</p>
            <p>{invoiceData.clientCountry}</p>
          </div>
        </div>
        <div className="mt-[32px] w-[100%] md:w-[auto] md:mt-[0px]">
          <h3 className="text-[13px] leading-[15px] font-medium tracking-[-0.1px] text-TrueLavender dark:text-StoicWhite mb-[13px]">
            Send to
          </h3>
          <p className="text-[15px] leading-[20px] font-bold tracking-[-0.25px] text-RuinedSmores dark:text-white">
            {invoiceData.clientEmail}
          </p>
        </div>
      </div>
      <div
        id="summery"
        className="rounded-[8px] bg-WashMe dark:bg-RoyalCurtsy overflow-hidden mt-[38px]"
      >
        <div className="flex flex-col gap-[24px] px-[24px] pt-[25px] md:px-[32px] md:pt-[33px]">
          {invoiceData.items.map((item, index) => (
            <div
              className="flex justify-between items-center md:justify-between md:gap-[20px]"
              key={item.itemId}
            >
              <div className="">
                {WindowWidth && WindowWidth >= 768 && index == 0 && (
                  <h3 className="text-[13px] leading-[18px] font-medium tracking-[-0.1px] text-TrueLavender dark:text-StoicWhite mb-[32px]">
                    Item Name
                  </h3>
                )}
                <p className=" text-RuinedSmores dark:text-white mb-[8px] text-[15px] leading-[20px] font-bold tracking-[-0.25px]">
                  {item.itemName}
                </p>
                {WindowWidth && WindowWidth < 768 && (
                  <p className=" text-TrueLavender dark:text-PurpleImpression ">
                    <span>{item.itemQuantity}</span> x <span>£</span>{" "}
                    <span>{item.itemPrice && item.itemPrice.toFixed(2)}</span>
                  </p>
                )}
              </div>
              <div className="md:flex md:w-[282px] md:justify-between">
                {WindowWidth && WindowWidth >= 768 && (
                  <div className="md:w-[60px] md:text-center">
                    {index == 0 && (
                      <h3 className=" text-[13px] leading-[18px] font-medium tracking-[-0.1px] text-TrueLavender dark:text-StoicWhite mb-[32px]">
                        QTY.
                      </h3>
                    )}
                    <p className=" text-[15px] leading-[15px]  font-bold tracking-[-0.1px] text-TrueLavender dark:text-StoicWhite ">
                      {item.itemQuantity}
                    </p>
                  </div>
                )}
                {WindowWidth && WindowWidth >= 768 && (
                  <div className="md:w-[60px] md:text-center">
                    {WindowWidth && WindowWidth >= 768 && index == 0 && (
                      <h3 className=" text-[13px] leading-[18px] font-medium tracking-[-0.1px] text-TrueLavender dark:text-StoicWhite mb-[32px]">
                        Price
                      </h3>
                    )}
                    <p className=" text-[15px] leading-[15px]  font-bold tracking-[-0.1px] text-TrueLavender dark:text-StoicWhite ">
                      <span>£</span> {item.itemPrice?.toFixed(2)}
                    </p>
                  </div>
                )}
                <div className="md:w-[70px] md:text-center">
                  {WindowWidth && WindowWidth >= 768 && index == 0 && (
                    <h3 className="  text-[13px] leading-[18px] font-medium tracking-[-0.1px] text-TrueLavender dark:text-StoicWhite mb-[32px]">
                      Total
                    </h3>
                  )}
                  <p className="text-[15px] leading-[20px] font-bold tracking-[-0.25px] text-RuinedSmores dark:text-white  md:leading-[15px] ">
                    <span>£</span> {item.itemTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pb-[22px] px-[24px] pt-[26px] bg-CarbonBlue dark:bg-RuinedSmores flex justify-between items-center text-white mt-[23px] md:mt-[39px]">
          <h2 className="text-[13px] leading-[18px] font-medium tracking-[-0.1px]">
            Grand total
          </h2>
          <p className="text-[24px] leading-[32px] font-bold tracking-[-0.5px]">
            {" "}
            <span>£</span> {CalculateTotal(invoiceData.items)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default InvoiceDetails;
