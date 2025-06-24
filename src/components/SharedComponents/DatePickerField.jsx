import React from "react";

const DatePickerField = ({
  label,
  name,
  value,
  onChange,
  min,
  max,
  disabled = false,
  className = "", // accept className prop
}) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    {label && <label className="text-base font-medium">{label}</label>}
    <input
      type="date"
      name={name}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      disabled={disabled}
      className="px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
    />
  </div>
);

export default DatePickerField;
