import React, { useState, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useController, Control } from "react-hook-form";

interface CustomSelectProps {
  name: string;
  control: Control<any>;
  defaultValue?: string; // Optional default value
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  control,
  defaultValue = "7", // Default value if none is provided
}) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue, // Set the default value here
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const options = [
    { value: "1", label: "Net 1 Day" },
    { value: "7", label: "Net 7 Days" },
    { value: "14", label: "Net 14 Days" },
    { value: "30", label: "Net 30 Days" },
  ]; // Options for the select dropdown

  const selectRef = useRef<HTMLDivElement>(null);

  // Function to handle option click and update selected value
  const handleOptionClick = (value: string) => {
    onChange(value); // Update the selected value
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className="relative w-full" ref={selectRef}>
      <div
        className={`
        cursor-pointer 
        w-full 
        dark:text-white 
        dark:bg-Kon 
        dark:border-RoyalCurtsy 
        bg-white 
        text-RuinedSmores 
        rounded-[4px] 
        text-[15px] 
        leading-[15px] 
        font-bold 
        tracking-[-0.25px] 
        border-StoicWhite 
        border-[1px] 
        pt-[18px] 
        pb-[15px] 
        px-[24px] 
        flex 
        justify-between 
        items-center 
        ${isOpen ? "border-VenetianNights dark:border-VenetianNights" : ""}
      `}
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find((option) => option.value === value)?.label ||
          "Net 7 Days"}
        <FaChevronDown
          className={` text-[12px] transition-transform duration-200 text-VenetianNights ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      {isOpen && (
        <div className="absolute text-[15px] leading-[15px] font-bold dark:shadow-[0px_10px_20px_0px_rgba(0,0,0,0.25)] shadow-[0px_10px_20px_0px_rgba(72,84,159,0.25)] tracking-[-0.25px] rounded-[8px] top-full left-0 w-full text-RuinedSmores dark:text-StoicWhite bg-white dark:bg-RoyalCurtsy mt-[8px] z-2">
          {options.map((option, index) => (
            <div
              key={option.value}
              className={`cursor-pointer px-[24px] pt-[16px] pb-[15px] border-b border-solid ${
                index !== options.length - 1
                  ? "border-b-[1px]"
                  : "border-b-[0px]"
              } border-gray-300 dark:border-b-Kon`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
