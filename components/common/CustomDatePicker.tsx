import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { FaRegCalendar } from "react-icons/fa6";
import { useController, Control } from "react-hook-form";

interface CustomDatePickerProps {
  name: string;
  control: Control<any>;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  name,
  control,
}) => {
  // Using react-hook-form's useController to bind input field to the form
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  // Function to format placeholder text based on selected date
  const formatPlaceholder = (date: Date) => {
    return format(date, "dd MMM yyyy");
  };

  return (
    <div className="relative">
      <DatePicker
        selected={value}
        onChange={onChange}
        placeholderText={formatPlaceholder(new Date())}
        dateFormat="dd MMM yyyy"
        wrapperClassName="w-full leading-[15px] read-only"
        className=" w-full mt-[9px] px-[20px] pt-[18px] pb-[15px] rounded-[4px] bg-white dark:bg-Kon border-[1px] focus:outline-none focus:border-VenetianNights dark:focus:border-VenetianNights text-[15px], leading-[15px] tracking-[-0.25px] font-bold  text-RuinedSmores dark:text-white dark:border-RoyalCurtsy border-StoicWhite"
      />
      <FaRegCalendar className="absolute right-[16px] top-[25px] w-[16px] heigh-[16px] text-TrueLavender" />
    </div>
  );
};

export default CustomDatePicker;
