"use client";
import React from "react";
import Image from "next/image";
import notFound from "@/public/notFound.svg";
import Link from "next/link";

// Component for displaying "Page not found" message
const NotFound = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-[42px] h-[calc(100vh-72px)] md:h-[calc(100vh-80px)] lg:h-[100vh]">
      <Image
        src={notFound}
        alt="logo"
        className={"w-[160px] md:w-[200px] h-[160px] md:h-[241.34px]"}
        priority
      />
      <h2 className="text-[24px] font-bold tracking-[0.75px] text-RuinedSmores dark:text-white">
        Page not found
      </h2>
      <p className="font-medium text-[13px] leading-[15px] tracking-[-0.1px] text-PurpleImpression dark:text-StoicWhite mt-[-23px]">
        Return to the home page by clicking the{" "}
        <Link
          className="font-bold cursor-pointer hover:underline text-VenetianNights"
          href="/invoices"
        >
          Go Home
        </Link>{" "}
        button
      </p>
    </div>
  );
};

export default NotFound;

// Component for displaying "Nothing here" message
export const NotFoundFilter = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-[42px] mt-[102px] md:mt-[216px] lg:mt-[147px]">
      <Image
        src={notFound}
        alt="logo"
        className={"w-[160px] md:w-[200px] h-[160px] md:h-[241.34px]"}
        priority
      />
      <h2 className="text-[24px] font-bold tracking-[0.75px] text-RuinedSmores dark:text-white">
        There is nothing here
      </h2>
      <p className="font-medium text-[13px] leading-[15px] tracking-[-0.1px] text-PurpleImpression dark:text-StoicWhite mt-[-23px] w-[193px] text-center ">
        Create an invoice by clicking the{" "}
        <Link className="font-bold cursor-pointer" href="/invoices">
          New Invoice
        </Link>{" "}
        button and get started
      </p>
    </div>
  );
};
