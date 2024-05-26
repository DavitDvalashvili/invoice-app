import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { ICheckBox } from "@/types/types";

const CustomCheckbox = ({ selected, setSelected, status }: ICheckBox) => {
  const handleChangeSelection = (value: string) => {
    setSelected(value);
  };

  return (
    <label className="flex justify-start items-center gap-[13px] cursor-pointer group">
      <input
        type="checkbox"
        className="hidden"
        checked={selected === `${status}`}
        id="custom-checkbox"
      />
      <label
        onClick={() => handleChangeSelection(status)}
        className={`h-4 w-4 flex items-center justify-center cursor-pointer rounded-sm p-[3px] border-[1px] border-transparent transition duration-300 ease-in-out
        ${
          selected === `${status}`
            ? "bg-VenetianNights border-VenetianNights"
            : "bg-StoicWhite dark:bg-Kon group-hover:border-VenetianNights"
        }`}
        htmlFor="custom-checkbox"
      >
        {selected === `${status}` && <FaCheck color="white" />}
      </label>
      <span
        className="text-[15px] font-bold leading-[15px] tracking-[-0.25px] capitalize text-Kon dark:text-white"
        onClick={() => handleChangeSelection(status)}
      >
        {status}
      </span>
    </label>
  );
};

export default CustomCheckbox;
