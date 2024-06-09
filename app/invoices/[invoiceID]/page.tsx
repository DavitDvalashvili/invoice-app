"use client";
import { IInvoiceItemParams } from "@/types/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { IInvoice } from "@/types/types";
import Loader from "@/components/Loader";
import NotFound from "@/app/not-found";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";
import useWindowWidth from "@/hooks/useWindowWidth";

const Invoice = ({ params }: IInvoiceItemParams) => {
  const [invoiceData, setInvoiceData] = useState<IInvoice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const windowWidth = useWindowWidth();

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
          <div className="bg-ZhēnZhūBáiPearl dark:bg-RiverStyx pt-[33px] px-[24px] pb-[56px]">
            {windowWidth && windowWidth < 768 && (
              <Link href="/invoices">
                <p className="flex justify-start items-center gap-[12.66px] font-bold">
                  <MdKeyboardArrowLeft className="text-VenetianNights text-[22px] leading-[15px]" />
                  <span className="text-[15px], leading-[15px] tracking-[-0.25px] text-RuinedSmores dark:text-white">
                    Go back
                  </span>
                </p>
              </Link>
            )}
            <div className="bg-white dark:bg-Kon rounded-[8px] px-[24px] pt-[24px] pb-[27px] md:px-[32px] md:py-[20px] mt-[31px] md:flex md:justify-between md:items-center">
              <div className="flex justify-between items-center md:gap-[20px]">
                <p className="text-[13px] leading-[15px] font-medium tracking-[-0.1px] text-TrueLavender dark:text-StoicWhite">
                  Status
                </p>
                <p
                  className={`${
                    invoiceData.status === "draft"
                      ? "bg-CarbonBlue2 text-CarbonBlue dark:text-StoicWhite dark:bg-StoicWhite2"
                      : invoiceData.status === "pending"
                      ? "bg-PrincetonOrange2 text-PrincetonOrange"
                      : "text-DarkShamrock bg-DarkShamrock2"
                  } text-[15px] font-bold leading-[15px] tracking-[-0.25px] pt-[14px] pr-[19px] pb-[11px] pl-[18px] gap-2 flex justify-center items-center capitalize w-[104px] h-[40px] rounded-md`}
                >
                  <span className="text-[21px] w-2 h-2 flex justify-center items-center">
                    &bull;
                  </span>
                  <span>{invoiceData.status}</span>
                </p>
              </div>
              {windowWidth && windowWidth >= 768 && (
                <div className=" flex justify-end items-center gap-[8px]">
                  <button className=" pl-[24px] pr-[23px] pb-[15px] pt-[18px] text-[15px] leading-[15px] font-bold tracking-[-0.25px] rounded-[24px] text-TrueLavender bg-WashMe dark:bg-RoyalCurtsy dark:text-StoicWhite hover:bg-StoicWhite dark:hover:bg-white transition duration-300 ease-in-out md:mr-auto ">
                    Edit
                  </button>
                  <button className="pl-[24px] pr-[25px] pb-[15px] pt-[18px] text-[15px] leading-[15px] font-bold tracking-[-0.25px] rounded-[24px] text-white bg-KhmerCurry hover:bg-AmericanPink transition duration-300 ease-in-out">
                    Delete
                  </button>
                  <button className="pl-[24px] pr-[23px] pb-[15px] pt-[18px] text-[15px] leading-[15px] font-bold tracking-[-0.25px] rounded-[24px] text-white bg-VenetianNights dark:text-StoicWhite hover:bg-ForgottenPurple transition duration-300 ease-in-out">
                    Mark as Paid
                  </button>
                </div>
              )}
            </div>
          </div>
          {windowWidth && windowWidth < 768 && (
            <div className=" flex justify-end items-center gap-[8px] bg-white px-[24px] pt-[21px] pb-[22px]">
              <button className=" pl-[24px] pr-[23px] pb-[15px] pt-[18px] text-[15px] leading-[15px] font-bold tracking-[-0.25px] rounded-[24px] text-TrueLavender bg-WashMe dark:bg-RoyalCurtsy dark:text-StoicWhite hover:bg-StoicWhite dark:hover:bg-white transition duration-300 ease-in-out md:mr-auto ">
                Edit
              </button>
              <button className="pl-[24px] pr-[25px] pb-[15px] pt-[18px] text-[15px] leading-[15px] font-bold tracking-[-0.25px] rounded-[24px] text-white bg-KhmerCurry hover:bg-AmericanPink transition duration-300 ease-in-out">
                Delete
              </button>
              <button className="pl-[24px] pr-[23px] pb-[15px] pt-[18px] text-[15px] leading-[15px] font-bold tracking-[-0.25px] rounded-[24px] text-white bg-VenetianNights dark:text-StoicWhite hover:bg-ForgottenPurple transition duration-300 ease-in-out">
                Mark as Paid
              </button>
            </div>
          )}
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Invoice;
