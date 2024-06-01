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
  ];

  const selectRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (value: string) => {
    onChange(value); // Update the selected value
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className="relative w-[150px]" ref={selectRef}>
      <div
        className="w-full bg-white text-red-500 rounded-[2px] border border-gray-300 py-2 px-4 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)} // Toggle the dropdown
      >
        {options.find((option) => option.value === value)?.label ||
          "Net 7 Days"}
        <FaChevronDown
          className={`ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-green-500 shadow-lg rounded-[20px] mt-1 z-10">
          {options.map((option) => (
            <div
              key={option.value}
              className="py-2 px-4 cursor-pointer hover:bg-red-200"
              onClick={() => handleOptionClick(option.value)} // Handle option click
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
