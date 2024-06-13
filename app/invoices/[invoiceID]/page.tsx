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
import InvoiceDetails from "@/components/InvoiceDetails";
import ConfirmDelete from "@/components/ConfirmDelete";
import InputBox from "@/components/InputBox";

const Invoice = ({ params }: IInvoiceItemParams) => {
  const [invoiceData, setInvoiceData] = useState<IInvoice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const windowWidth = useWindowWidth();
  const [Updating, setUpdating] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showInputBox, setShowInputBox] = useState<boolean>(false);

  const markAsPaid = async () => {
    try {
      if (invoiceData) {
        setUpdating(true);
        const updatedInvoiceData = { ...invoiceData, status: "paid" };
        const response = await axios.post(
          `/api/invoice/${invoiceData.id}`,
          updatedInvoiceData
        );
        setUpdating(false);
        fetchInvoice();
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

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

  useEffect(() => {
    fetchInvoice();
  }, [params.invoiceID, showInputBox]);

  return (
    <>
      <div className="relative lg:static">
        {loading ? (
          <Loader />
        ) : invoiceData ? (
          <>
            <div className="bg-ZhēnZhūBáiPearl dark:bg-RiverStyx pt-[33px] md:pt-[49px] px-[24px] md:px-[40px] pb-[56px] md:pb-[135px]  lg:w-[730px] lg:px-0 lg:mx-auto lg:min-h-[100vh]">
              <Link href="/invoices">
                <p className="flex justify-start items-center gap-[12.66px] font-bold">
                  <MdKeyboardArrowLeft className="text-VenetianNights text-[22px] leading-[15px]" />
                  <span className="text-[15px], leading-[15px] tracking-[-0.25px] text-RuinedSmores dark:text-white cursor-pointer hover:text-TrueLavender dark:hover:text-PurpleImpression">
                    Go back
                  </span>
                </p>
              </Link>

              <div className="bg-white dark:bg-Kon rounded-[8px] px-[24px] pt-[24px] pb-[27px] md:px-[32px] md:py-[20px] mt-[31px] mb-[16px] md:mb-[24px] md:flex md:justify-between md:items-center">
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
                    <button
                      onClick={() => {
                        setShowInputBox(true);
                      }}
                      className=" pl-[24px] pr-[23px] pb-[15px] pt-[18px] text-[15px] leading-[15px] font-bold tracking-[-0.25px] rounded-[24px] text-TrueLavender bg-WashMe dark:bg-RoyalCurtsy dark:text-StoicWhite hover:bg-StoicWhite dark:hover:bg-white transition duration-300 ease-in-out md:mr-auto "
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setShowDelete(true);
                      }}
                      className="pl-[24px] pr-[25px] pb-[15px] pt-[18px] text-[15px] leading-[15px] font-bold tracking-[-0.25px] rounded-[24px] text-white bg-KhmerCurry hover:bg-AmericanPink transition duration-300 ease-in-out"
                    >
                      Delete
                    </button>
                    <button
                      onClick={markAsPaid}
                      disabled={invoiceData.status === "paid"}
                      className="pl-[24px] pr-[23px] pb-[15px] pt-[18px] text-[15px] leading-[15px] font-bold tracking-[-0.25px] rounded-[24px] text-white bg-VenetianNights dark:text-StoicWhite hover:bg-ForgottenPurple transition duration-300 ease-in-out"
                    >
                      {Updating ? "Updating..." : "Mark as Paid"}
                    </button>
                  </div>
                )}
              </div>
              <InvoiceDetails invoiceData={invoiceData} />
            </div>
            {windowWidth && windowWidth < 768 && !showInputBox && (
              <div className=" flex justify-end items-center gap-[8px] bg-white dark:bg-RoyalCurtsy px-[24px] pt-[21px] pb-[22px]">
                <button
                  onClick={() => {
                    setShowInputBox(true);
                  }}
                  className=" pl-[24px] pr-[23px] pb-[15px] pt-[18px] text-[15px] leading-[15px] font-bold tracking-[-0.25px] rounded-[24px] text-TrueLavender bg-WashMe dark:bg-RoyalCurtsy dark:text-StoicWhite hover:bg-StoicWhite dark:hover:bg-white transition duration-300 ease-in-out md:mr-auto "
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setShowDelete(true);
                  }}
                  className="pl-[24px] pr-[25px] pb-[15px] pt-[18px] text-[15px] leading-[15px] font-bold tracking-[-0.25px] rounded-[24px] text-white bg-KhmerCurry hover:bg-AmericanPink transition duration-300 ease-in-out"
                >
                  Delete
                </button>
                <button
                  onClick={markAsPaid}
                  disabled={invoiceData.status === "paid"}
                  className="pl-[24px] pr-[23px] pb-[15px] pt-[18px] text-[15px] leading-[15px] font-bold tracking-[-0.25px] rounded-[24px] text-white bg-VenetianNights dark:text-StoicWhite hover:bg-ForgottenPurple transition duration-300 ease-in-out"
                >
                  {Updating ? "Updating..." : "Mark as Paid"}
                </button>
              </div>
            )}
          </>
        ) : (
          <NotFound />
        )}
        {showDelete && (
          <ConfirmDelete
            id={invoiceData?.id}
            number={invoiceData?.number}
            showDelete={showDelete}
            setShowDelete={setShowDelete}
          />
        )}
      </div>
      {showInputBox && (
        <section className=" w-[100%] lg:w-[calc(100%-104px)] bg-Black2  absolute top-[72px] md:top-[80px] lg:top-0 lg:left-[104px] left-0 lg:max-h-[100vh] overflow-y-scroll">
          <InputBox
            setShowInputBox={setShowInputBox}
            mode="update"
            invoiceData={invoiceData}
          />
        </section>
      )}
    </>
  );
};

export default Invoice;
