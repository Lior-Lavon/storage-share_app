import React, { useEffect, useState } from "react";

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
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS at runtime in browser only
    const userAgent = window.navigator.userAgent || "";
    const iOS = /iPad|iPhone|iPod/.test(userAgent);
    setIsIOS(iOS);
  }, []);

  return (
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
        style={
          isIOS
            ? {} // no appearance override on iOS
            : {
                WebkitAppearance: "textfield",
                MozAppearance: "textfield",
                appearance: "textfield",
              }
        }
      />
    </div>
  );
};

export default DatePickerField;
