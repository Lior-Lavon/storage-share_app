import React from "react";
import DatePicker from "react-datepicker";
import { parseISO } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerField = ({
  label,
  name,
  value,
  onChange,
  min,
  max,
  disabled = false,
  className = "",
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
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-base font-medium">{label}</label>}
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        minDate={minDate}
        maxDate={maxDate}
        disabled={false}
        placeholderText="dd/mm/yyyy"
        dateFormat="dd/MM/yyyy"
        className="bg-white px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
        name={name}
      />
    </div>
  );
};

export default DatePickerField;
