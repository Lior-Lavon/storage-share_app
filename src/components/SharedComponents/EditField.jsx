import React from "react";

const EditField = ({
  label,
  placeholder,
  value,
  onChange,
  disabled = false,
  rows = 2,
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-base font-medium">{label}</label>
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      rows={rows}
      className="px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
    />
  </div>
);

export default EditField;
