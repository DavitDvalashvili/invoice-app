"use client";
import React from "react";
import Image from "next/image";
import notFound from "@/public/notFound.svg";
import useWindowWidth from "@/hooks/useWindowWidth";
import Link from "next/link";

export const NotFound = () => {
  const windowWidth = useWindowWidth();

  return (
    <div className="flex justify-center items-center flex-col gap-[42px] h-[calc(100vh-72px)] md:h-[calc(100vh-80px)] lg:h-[100vh]">
      <Image
        src={notFound}
        alt="logo"
        height={windowWidth && windowWidth < 768 ? 160 : 200}
        width={windowWidth && windowWidth < 768 ? 193.07 : 241.34}
        priority
      />
      <h2 className="text-[24px] font-bold tracking-[0.75px] text-RuinedSmores dark:text-white">
        Page not found
      </h2>
      <p className="font-medium text-[13px] leading-[15px] tracking-[-0.1px] text-PurpleImpression dark:text-StoicWhite mt-[-23px]">
        Return to the home page by clicking the{" "}
        <Link className="font-bold cursor-pointer" href="/invoices">
          Go Home
        </Link>{" "}
        button
      </p>
    </div>
  );
};

export default NotFound;
