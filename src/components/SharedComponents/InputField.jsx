import React, { useState } from "react";

const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  onFocus,
  autoComplete,
  disabled,
  error = false,
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label className="text-base font-medium">{label}</label>
      <input
        name={type}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        onFocus={onFocus}
        disabled={disabled}
        className={`w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500 ${
          error ? "border border-red-500" : ""
        }`}
      />
    </div>
  );
};

export default InputField;
