import React from "react";
import DatePicker from "react-datepicker";
import { parseISO } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";

const DatePickerField = ({
  label,
  name,
  value,
  onChange,
  min,
  max,
  disabled = false,
  className = "",
  error = false,
}) => {
  // Convert string dates to Date objects for react-datepicker
  const selectedDate = value ? parseISO(value) : null;
  const minDate = min ? parseISO(min) : null;
  const maxDate = max ? parseISO(max) : null;

  // Wrap onChange to send date string back (yyyy-MM-dd)
  const handleChange = (date) => {
    if (!date) {
      onChange({ target: { name, value: "" } });
      return;
    }
    // Format date as 'yyyy-MM-dd'
    const formattedDate = date.toISOString().split("T")[0];
    onChange({ target: { name, value: formattedDate } });
  };

  return (
    <div className={`w-full flex flex-col`}>
      <div
        className={`w-full relative rounded-lg ${
          error ? "border border-red-500" : ""
        }`}
      >
        <DatePicker
          className="w-full bg-gray-100 px-2 py-2 rounded-lg border border-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
          selected={selectedDate}
          onChange={handleChange}
          minDate={minDate}
          maxDate={maxDate}
          disabled={disabled}
          placeholderText="dd/mm/yyyy"
          dateFormat="dd/MM/yyyy"
          name={name}
        />
        <FaRegCalendarAlt
          className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-300 pointer-events-none"
          size={18}
        />
      </div>
    </div>
  );
};

export default DatePickerField;
