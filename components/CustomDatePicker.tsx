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
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const formatPlaceholder = (date: Date) => {
    return format(date, "dd MMM yyyy");
  };

  return (
    <div className="relative inline-block">
      <DatePicker
        selected={value}
        onChange={onChange}
        placeholderText={formatPlaceholder(new Date())}
        dateFormat="dd MMM yyyy"
        className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <FaRegCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default CustomDatePicker;
