"use client";
import { useContext } from "react";
import React, { useState } from "react";
import arrow from "@/public/arrow.svg";
import Image from "next/image";
import FilterBox from "@/components/FilterBox";
import CustomCheckbox from "@/components/CustomCheckbox";

export default function Home() {
  return (
    <section>
      <div id="interactiveBox">
        <div id="title">
          <h3>Invoices</h3>
          <span>{`${2} invoices`}</span>
        </div>
        <div id="filterBox">
          <div>Filter</div>
          <Image src={arrow} alt="arrow" height="7" width="10" />
          <FilterBox />
        </div>
      </div>
    </section>
  );
}
