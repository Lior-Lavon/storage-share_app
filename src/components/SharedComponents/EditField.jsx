import React from "react";

const EditField = ({
  label,
  placeholder,
  value,
  onChange,
  onFocus, // optional
  onBlur, // optional
  disabled = false,
  rows = 3,
  error = false,
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-base font-medium">{label}</label>
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus} // handled even if undefined
      onBlur={onBlur} // handled even if undefined
      disabled={disabled}
      rows={rows}
      className={`pl-4 pr-8 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none ${
        error ? "border border-red-500" : ""
      }`}
    />
  </div>
);

export default EditField;
