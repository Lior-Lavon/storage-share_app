import React from "react";

const DatePickerField = ({
  label,
  name,
  value,
  onChange,
  min,
  max,
  disabled = false,
  className = "",
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
      className="bg-white px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
      style={{
        // Remove extra padding & background on iOS to ensure native UI works
        WebkitAppearance: "textfield",
        MozAppearance: "textfield",
        appearance: "textfield",
      }}
    />
  </div>
);

export default DatePickerField;
