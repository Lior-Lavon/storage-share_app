import React from "react";

const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  autoComplete,
}) => (
  <div className="flex flex-col gap-1">
    {/* <label htmlFor={id} className="text-base font-medium"> */}
    <label className="text-base font-medium">{label}</label>
    <input
      name={type}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      className="px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
    />
  </div>
);

export default InputField;
