import React, { useState } from "react";

const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  autoComplete,
  disabled,
  error = false,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-base font-medium">{label}</label>
      <input
        name={type}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        disabled={disabled}
        className={`px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500 ${
          error ? "border border-red-500" : ""
        }`}
      />
    </div>
  );
};

export default InputField;
